// @ts-nocheck
import React, {lazy, Suspense} from "react";
import {Box, CircularProgress} from "@mui/material";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Text from "./views/Components/Text";
import NotFountPage from "./views/Components/NotFountPage";
import ProtectedRoute from "./HomeComponents/LayoutComponents/ProtectedRoute";
import {Provider} from "react-redux";
import {store} from "./store";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";

const Login = lazy(() => import("./HomeComponents/Login/Login"));
const DefaultLayout = lazy(() => import("./HomeComponents/LayoutComponents/DefaultLayout"));

const queryclinet = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      cacheTime: 10 * 60 * 1000, // 10 minutes
      retry: 2,
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  return (
    <BrowserRouter basename="/">
      <Suspense fallback={<CircularProgress />}>
        <Provider store={store}>
          <QueryClientProvider client={queryclinet}>
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/Menu/*" element={<ProtectedRoute />} />
              {/* <Route path='/Menu/*' element={<DefaultLayout />} />
          <Route path='/TestCmp/' element={<TestComponent />} /> */}
              <Route path="*" element={<NotFountPage />} />
            </Routes>
          </QueryClientProvider>
        </Provider>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
