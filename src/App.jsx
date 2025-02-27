import React, {  Suspense } from 'react';
import { RouterProvider } from 'react-router-dom';
import { myRoutes } from './route/Route';
import './App.css';

const App = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
    <RouterProvider router={myRoutes}></RouterProvider>
    </Suspense>
  );
};

export default App;
