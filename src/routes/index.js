import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Login from "../modules/auth-section/login-page";
import SignUp from "../modules/auth-section/signup-page";
import Profile from "../modules/dashboard/profile";
import ErrorRoute from "../modules/404-page";
import MainLayout from "./MainLayout/main-layout";
import AuthProvider from "../contexts/auth-provider";
import Home from "../modules/Home/home";
import "../index.css";
import EditProfile from "../modules/dashboard/edit-profile";
import ProtectedRoute from "./ProtectedRoute/protected-route";
import AdminLogin from "../modules/auth-section/admin-login";
import AdminDashboard from "../modules/dashboard/admin-dashboard";
import ForgotPassword from "../modules/forgot-password/forgot-password";
import ResetPassword from "../modules/forgot-password/reset-password";

export default function Router() {
  const routes = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "profile",
          element: (
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          ),
        },
        {
          path: "edit-profile",
          element: (
            <ProtectedRoute>
              <EditProfile />
            </ProtectedRoute>
          ),
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
      path: "/forgot-password",
      element: <ForgotPassword />,
    },
    {
      path: "/reset-password",
      element: <ResetPassword />,
    },
    {
      path: "/admin-login",
      element: <AdminLogin />,
    },
    {
      path: "/admin",
      element: <AdminDashboard />,
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
