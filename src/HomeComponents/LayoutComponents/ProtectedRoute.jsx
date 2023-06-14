import moment from 'moment';
import React, { lazy } from 'react'
import { Navigate } from 'react-router-dom';
const DefaultLayout = lazy(() => import('./DefaultLayout'));

export default function ProtectedRoute() {
    const loginInformation = localStorage.getItem("usrCred");
    console.log(loginInformation);
    if (loginInformation !== null) {
        let loginData = JSON.parse(loginInformation);
        let expireDate = moment(loginData.expire);
        if (expireDate > moment()) {
            return <DefaultLayout />
        } else {
            return <Navigate to="/" />
        }
    } else {
        return <Navigate to="/" />
    }
}
