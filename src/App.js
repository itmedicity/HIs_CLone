import React, { lazy, Suspense } from 'react';
import { Box, CircularProgress } from '@mui/material';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Text from './views/Components/Text';
import NotFountPage from './views/Components/NotFountPage';
import ProtectedRoute from './HomeComponents/LayoutComponents/ProtectedRoute';
import { Provider } from 'react-redux';
import { store } from './store';

const Login = lazy(() => import('./HomeComponents/Login/Login'));
const DefaultLayout = lazy(() => import('./HomeComponents/LayoutComponents/DefaultLayout'));

function App() {
  return (
    <BrowserRouter basename='/' >
      <Suspense fallback={<CircularProgress />} >
        <Provider store={store} >
          <Routes>
            <Route path='/' element={<Login />} />
            <Route path='/Menu/*' element={<ProtectedRoute />} />
            {/* <Route path='/Menu/*' element={<DefaultLayout />} />
          <Route path='/TestCmp/' element={<TestComponent />} /> */}
            <Route path='*' element={<NotFountPage />} />
          </Routes>
        </Provider>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
