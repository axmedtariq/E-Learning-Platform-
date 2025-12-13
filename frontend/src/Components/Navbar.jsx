// src/Components/Navbar.jsx
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext.jsx";
import LogoutButton from "./Logout.jsx";
import "./Navbar.scss"; // Import SCSS

export default function Navbar() {
  const { user } = useContext(AuthContext);

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">E-Learn</Link>
      </div>
      <ul className="navbar-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/courses">Courses</Link></li>
        <li><Link to="/instructors">Instructors</Link></li>
      </ul>
      <div className="navbar-actions">
        {user ? (
          <>
            <span className="welcome-msg">Welcome, {user.name}</span>
            <LogoutButton />
          </>
        ) : (
          <Link to="/login" className="login-btn">Login</Link>
        )}
      </div>
    </nav>
  );
}
