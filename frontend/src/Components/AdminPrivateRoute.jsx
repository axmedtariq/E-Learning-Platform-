// src/Components/AdminPrivateRoute.jsx
import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext.jsx";

export default function AdminPrivateRoute({ children }) {
  const { user, loading } = useContext(AuthContext);

  if (loading) return <div>Loading...</div>;

  // Redirect to admin login if not logged in OR not an admin
  if (!user || user.role !== "admin") {
    return <Navigate to="/admin-login" />;
  }

  return <>{children}</>;
}
