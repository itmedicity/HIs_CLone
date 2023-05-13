import React from "react";

const HospitalIncomeReports = React.lazy(() => import('../views/Pages/Mis/HospitalncomeReports'));


export const top_officials = [
    { path: '/Menu/hospital_income', element: HospitalIncomeReports, name: "Hospital Income Statement" },

]

