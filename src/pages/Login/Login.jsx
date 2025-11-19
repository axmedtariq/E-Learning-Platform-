import React from "react";
import "./LoginPage.scss";

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
            <a href="#">Forgot Password?</a>
            <a href="#">Register</a>
          </div>
        </div>

        <button className="login-btn">Login</button>
      </div>
    </div>
  );
}
