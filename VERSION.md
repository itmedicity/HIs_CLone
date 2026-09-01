# Version & Changelog

This file tracks meaningful changes to the app so future work has a record to build on. It did not exist before 2026-08-11 — entries above the line marked "history reconstructed from git log" are inferred from commit messages only, not from reading every diff, and are unversioned because no version-numbering scheme was in use.

## How to use this file going forward

- Follow [Keep a Changelog](https://keepachangelog.com/) style: group entries under `Added` / `Changed` / `Fixed` / `Removed` / `Security`.
- Bump `"version"` in `package.json` for every release and use the same number as the section heading here (e.g. `## [0.2.0] - 2026-08-15`).
- **There is currently a second, disconnected version indicator**: `src/HomeComponents/LayoutComponents/HeaderBar.jsx` hardcodes the string `2.0.2.3020` directly in JSX, shown in the app header. It has never matched `package.json`'s `"version": "0.1.0"`. Pick one source of truth going forward — e.g. import the version from `package.json` into `HeaderBar.jsx` (CRA supports `import pkg from "../../../package.json"`) — rather than maintaining two numbers by hand. Not changed as part of this audit since no code was modified without confirmation; flagging here so the next version bump is a good time to fix it.
- When you fix an item from the "Known issues" list in `CLAUDE.md` or from an audit, log it here and remove/check it off there.

## [Unreleased]

### Audit — 2026-08-11
A full read-through of `src/` was performed (core app/auth/routing layer read directly; the rest of `views/Pages`, shared components, hooks, and Redux slices covered via targeted review, with the highest-severity findings independently re-verified against source). No code was changed. Full findings with file:line references and reasoning were delivered in conversation; summarized here so the backlog isn't lost:

**To fix before any real production deployment:**
- Move API base URL to environment variables (`.env` + `REACT_APP_*`); currently hardcoded to an internal LAN IP for both dev and "production" in `src/Constant/Static.js`, over plain HTTP.
- Remove `src/Constant/Static.js` from git tracking properly (the existing `.gitignore` rule for it is currently a no-op — the file was already committed before the rule was added, so `git rm --cached` is needed in addition to the ignore rule).
- Fix `src/App.test.js` (unmodified CRA boilerplate, currently fails against the real app) or replace it with real coverage.

**Data-correctness bugs (financial reports / PDFs):**
- `views/Pages/Mis/HospitalIcomeTmch/IncomeReports.jsx` — pharmacy detail parts 2-4 all render part 1's data (wrong response variable reused).
- `views/Pages/Admin/UserSettings/UserCreation/FunctionalComponents/PdfMaking.js` and `UserGroup/UserGroupComponents/PDFUserGroup.js` — field-name typos leave columns blank in exported PDFs.
- `views/Pages/PharmacyBilling/.../GstReportPharmacyWise/Components/GstExcelExport.js` — exported header row doesn't match the actual data columns.
- `views/Pages/Mis/HospitalIncomeTypeTwo/IncomeReports.jsx` — calls `.then()` on functions that are no longer async (`func/misFunc.js` was migrated to synchronous, this page wasn't updated); also two missing `await`s.
- `PharmacyBilling/Stock/StoreRequisition/StoreRequisitionEdit.jsx` — can compute and persist `NaN` as a reorder-level quantity when a medicine's strip count is `0` (not blocked by validation in `EditMedicineDetails.jsx`).

**Dead/broken features that look intentional at a glance:**
- `views/Pages/DashBoard/DashboardOP_IP.jsx` and `views/Pages/Dashboard.jsx` — entire UI commented out; five fully-built analytics components are never mounted.
- `views/Pages/Mis/TopOfficials/components/CreditInsuranceBillModal.jsx` — table body/footer commented out, and invoked with wrong prop names everywhere it's used.
- `Redux-Slice/pharmacyBilling/rolProcessSlice.js` — not registered in `store.js`; three thunks share one action-type string so two of its three reducers never fire.

**Architecture-level, larger effort:**
- Route-level authorization: `HomeComponents/LayoutComponents/DefaultLayout.jsx` mounts every route regardless of the user's menu permissions; only the visible menu links are permission-filtered. Worth confirming every backend endpoint independently enforces authorization.
- Redux `status` convention (`0=pending, 1=success, 2=error`) is violated in `sliceDashBoard.js`, `rolProcessSlice.js`, and `ipAdmissionInfo/*` — `.rejected` reuses the success status value in those files.
- Several near-duplicate report folders under `views/Pages/Mis/` have drifted from each other (a bug fixed in one copy-pasted variant is often still present in the siblings) — worth an eventual consolidation into shared components once behavior is confirmed to be intentionally identical.

See conversation history from 2026-08-11 for the complete list with file:line citations and explanations, if not already triaged into issues/tickets elsewhere.

---

## History (reconstructed from `git log`, prior to this file's creation — not independently verified line-by-line)

- session restart menu completed
- credit insurance bill collection reports corrected
- unsettled amount detailed bill completed
- detailed reports added for the procedure reports in the mis
- changes in the axios file

Earlier history: see `git log` — this file starts tracking changes going forward rather than backfilling the full project history.
