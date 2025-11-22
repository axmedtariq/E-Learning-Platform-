import React from "react";
import { Link } from "react-router-dom";
import "./Login.scss";

export default function LoginPage() {
  return (
    <div className="login-container">
      <div className="login-card">
        <h1 className="login-title">Login to Your Account</h1>

        <div className="form-group">
          <div>
            <label className="label">Email</label>
            <input type="email" className="input" placeholder="Enter your email" />
          </div>

          <div>
            <label className="label">Password</label>
            <input type="password" className="input" placeholder="Enter your password" />
          </div>

          <div className="links">
            {/* ✅ Link to Forgot Password Page */}
            <Link to="/forgot-password" className="forgot-link">
              Forgot Password?
            </Link>

            <Link to="/register">Register</Link>
          </div>
        </div>

        {/* ✅ Login button outside of links */}
        <button className="login-btn">Login</button>
      </div>
    </div>
  );
}
