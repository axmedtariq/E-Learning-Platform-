import React from "react";
import "./button.scss";

export function Button({ children, className = "", variant = "primary", ...props }) {
  return (
    <button className={`btn btn--${variant} ${className}`} {...props}>
      {children}
    </button>
  );
}
