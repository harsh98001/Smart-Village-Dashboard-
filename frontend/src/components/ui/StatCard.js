import React from "react";
import Counter from "./Counter";

const StatCard = ({ icon, title, value, description, formatter, tone = "sky" }) =>
  <div className={`stat-card tone-${tone}`}>
  <div key="icon" className="stat-icon">
    {icon || "◌"}
  </div>
  <div key="body" className="stat-body">
    <span key="title" className="stat-title">
      {title}
    </span>
    <strong key="value" className="stat-value">
      <Counter value={value} formatter={formatter} />
    </strong>
    <p key="desc" className="stat-description">
      {description}
    </p>
  </div>
</div>;

export default StatCard;

