import React from "react";

const Test = React.lazy(() => import('../views/Components/Text'));
const NameDis = React.lazy(() => import('../views/Components/NameDis'));
const Admin = React.lazy(() => import('../views/Pages/Admin'));
const Inpatient = React.lazy(() => import('../views/Pages/Inpatient'));
const LabGeneralBill = React.lazy(() => import('../views/Pages/LabGeneralBill'));
const Mis = React.lazy(() => import('../views/Pages/Mis'));
const Outpatient = React.lazy(() => import('../views/Pages/Outpatient'));
const PharmacyBilling = React.lazy(() => import('../views/Pages/PharmacyBilling'));
const DashBoard = React.lazy(() => import('../views/Pages/Dashboard'));

//Qmt
const HospitalIncomeReports = React.lazy(() => import('../views/Pages/Mis/HospitalncomeReport/HospitalncomeReports'));
const incomeReports = React.lazy(() => import('../views/Pages/Mis/HospitalncomeReport/IncomeReports'))

//Tmch
const HospitalIncomeReportsTmch = React.lazy(() => import('../views/Pages/Mis/HospitalIcomeTmch/HospitalncomeReports'))
const incomeReportsTmch = React.lazy(() => import('../views/Pages/Mis/HospitalIcomeTmch/IncomeReports'))

//Tssh
const HospitalIncomeReportsTssh = React.lazy(() => import('../views/Pages/Mis/HospitalIncomeTssh/HospitalncomeReports'))
const incomeReportsTssh = React.lazy(() => import('../views/Pages/Mis/HospitalIcomeTmch/IncomeReports'))

//Report Grouping
const IpPatientGroup = React.lazy(() => import('../views/Pages/Admin/ReportGrouping/TsshPatientGroup/IpPatientGrouping'))

const User = React.lazy(() => import('../views/Pages/Admin/UserSettings/UserCreation/UserCreation'));
const UserGroup = React.lazy(() => import('../views/Pages/Admin/UserSettings/UserGroup/UserGroupCreation'));
const UserRight = React.lazy(() => import('../views/Pages/Admin/UserSettings/UserRights/UserRightsApply'));
const MenuGroups = React.lazy(() => import('../views/Pages/Admin/UserSettings/MenuGroupCreation/MenuGroupMapping'));
const Medicines = React.lazy(() => import('../views/Pages/PharmacyBilling/Stock/MedicineDetails/ImportMedicines'));
const StoreReq = React.lazy(() => import('../views/Pages/PharmacyBilling/Stock/StoreRequisition/StoreRequisitionEdit'));
const RolAnalysis = React.lazy(() => import('../views/Pages/PharmacyBilling/Analysis Statement/RolBasedAnalysis/RolBasedAnalysis'));
const GstReport = React.lazy(() => import('../views/Pages/PharmacyBilling/Analysis Statement/GstReportPharmacyWise/GstReportPharmacyWise'));

// dashboard
const OpIpAnalysis = React.lazy(() => import('../views/Pages/DashBoard/DashboardOP_IP'));


const routes = [
    { path: '', element: NameDis },
    { path: '/Admin', element: Admin },
    { path: '/Inpatient', element: Inpatient },
    { path: '/LabGeneralBill', element: LabGeneralBill },
    { path: '/Mis', element: Mis },
    { path: '/Outpatient', element: Outpatient },
    { path: '/PharmacyBilling', element: PharmacyBilling },
    { path: '/DashBoard', element: DashBoard },
    { path: '/Test', element: Test },
    //qmt
    { path: '/hospital_income', element: HospitalIncomeReports, name: "Hospital Income Statement" },
    { path: '/income-reports', element: incomeReports, name: "Hospital Income Statement" },
    //Tmch
    { path: '/hospital_income_tmch', element: HospitalIncomeReportsTmch, name: "Hospital Income Statement" },
    { path: '/income-reports-tmch', element: incomeReportsTmch, name: "Hospital Income Statement" },
    //Tssh
    { path: '/hospital_income_tssh', element: HospitalIncomeReportsTssh, name: "Hospital Income Statement" },
    { path: '/income-reports-tssh', element: incomeReportsTssh, name: "Hospital Income Statement" },

    { path: '/User', name: 'New User Creation', element: User },
    { path: '/IpPatientGrouping', element: IpPatientGroup, name: "Patient Grouping" },
    { path: '/UserGroup', name: 'User Group', element: UserGroup },
    { path: '/UserRights', name: 'User Rights', element: UserRight },
    { path: '/MenuGroup', name: 'Menu Group Mapping', element: MenuGroups },

    // PharmacyBilling
    { path: '/Medicines', name: 'Import New Medicine', element: Medicines },
    { path: '/StoreRequest', name: 'Store Requisition', element: StoreReq },
    { path: '/RolAnalysis', name: 'ROL Based Analysis', element: RolAnalysis },
    { path: '/GstReport', name: 'GST Report Tax % And Pharmacy Wise', element: GstReport },

    // dashbord
    { path: '/DashBoardData', name: 'OP-IP Statistics', element: OpIpAnalysis },

]
export default routes