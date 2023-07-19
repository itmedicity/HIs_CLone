import React from "react";


const Medicines = React.lazy(() => import('../views/Pages/PharmacyBilling/Stock/MedicineDetails/ImportMedicines'));
const StoreReq = React.lazy(() => import('../views/Pages/PharmacyBilling/Stock/StoreRequisition/StoreRequisitionEdit'));

export const stock_settings = [
    { path: '/Menu/Medicines', element: Medicines, name: 'Import New Medicine' },
    { path: '/Menu/StoreRequest', element: StoreReq, name: 'Store Requisition' },
]
