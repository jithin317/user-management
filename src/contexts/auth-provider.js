import React, { useState } from "react";
import { AuthContext } from "./auth-context";
import { InfoToast } from "../components/helpers/toast-container";

export default function AuthProvider({ children }) {
  const token = JSON.parse(localStorage.getItem("jwt_token")) ?? null;
  const [isAuthenticated, setIsAuthenticated] = useState(token ?? null);
  const [update, setUpdate] = useState(false);

  const login = () => {
    const token = JSON.parse(localStorage.getItem("jwt_token")) ?? null;
    setIsAuthenticated(token ?? null);
  };
  const logout = () => {
    InfoToast({ message: "Logged Out..." });
    localStorage.clear();
    setIsAuthenticated(null);
  };

  return (
    <AuthContext.Provider
      value={{ update, isAuthenticated, login, logout, setUpdate }}
    >
      {children}
    </AuthContext.Provider>
  );
}
