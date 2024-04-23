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
const incomeReportsTssh = React.lazy(() => import('../views/Pages/Mis/HospitalIncomeTssh/IncomeReports'))

//Grouped
const HospitalIncomeReportsGrouped = React.lazy(() => import('../views/Pages/Mis/HospitalIncomeTmchGrouped/HospitalncomeReports'))
const incomeReportsGrouped = React.lazy(() => import('../views/Pages/Mis/HospitalIncomeTmchGrouped/IncomeReports'))

//Grouped
const HospitalIncomeReportsTmchImported = React.lazy(() => import('../views/Pages/Mis/HospitalIncomeTmchImported/HospitalncomeReports'))
const incomeReportsTmchImported = React.lazy(() => import('../views/Pages/Mis/HospitalIncomeTmchImported/IncomeReports'))

//Imported
const HospitalIncomeReportsTsshImported = React.lazy(() => import('../views/Pages/Mis/HospitalIncomeTsshImported/HospitalncomeReports'))
const incomeReportsTsshImported = React.lazy(() => import('../views/Pages/Mis/HospitalIncomeTsshImported/IncomeReports'))


//Report Grouping
const IpPatientGroup = React.lazy(() => import('../views/Pages/Admin/ReportGrouping/TsshPatientGroup/IpPatientGrouping'))
const TmcPatientGrouping = React.lazy(() => import('../views/Pages/Admin/ReportGrouping/TmcPatientGroupRemove/PatientTmcGrouping'))
const groupedPatientList = React.lazy(() => import('../views/Pages/Admin/ReportGrouping/GroupedPatientList/GroupedPatientList'))

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

//Pharmacy Reports
const pharmacyGstReports = React.lazy(() => import('../views/Pages/PharmacyBilling/Analysis Statement/SalesReportTssh/SalesReportsMain'))
const pharmacyGstReptTMCH = React.lazy(() => import('../views/Pages/PharmacyBilling/Analysis Statement/SalesGstReportTmch/SalesGstReportMain'))

//Collection Reports Tmch
const CollectionTmch = React.lazy(() => import('../views/Pages/Mis/Collection Reports/CollectionReportTssh'))
const PharmacySalesGstReports = React.lazy(() => import('../views/Pages/Mis/Collection Reports/PharmacySaleGst'))



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
    //Grouped
    { path: '/hospital_income_grouped', element: HospitalIncomeReportsGrouped, name: "Hospital Income Statement" },
    { path: '/income-reports-grouped', element: incomeReportsGrouped, name: "Hospital Income Statement" },


    //Tmch imported
    { path: '/hospital_income_imTmch', element: HospitalIncomeReportsTmchImported, name: "Hospital Income Statement-tmch-imported" },
    { path: '/income-reports-imTmch', element: incomeReportsTmchImported, name: "Hospital Income Statement-tmch-imported" },

    //Tssh Imported
    { path: '/hospital_income_imTssh', element: HospitalIncomeReportsTsshImported, name: "Hospital Income Statement-tssh-imported" },
    { path: '/income-reports-imTssh', element: incomeReportsTsshImported, name: "Hospital Income Statement-tssh-imported" },


    //others
    { path: '/User', name: 'New User Creation', element: User },
    { path: '/IpPatientGrouping', element: IpPatientGroup, name: "Patient Grouping" },
    { path: '/TmcPatientGrouping', element: TmcPatientGrouping, name: "TMCH Grouping" },
    { path: '/groupedPatientList', element: groupedPatientList, name: "TMCH Grouping List" },

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
    //Pharmacy Reports
    { path: '/pharmacyGstSalseReports', name: 'PHARMACY GST Sales Reports', element: pharmacyGstReports },
    { path: '/pharmacyGstReportTmch', name: 'PHARMACY GST Sales Reports', element: pharmacyGstReptTMCH },
    //Colleciton reports tmch
    { path: '/CollctionTmch', name: 'Collection Report TMCH', element: CollectionTmch },
    { path: '/PharmacyGst', name: 'Pharmacy GST TMCH', element: PharmacySalesGstReports },



]
export default routes