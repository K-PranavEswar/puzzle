import React, { useState } from "react";
import "./Button.css";

export default function Button({
  children,
  onClick,
  variant = "primary",
  size = "medium",
  disabled = false,
  loading = false,
  icon = null,
  className = "",
  ...props
}) {
  const [isPressed, setIsPressed] = useState(false);

  const buttonClass = `btn btn-${variant} btn-${size} ${className} ${
    disabled ? "btn-disabled" : ""
  } ${loading ? "btn-loading" : ""} ${isPressed ? "btn-pressed" : ""}`;

  return (
    <button
      className={buttonClass}
      onClick={onClick}
      disabled={disabled || loading}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      onMouseLeave={() => setIsPressed(false)}
      onTouchStart={() => setIsPressed(true)}
      onTouchEnd={() => setIsPressed(false)}
      {...props}
    >
      {loading && <span className="btn-spinner">⏳</span>}
      {icon && <span className="btn-icon">{icon}</span>}
      <span className="btn-text">{children}</span>
    </button>
  );
}
