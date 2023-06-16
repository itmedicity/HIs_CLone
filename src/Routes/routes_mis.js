import React from "react";

const HospitalIncomeReports = React.lazy(() => import('../views/Pages/Mis/HospitalncomeReport/HospitalncomeReports'))
const HospitalIncomeReportsTmch = React.lazy(() => import('../views/Pages/Mis/HospitalIcomeTmch/HospitalncomeReports'))
const HospitalIncomeReportsTssh = React.lazy(() => import('../views/Pages/Mis/HospitalIncomeTssh/HospitalncomeReports'))


export const top_officials = [
    { path: '/Menu/hospital_income', element: HospitalIncomeReports, name: "Hospital Income Statement - QMT" },
    { path: '/Menu/hospital_income_tmch', element: HospitalIncomeReportsTmch, name: "Hospital Income Statement - TMCH" },
    { path: '/Menu/hospital_income_tssh', element: HospitalIncomeReportsTssh, name: "Hospital Income Statement - TSSH" },
]

