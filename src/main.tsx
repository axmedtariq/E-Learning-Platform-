import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home/bud.jsx";
import Login from "./pages/Login/login.jsx";
import RegisterPage from "./pages/Register/Auth.jsx";
import ForgetPassword from "./pages/ForgetPassword/ForgetPassword.jsx";
import ResetPassword from "./pages/ResetPage/ResetPassword.jsx"; // ✅ your actual ResetPassword

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgetPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
