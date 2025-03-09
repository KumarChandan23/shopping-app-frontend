import React, {  Suspense } from 'react';
import { RouterProvider } from 'react-router-dom';
import { myRoutes } from './route/Route';
import './App.css';
import { ToastContainer } from "react-toastify";

const App = () => {
  return (
    <>
    <Suspense fallback={<div>Loading...</div>}>
    <RouterProvider router={myRoutes}></RouterProvider>
    </Suspense>
    <ToastContainer position="top-center" className="toastContainer" autoClose={3000} />
    </>
  );
};

export default App;
