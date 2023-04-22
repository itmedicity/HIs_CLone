import React, { lazy, Suspense } from 'react';
import { Box, CircularProgress } from '@mui/material';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Text from './views/Components/Text';
import NotFountPage from './views/Components/NotFountPage';
import TestComponent from './views/Pages/Mis/TestComponent';

const Login = lazy(() => import('./HomeComponents/Login/Login'));
const DefaultLayout = lazy(() => import('./HomeComponents/LayoutComponents/DefaultLayout'));

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<CircularProgress />} >
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/Menu/*' element={<DefaultLayout />} />
          <Route path='/TestCmp/' element={<TestComponent />} />
          <Route path='*' element={<NotFountPage />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
