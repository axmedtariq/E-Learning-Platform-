import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./ForgetPassword.scss";

export default function ForgetPassword() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Reset link sent to:", email);
    // You can add actual email sending logic here
  };

  return (
    <div className="forget-container">
      <div className="forget-card">
        <h2>Forgot Password</h2>
        <p className="subtitle">Enter your email to receive a reset link</p>

        <form onSubmit={handleSubmit}>
          <label>Email Address</label>
          <input
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <button type="submit">Send Reset Link</button>
        </form>

        <div className="links">
          {/* Link to Reset Password page */}
          <Link to="/reset-password" className="reset-link">
            Go to Reset Password →
          </Link>

          {/* Link back to login */}
          <Link to="/login" className="back-login">
            ← Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
}
