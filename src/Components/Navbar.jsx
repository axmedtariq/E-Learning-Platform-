import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import LogoutButton from "./LogoutButton";

export default function Navbar() {
  const { user } = useContext(AuthContext);

  return (
    <nav className="navbar">
      <Link to="/">Home</Link>
      <Link to="/courses">Courses</Link>

      {user ? (
        <>
          <span>Welcome, {user.name}</span>
          <LogoutButton /> {/* ✅ logout */}
        </>
      ) : (
        <Link to="/login">Login</Link>
      )}
    </nav>
  );
}
