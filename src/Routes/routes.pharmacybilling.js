import React from "react";


const Medicines = React.lazy(() => import('../views/Pages/PharmacyBilling/Stock/MedicineDetails/ImportMedicines'));
const StoreReq = React.lazy(() => import('../views/Pages/PharmacyBilling/Stock/StoreRequisition/StoreRequisitionEdit'));
const RolAnalysis = React.lazy(() => import('../views/Pages/PharmacyBilling/Analysis Statement/RolBasedAnalysis/RolBasedAnalysis'));

export const stock_settings = [
    { path: '/Menu/Medicines', element: Medicines, name: 'Import New Medicine' },
    { path: '/Menu/StoreRequest', element: StoreReq, name: 'Store Requisition' },
]


export const analysis_settings = [
    { path: '/Menu/RolAnalysis', element: RolAnalysis, name: 'ROL Based Analysis' },
]
