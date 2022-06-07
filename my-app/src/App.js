import './app.css';

import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { Suspense, lazy } from 'react';

import Layout from './components/Layout';
const Game = lazy(() => import('./views/game'));
const ProductTable = lazy(() => import('./views/productTable'));
const Warning = lazy(() => import('./views/warningBanner'));
const Clock = lazy(() => import('./views/clock'))
const LogIn = lazy(() => import('./views/logIn'))
const Lists = lazy(() => import('./views/lists'))
const Forms = lazy(() => import('./views/forms'))

function App() {
  return (
    <Suspense>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route index element={<Game />}></Route>
            <Route path='/products' element={<ProductTable />}></Route>
            <Route path='/warning' element={<Warning />}></Route>
            <Route path='/clock' element={<Clock />}></Route>
            <Route path='/login' element={<LogIn />}></Route>
            <Route path='/lists' element={<Lists/>}></Route>
            <Route path='/forms' element={<Forms/>}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </Suspense >
  );
}

export default App;