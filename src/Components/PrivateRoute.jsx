// ./components/PrivateRoute.jsx
import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext.jsx";

export default function PrivateRoute({ children }) {
  const { user, loading } = useContext(AuthContext);

  // Show a simple loading text until AuthContext is ready
  if (loading) {
    return <div>Loading...</div>; // ✅ use <div> instead of <p>, safer for Vite
  }

  // Redirect to login if user is not authenticated
  if (!user) {
    return <Navigate to="/login" />;
  }

  // Render protected component
  return <>{children}</>; // ✅ wrap children in fragment
}
