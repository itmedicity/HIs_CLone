# CLAUDE.md

Guidance for Claude Code (or any future contributor) working in this repository.

## What this is

A hospital Management Information System (MIS) front-end for Travancore Medical College & Hospital (TMCH) and Travancore Super Speciality Hospital (TSSH), covering income/collection reporting, pharmacy billing & stock, user/rights administration, and OP/IP dashboards. React 18 + Create React App (react-scripts 5), MUI v5 (+ `@mui/joy` for a handful of modal components), Redux Toolkit, React Router v6, TanStack Query (used only in a few newer modal components, not app-wide), ag-Grid for large tabular reports, axios for HTTP.

There is no backend in this repository — it is a pure SPA client. The API base URL and contract live outside this repo.

## Commands

```
npm start   # dev server, http://localhost:3000
npm run build
npm test    # passes (single smoke test), see Known Issues for coverage caveat
```

No lint/format script is defined beyond CRA's bundled `eslint-config-react-app` (see `eslintConfig` in package.json). No CI is configured.

API base URL is environment-based: `.env.development` / `.env.production` set `REACT_APP_API_URL` (CRA loads the right one per `npm start` vs `npm run build`); override via CI/deploy env vars, which take precedence over the files. `src/controllers/AxiosConfig.js` falls back to a hardcoded dev IP only if that variable is somehow unset.

## Architecture

- **Entry**: `src/index.js` → `src/App.js`. Two route trees are mounted side by side in `App.js`:
  - `/` → `Login`
  - `/Menu/*` → `ProtectedRoute` → `DefaultLayout` (header + drawer + the routes in `src/Routes/routes.js`) — this is the main app shell.
  - `/Mis/*` → `LayoutRouts` (a separate, newer layout tree under `views/Pages/Mis/TopOfficials/Layouts`) — used by the newer "TopOfficials" MIS reports.
- **Auth**: login POSTs to `/employee/login`, stores `{user, name, usergroup, token, expire}` as JSON in `localStorage["usrCred"]`, and also dispatches it into `Redux-Slice/LoginSlice`. **Both places are read independently across the app** — components reach into `localStorage.getItem("usrCred")` directly almost as often as they read the Redux slice. When touching auth, check both.
- **Route protection**: `HomeComponents/LayoutComponents/ProtectedRoute.jsx` only checks whether the stored token's `expire` (via `moment`) is in the future. It does **not** check per-route permissions — see Known Issues.
- **Menu / permissions**: the top-level icon menu (`Menu/Menu.js`) is a static hardcoded list shown to everyone. Each module landing page (`Admin.jsx`, `Mis.jsx`, `PharmacyBilling.jsx`, `Dashboard.jsx`) independently calls `getMenuSlno(usergroupid())` (`HomeComponents/MenuRights/menuRights.jsx`) to fetch the current user's permitted `menuname_id`s from the server, then filters a local static menu-definition object (`Menu/AdminMenu.js`, `Menu/MISBillingMenu.js`, etc.) against that list to decide which sub-links to render. Permission logic is therefore duplicated per module page, not centralized.
- **HTTP**: single axios instance in `src/controllers/AxiosConfig.js`. Request interceptor attaches `Authorization: Bearer <token>` from `localStorage["usrCred"]`. Response interceptor centralizes toast notifications per HTTP status code — **do not add per-call error toasts for status codes already handled here**, it will double-toast.
- **State**: Redux Toolkit, one slice per report/domain under `src/Redux-Slice/**`, registered in `src/store.js`. The dominant, correct pattern (used by most `incomeCollection*Slice` files) is:
  ```js
  const createApiThunk = (actionName, endPoint, stateKey) =>
    createAsyncThunk(`api/${actionName}`, async (postData, {rejectWithValue}) => {
      try {
        const response = await axiosinstance.post(`/...${endPoint}`, postData);
        return response.data;
      } catch (error) {
        return rejectWithValue(error?.response?.data || "Network Error");
      }
    });
  // extraReducers via builder callback, status convention: 0 = pending, 1 = success, 2 = error
  // fulfilled: state[key].status = payload?.success ?? 2
  ```
  Follow this pattern for new slices. A handful of older slices deviate from it (deprecated object-literal `extraReducers`, no `try/catch`, inconsistent status codes) — see `VERSION.md` / audit notes for which ones; don't copy those as a reference.
