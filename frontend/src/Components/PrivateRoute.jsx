// ./Components/PrivateRoute.jsx
import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext.jsx";

export default function PrivateRoute({ children, adminOnly = false }) {
  const { user, loading } = useContext(AuthContext);

  // Show loading until AuthContext finishes initializing
  if (loading) {
    return <div>Loading...</div>;
  }

  // Redirect to login if not logged in
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Redirect to home if user is not admin but adminOnly route
  if (adminOnly && user.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  // Render the protected component
  return <>{children}</>;
}
