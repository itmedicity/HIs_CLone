// @ts-nocheck
// Same auth check as ProtectedRoute, but renders a matched route with no HeaderBar/DrawerLarge
// chrome around it — for pages meant to be opened as their own popup window (via window.open),
// e.g. the Collection Reports detail pages. Mounted at /MenuBare/* in App.js, sharing the same
// route table as DefaultLayout (src/Routes/routes.js) so any existing /Menu/* page can be opened
// bare just by pointing window.open at /MenuBare/<path> instead of /Menu/<path>.
import moment from "moment";
import React, {Suspense} from "react";
import {CircularProgress} from "@mui/material";
import {Navigate, Routes, Route} from "react-router-dom";
import routes from "../../Routes/routes";

export default function ProtectedBareLayout() {
  const loginInformation = localStorage.getItem("usrCred");
  if (loginInformation !== null) {
    let loginData = JSON.parse(loginInformation);
    let expireDate = moment(loginData.expire);
    if (expireDate > moment()) {
      return (
        <Suspense fallback={<CircularProgress />}>
          <Routes>
            {routes.map((route, idx) => (
              <Route path={route.path} Component={route.element} key={idx} />
            ))}
          </Routes>
        </Suspense>
      );
    } else {
      return <Navigate to="/" />;
    }
  } else {
    return <Navigate to="/" />;
  }
}