- **Reports**: most "Mis" report pages follow the same shape — a date/filter selection screen, a Redux thunk (or in the newer `TopOfficials` tree, a TanStack Query `useQuery`) that fetches a report payload, an ag-Grid or hand-built MUI `Table` to render it, and an xlsx/jspdf export action. There are several near-duplicate variants of the same report per hospital/grouping (`HospitalIcomeTmch`, `HospitalIncomeTssh`, `HospitalIncomeTmchGrouped`, `*Imported`, `HospitalIncomeTypeTwo`) that were copy-pasted from one another and have since drifted — **when fixing a bug in one, grep the sibling folders for the same code shape**, it is very likely present there too (or already fixed there and not here).
- **Newer report tree**: `views/Pages/Mis/TopOfficials/**` is a more recent rewrite (see `store.js` comment `// MIS REPORT VERTSION V5.0.0`) using TanStack Query instead of Redux thunks for data fetching, with its own `Layouts`, `Modals`, `hooks`, and `utils` subfolders. Prefer this structure for new report work over the older `HospitalIncome*` folders.
- **`views/Pages/Mis/CollectionReports/tmch/**`**: another TanStack Query-based report area (e.g. `collectionReports/CollectionTmchDetlReports.jsx`, backed by `Hooks/useUserWiseCollectionSummary.js`), with its own `actions/`, `components/`, and `utils/` subfolders per report family — same pattern as `TopOfficials`, just not nested under it. Export-to-file for this kind of report goes through a dedicated `export*.js` module (see `exportUserWiseCollection.js`) built on `xlsx-js-style` (styled Excel) and an HTML/`application/msword`-blob trick via `file-saver` for Word (no `.docx` library is installed) — reuse that pattern rather than adding a new export dependency.
- **`Components/MenuButton.jsx`**: the shared report toolbar (Word/Excel/Print/Close icons). `onExportExcel`/`onExportWord`/`onPrint` are all optional — Print defaults to `window.print()` and Close falls back to `navigateTo`/`window.close()` — so passing none of them is still safe for older callers. Most of the ~40 call sites only wire `onExportExcel` (or nothing); don't assume a given report has Word export just because the component supports it.

## Conventions actually in use (follow these, don't invent new ones)

- Financial/report API responses are shaped `{success: 0|1, message, data}`. Treat `success` defensively (`payload?.success ?? 2`), never assume it's present.
- Currency values render via `.toLocaleString("en-US", {minimumFractionDigits: 2})` or a local `formatToDecimal` helper — stay consistent within a file.
- Dates go through `moment` (not `date-fns`, despite it being a dependency) in most of the app.
- Notifications: use `Constant/Constants.js`'s `succesNofity` / `errorNofity` / `warningNofity` / `infoNofity` wrappers around `react-toastify` (note the existing typo in the name — it's intentional/established, matching it avoids introducing a second inconsistent name).
- Lazy-load every route-level page component with `React.lazy`.

## Known issues

A full line-by-line audit was performed on 2026-08-11 covering the entire `src/` tree; re-verified and refreshed 2026-09-03 (several items below have since been fixed and were removed from this list — env config, `rolProcessSlice` registration/action-types, and `App.test.js` all no longer reproduce). Highlights that still matter for future work:

- **Route-level authorization is UI-only.** `DefaultLayout.jsx` mounts every route unconditionally; only the menu *links* are permission-filtered. Don't assume a hidden link means the page is inaccessible — verify backend endpoints enforce authorization independently.
- **Dead/broken features exist and look intentional at a glance**: `TopOfficials/components/CreditInsuranceBillModal.jsx` has its table body/footer commented out (confirmed still true 2026-09-03) and is invoked with the wrong prop names at both call sites. Don't assume "there's no UI for X" means "X isn't implemented" — grep first, it may just be commented out or wired with wrong props.
- **`npm test` covers one smoke test only** (`src/App.test.js` renders `<App/>` and checks for the login button) — there is effectively no real test coverage in this repository beyond that.
- **Redux status-code convention (0/1/2) may still be violated in some slices** where `.rejected` reuses the success status value — don't trust `status === 1` as "success" without checking which slice you're in; this was last audited 2026-08-11 and not re-verified slice-by-slice on 2026-09-03.
- Several near-duplicate report folders under `views/Pages/Mis/` (`HospitalIcomeTmch` vs `HospitalIncomeTssh` vs `*Grouped` vs `*Imported` vs `HospitalIncomeTypeTwo`) have drifted from each other — bugs fixed in one copy are often still present in the others.

When starting new work in an area touched by the above, re-verify current state first — this list is a snapshot, not a live source of truth.
