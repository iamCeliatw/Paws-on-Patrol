import { Navigate, Outlet } from "react-router-dom";
import React from "react";
import { UserAuth } from "../context/AuthContext";
const ProtectedRoute = () => {
  const { user } = UserAuth();
  return user ? <Outlet /> : <Navigate to="/Home" />;
};

export default ProtectedRoute;
