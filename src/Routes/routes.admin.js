import React from "react";


const UserCreation = React.lazy(() => import('../views/Pages/Admin/UserSettings/UserCreation/UserCreation'));
const UserGroups = React.lazy(() => import('../views/Pages/Admin/UserSettings/UserGroup/UserGroupCreation'));
const UserRight = React.lazy(() => import('../views/Pages/Admin/UserSettings/UserRights/UserRightsApply'));
const MenuGroups = React.lazy(() => import('../views/Pages/Admin/UserSettings/MenuGroupCreation/MenuGroupMapping'));

const IpPatientGroup = React.lazy(() => import('../views/Pages/Admin/ReportGrouping/TsshPatientGroup/IpPatientGrouping'));


export const user_settings = [
    { path: '/Menu/UserGroup', element: UserGroups, name: "User Group" },
    { path: '/Menu/User', element: UserCreation, name: "User Creation" },
    { path: '/Menu/UserRights', element: UserRight, name: "User Rights" },
    { path: '/Menu/MenuGroup', element: MenuGroups, name: "Menu Group Mapping" },


]

export const report_grouping = [
    { path: '/Menu/IpPatientGrouping', element: IpPatientGroup, name: "Patient Grouping" }
]















