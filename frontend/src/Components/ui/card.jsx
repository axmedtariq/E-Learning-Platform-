// src/components/ui/card.jsx
import React from "react";

/**
 * Simple Card and CardContent components used by Admin.jsx
 * - Exports named components: Card, CardContent
 * - Uses Tailwind classes (change if you use plain CSS / SCSS)
 */

export function Card({ children, className = "", ...props }) {
  return (
    <div
      className={
        "rounded-2xl shadow-md bg-white overflow-hidden " + className
      }
      {...props}
    >
      {children}
    </div>
  );
}

export function CardContent({ children, className = "", ...props }) {
  return (
    <div className={"p-4 sm:p-6 " + className} {...props}>
      {children}
    </div>
  );
}
