import React from "react";
import { Navigate } from "react-router-dom";
import AdminNavbar from "../../routes/Navbar/admin-nav";
import Users from "../../components/tables/users";

export default function AdminDashboard() {
  const token = JSON.parse(localStorage.getItem("admin_token")) ?? null;
  if (!token) {
    return <Navigate to="/admin-login" replace />;
  }

  return (
    <div className="bg-gray-100 min-h-screen">
      <AdminNavbar />
      <div className="text-center p-8">
        <h1 className="font-medium text-4xl text-gray-700">Admin Dashboard</h1>
      </div>
      <Users />
    </div>
  );
}
