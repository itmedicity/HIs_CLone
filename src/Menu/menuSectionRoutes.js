// routes.js defines every real page as a flat, top-level route (e.g. an MIS report
// lives at "/Menu/hospital_income_tmch", not nested under "/Menu/Mis/..."), so the
// sidebar can't tell "this page belongs to that section" from a plain path-prefix
// check. This maps each top-level sidebar route to every other routes.js path that
// belongs to it, so the section stays highlighted while browsing its subpages.
export const sectionSubRoutes = {
  "/Menu/Admin": ["/Menu/User", "/Menu/UserGroup", "/Menu/UserRights", "/Menu/MenuGroup", "/Menu/IpPatientGrouping", "/Menu/TmcPatientGrouping", "/Menu/groupedPatientList"],

  "/Menu/PharmacyBilling": ["/Menu/Medicines", "/Menu/StoreRequest", "/Menu/RolAnalysis", "/Menu/GstReport", "/Menu/pharmacyGstSalseReports", "/Menu/pharmacyGstReportTmch"],

  "/Menu/Mis": [
    "/Menu/hospital_income",
    "/Menu/income-reports",
    "/Menu/hospital_income_tmch",
    "/Menu/income-reports-tmch",
    "/Menu/hospital_income_tssh",
    "/Menu/income-reports-tssh",
    "/Menu/hospital_income_grouped",
    "/Menu/income-reports-grouped",
    "/Menu/hospital_income_imTmch",
    "/Menu/income-reports-imTmch",
    "/Menu/hospital_income_imTssh",
    "/Menu/income-reports-imTssh",
    "/Menu/hospital_income_types",
    "/Menu/income-reports_types",
    "/Menu/CollctionTmch",
    "/Menu/PharmacyGst",
    "/Menu/CollectionReportTmch",
    "/Menu/CollectionReportTmchDetls",
    "/Menu/CollectionReportCollectionOnly",
    "/Menu/CollectionReportCollectionOnlyDetl",
    "/Menu/QmtIncomeReportsDateSelection",
    "/Menu/QmtIncomeReportsDateWise",
    "/Menu/TmcIncomeReportsDateSelection",
    "/Menu/TmcIncomeReportsDateWise",
    "/Menu/tsshIncomeReportsDateSelection",
    "/Menu/tsshIncomeReportsDateWise",
    "/Menu/groupedIncomeReportsDateSelection",
    "/Menu/groupedIncomeReportsDateWise",
    "/Menu/CreditInsuranseBillModal",
  ],
};

export const isSectionActive = (sectionRoute, pathname) => pathname === sectionRoute || (sectionSubRoutes[sectionRoute] || []).includes(pathname);
