import React from "react";

const OpIpAnalysis = React.lazy(() => import('../views/Pages/DashBoard/DashboardOP_IP'));
export const dashboard_setting = [
    { path: '/Menu/DashBoardData', element: OpIpAnalysis, name: "OP-IP Statistics" },
]