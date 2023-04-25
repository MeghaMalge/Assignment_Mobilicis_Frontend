import React from "react";

import "./Header.css";

export default function Header({ children, className }) {
  return <div className={`heading ${className}`}>{children}</div>;
}
