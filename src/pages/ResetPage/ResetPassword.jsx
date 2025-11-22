import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // ✅ import
import "./ResetPassword.scss";

export default function ResetPassword() {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const navigate = useNavigate(); // ✅ hook to navigate programmatically

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirm) {
      alert("Passwords do not match!");
      return;
    }

    console.log("Password reset!");
    // ✅ Navigate to login page after successful reset
    navigate("/login");
  };

  return (
    <div className="reset-container">
      <div className="reset-card">
        <h2>Reset Password</h2>
        <p className="subtitle">Enter your new password below</p>

        <form onSubmit={handleSubmit}>
          <label>New Password</label>
          <input
            type="password"
            placeholder="********"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <label>Confirm Password</label>
          <input
            type="password"
            placeholder="********"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            required
          />

          <button type="submit">Reset Password</button>
        </form>

        {/* Optional: still keep a manual back link */}
        <p className="back-login">
          <a href="/login">← Back to Login</a>
        </p>
      </div>
    </div>
  );
}
