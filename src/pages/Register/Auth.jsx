import React from "react";
import "./AuthPages.scss";

// ---------------------------- REGISTER PAGE ----------------------------
export function RegisterPage() {
  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1 className="auth-title">Create Your Account</h1>

        <div className="form-group">
          <div>
            <label className="label">Full Name</label>
            <input type="text" className="input" placeholder="Enter full name" />
          </div>

          <div>
            <label className="label">Email</label>
            <input type="email" className="input" placeholder="Enter your email" />
          </div>

          <div>
            <label className="label">Password</label>
            <input type="password" className="input" placeholder="Create password" />
          </div>

          <div className="link-right">
            <a href="#">Login</a>
          </div>
        </div>

        <button className="auth-btn">Register</button>
      </div>
    </div>
  );
}

// ------------------------ FORGOT PASSWORD PAGE ------------------------
export function ForgotPasswordPage() {
  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1 className="auth-title">Forgot Password</h1>

        <p className="sub-text">Enter your email to receive reset instructions.</p>

        <div>
          <label className="label">Email</label>
          <input type="email" className="input" placeholder="Enter your email" />
        </div>

        <button className="auth-btn">Send Reset Link</button>
      </div>
    </div>
  );
}

// ------------------------------ RESET PAGE ------------------------------
export function ResetPasswordPage() {
  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1 className="auth-title">Reset Password</h1>

        <div className="form-group">
          <div>
            <label className="label">New Password</label>
            <input type="password" className="input" placeholder="Enter new password" />
          </div>

          <div>
            <label className="label">Confirm Password</label>
            <input type="password" className="input" placeholder="Confirm new password" />
          </div>
        </div>

        <button className="auth-btn">Reset Password</button>
      </div>
    </div>
  );
}
