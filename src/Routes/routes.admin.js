import React from "react";

const UserCreation = React.lazy(() => import('../views/Admin/UserCreation'));
const IpPatientGroup = React.lazy(() => import('../views/Pages/Admin/ReportGrouping/TsshPatientGroup/IpPatientGrouping'))


export const user_settings = [
    { path: '/Menu/User', element: UserCreation, name: "User Creation" },
]

export const report_grouping = [
    { path: '/Menu/IpPatientGrouping', element: IpPatientGroup, name: "Patient Grouping" }
]













