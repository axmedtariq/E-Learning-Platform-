import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../Context/AuthContext.jsx"; // ✅ correct relative path
import "./Login.scss";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { user, login, loading } = useContext(AuthContext); // ✅ include loading

  // ✅ Redirect to home if already logged in
  useEffect(() => {
    if (!loading && user) {
      navigate("/"); // redirect to Home
    }
  }, [user, loading, navigate]);

  const handleLogin = async () => {
    try {
      setError("");

      const response = await axios.post("http://localhost:5000/api/user/login", {
        email,
        password,
      });

      const { token, user: userData } = response.data;

      // Login via context
      login(userData, token);

      // Redirect will happen automatically via useEffect

    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  // ✅ Show loading if context is still initializing
  if (loading) return <div>Loading...</div>;

  return (
    <div className="login-container">
      <div className="login-card">
        <h1 className="login-title">Login to Your Account</h1>

        <div className="form-group">
          <div>
            <label className="label">Email</label>
            <input
              type="email"
              className="input"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="label">Password</label>
            <input
              type="password"
              className="input"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="links">
            <Link to="/forgot-password" className="forgot-link">Forgot Password?</Link>
            <Link to="/register">Register</Link>
          </div>

          {error && <p className="error-msg">{error}</p>}
        </div>

        <button className="login-btn" onClick={handleLogin}>Login</button>
      </div>
    </div>
  );
}
