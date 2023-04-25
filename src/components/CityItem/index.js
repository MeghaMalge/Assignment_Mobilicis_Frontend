import React from "react";

import "./CityItem.css";

export default function CityItem({ item }) {
  return (
    <div className="city-item">
      <span className="city-name">{item.city}</span>
      <span className="city-users">
        {item.users}
        {item.users === 1 ? " user" : " users"}
      </span>
      <span>Average Income: ${item.avgIncome}</span>
    </div>
  );
}
