import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/home/Home";
import Signup from "../pages/Form/signup/Signup";
import Layout from "../layout/Layout";
import Login from "../pages/Form/login/Login";
import Update from "../pages/Form/update/Update";


export const myRoutes = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children:[
            {
                index: true,
                element: <Home />
            },
            {
                path:"login",  
                element: <Login />
            },
            {
                path:"signup",
                element: <Signup />
            },
            {
                path:"update",
                element: <Update />
            }

        ]
    }
])