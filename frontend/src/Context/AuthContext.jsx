// ./Context/AuthContext.jsx
import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);    // Stores logged-in admin/user
  const [token, setToken] = useState(null);  // JWT token
  const [loading, setLoading] = useState(true);

  // ---------- Auto-login on page refresh ----------
  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    const savedUser = localStorage.getItem("user");

    if (savedToken && savedUser) {
      try {
        setToken(savedToken);
        setUser(JSON.parse(savedUser));
      } catch {
        // If localStorage is corrupted, clear it
        localStorage.removeItem("token");
        localStorage.removeItem("user");
      }
    }
    setLoading(false);
  }, []);

  // ---------- ADMIN LOGIN ----------
  const adminLogin = async (email, password) => {
    try {
      const res = await fetch("http://localhost:5000/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.toLowerCase(), password }),
      });

      let data;
      try {
        data = await res.json();
      } catch {
        throw new Error("Server error");
      }

      if (!res.ok) throw new Error(data?.message || "Login failed");

      const adminData = { ...data.admin, role: "admin" };
      setUser(adminData);
      setToken(data.token);

      localStorage.setItem("user", JSON.stringify(adminData));
      localStorage.setItem("token", data.token);

      return true;
    } catch (err) {
      console.error("Admin login error:", err?.message || err);
      return false;
    }
  };

  // ---------- USER LOGIN ----------
  const login = async (email, password) => {
    try {
      const res = await fetch("http://localhost:5000/api/user/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.toLowerCase(), password }),
      });

      let data;
      try {
        data = await res.json();
      } catch {
        throw new Error("Server error");
      }

      if (!res.ok) throw new Error(data?.message || "Login failed");

      const userData = { ...data.user, role: "student" };
      setUser(userData);
      setToken(data.token);

      localStorage.setItem("user", JSON.stringify(userData));
      localStorage.setItem("token", data.token);

      return true;
    } catch (err) {
      console.error("User login error:", err?.message || err);
      return false;
    }
  };

  // ---------- LOGOUT ----------
  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ user, token, adminLogin, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
