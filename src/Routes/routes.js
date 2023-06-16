import React from "react";

const Test = React.lazy(() => import('../views/Components/Text'));
const NameDis = React.lazy(() => import('../views/Components/NameDis'));
const Admin = React.lazy(() => import('../views/Pages/Admin'));
const Inpatient = React.lazy(() => import('../views/Pages/Inpatient'));
const LabGeneralBill = React.lazy(() => import('../views/Pages/LabGeneralBill'));
const Mis = React.lazy(() => import('../views/Pages/Mis'));
const Outpatient = React.lazy(() => import('../views/Pages/Outpatient'));
const PharmacyBilling = React.lazy(() => import('../views/Pages/PharmacyBilling'));

const HospitalIncomeReports = React.lazy(() => import('../views/Pages/Mis/HospitalncomeReport/HospitalncomeReports'));
const incomeReports = React.lazy(() => import('../views/Pages/Mis/HospitalncomeReport/IncomeReports'))

const User = React.lazy(() => import('../views/Pages/Admin/UserSettings/UserCreation/UserCreation'));

const routes = [
    { path: '', element: NameDis },
    { path: '/Admin', element: Admin },
    { path: '/Inpatient', element: Inpatient },
    { path: '/LabGeneralBill', element: LabGeneralBill },
    { path: '/Mis', element: Mis },
    { path: '/Outpatient', element: Outpatient },
    { path: '/PharmacyBilling', element: PharmacyBilling },
    { path: '/Test', element: Test },
    { path: '/hospital_income', element: HospitalIncomeReports, name: "Hospital Income Statement" },
    { path: '/income-reports', element: incomeReports, name: "Hospital Income Statement" },
    { path: '/User', name: 'New User Creation', element: User },
]
export default routes