import React from "react";

import "./UserCard.css";

export default function UserCard({ user }) {
  return (
    <div className="user-card">
      <span>{user.email}</span>
      <span>Lives in {user.city}</span>
      <span>Earns {user.income}</span>
      <span>Owns {user.car}</span>
    </div>
  );
}
