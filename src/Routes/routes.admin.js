

import React from "react";

const UserCreation = React.lazy(() => import('../views/Pages/Admin/UserSettings/UserCreation/UserCreation'));


export const user_settings = [
    { path: '/Menu/User', element: UserCreation, name: "User Creation" },

]














