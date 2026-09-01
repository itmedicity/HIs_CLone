# CLAUDE.md

Guidance for Claude Code (or any future contributor) working in this repository.

## What this is

A hospital Management Information System (MIS) front-end for Travancore Medical College & Hospital (TMCH) and Travancore Super Speciality Hospital (TSSH), covering income/collection reporting, pharmacy billing & stock, user/rights administration, and OP/IP dashboards. React 18 + Create React App (react-scripts 5), MUI v5 (+ `@mui/joy` for a handful of modal components), Redux Toolkit, React Router v6, TanStack Query (used only in a few newer modal components, not app-wide), ag-Grid for large tabular reports, axios for HTTP.

There is no backend in this repository — it is a pure SPA client. The API base URL and contract live outside this repo.

## Commands

```
npm start   # dev server, http://localhost:3000
npm run build
npm test    # currently broken — see Known Issues
```

No lint/format script is defined beyond CRA's bundled `eslint-config-react-app` (see `eslintConfig` in package.json). No CI is configured.

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

## Conventions actually in use (follow these, don't invent new ones)

- Financial/report API responses are shaped `{success: 0|1, message, data}`. Treat `success` defensively (`payload?.success ?? 2`), never assume it's present.
- Currency values render via `.toLocaleString("en-US", {minimumFractionDigits: 2})` or a local `formatToDecimal` helper — stay consistent within a file.
- Dates go through `moment` (not `date-fns`, despite it being a dependency) in most of the app.
- Notifications: use `Constant/Constants.js`'s `succesNofity` / `errorNofity` / `warningNofity` / `infoNofity` wrappers around `react-toastify` (note the existing typo in the name — it's intentional/established, matching it avoids introducing a second inconsistent name).
- Lazy-load every route-level page component with `React.lazy`.

## Known issues (see full audit for detail and reasoning — not reproduced here to avoid drift)

A full line-by-line audit was performed on 2026-08-11 covering the entire `src/` tree. Highlights that matter most for future work:

- **No environment-based config.** `src/Constant/Static.js` hardcodes the same internal IP for both `DEV_API_URL` and `PRODUCTION_API_URL`, and `AxiosConfig.js` doesn't branch on environment at all. Before any real production deploy, this needs to move to `.env`/`REACT_APP_*` variables (and `Static.js` actually removed from git tracking — the current `.gitignore` rule for it is a no-op because the file was already committed before the rule was added).
- **Route-level authorization is UI-only.** `DefaultLayout.jsx` mounts every route unconditionally; only the menu *links* are permission-filtered. Don't assume a hidden link means the page is inaccessible — verify backend endpoints enforce authorization independently.
- **Dead/broken features exist and look intentional at a glance**: `DashBoard/DashboardOP_IP.jsx` and `Dashboard.jsx` have their entire UI commented out (the underlying chart components are fully built and otherwise unused); `TopOfficials/components/CreditInsuranceBillModal.jsx` has its table body/footer commented out and is invoked with the wrong prop names at both call sites. Don't assume "there's no UI for X" means "X isn't implemented" — grep first, it may just be commented out or wired with wrong props.
- **`npm test` currently fails** — `src/App.test.js` is unmodified CRA boilerplate asserting text that doesn't exist in this app's actual login page. There is effectively no test coverage in this repository.
- **Redux status-code convention (0/1/2) is violated in a few slices** (`sliceDashBoard.js`, `rolProcessSlice.js`, `ipAdmissionInfo/*`) where the `.rejected` case reuses the success status value — don't trust `status === 1` as "success" without checking which slice you're in.
- **`Redux-Slice/pharmacyBilling/rolProcessSlice.js` is never registered in `store.js`** and has three thunks sharing one action-type string, so two of its three reducers can never run. Treat this file as broken until fixed.
- Several near-duplicate report folders under `views/Pages/Mis/` (`HospitalIcomeTmch` vs `HospitalIncomeTssh` vs `*Grouped` vs `*Imported` vs `HospitalIncomeTypeTwo`) have drifted from each other — bugs fixed in one copy are often still present in the others.

When starting new work in an area touched by the above, re-verify current state first — this list is a snapshot, not a live source of truth.
