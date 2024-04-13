import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
// import Home from "../modules/Home/home";
import Login from "../modules/auth-section/login-page";
import SignUp from "../modules/auth-section/signup-page";
import Profile from "../modules/dashboard/profile";
import ErrorRoute from "../modules/404-page";
import MainLayout from "./MainLayout/main-layout";
import AuthProvider from "../contexts/auth-provider";

export default function Router() {
  const routes = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout />,
      children: [
        {
          path: "profile",
          element: <Profile />,
        },
      ],
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/sign-up",
      element: <SignUp />,
    },
    {
      path: "*",
      element: <ErrorRoute />,
    },
  ]);
  return (
    <AuthProvider>
      {" "}
      <RouterProvider router={routes} />
    </AuthProvider>
  );
}
