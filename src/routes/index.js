import React, { Suspense } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { lazy } from "react";
import Home from "../modules/Home";
// import ErrorRoute from "../modules/404";
// const Login = lazy(() => import("../modules/auth-section/login"));
// const SignUp = lazy(() => import("../modules/auth-section/signup"));

export default function Router() {
  const routes = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    // {
    //   path: "/login",
    //   element: <Login />,
    // },
    // {
    //   path: "/sign-up",
    //   element: <SignUp />,
    // },
    // {
    //   path: "*",
    //   element: <ErrorRoute />,
    // },
  ]);
  return <RouterProvider router={routes} />;
}
