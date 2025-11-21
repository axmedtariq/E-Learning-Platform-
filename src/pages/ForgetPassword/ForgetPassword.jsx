import React, { useState } from "react";
import "./ForgetPassword.scss";

export default function ForgetPassword() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Reset link sent to:", email);
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

        <a href="/login" className="back-login">
          ← Back to Login
        </a>
      </div>
    </div>
  );
}
