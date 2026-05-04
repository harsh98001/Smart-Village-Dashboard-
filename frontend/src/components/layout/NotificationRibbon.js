import React from "react";
import { Link } from "react-router-dom";
import { useData } from "../../context/DataContext";

const NotificationRibbon = () => {
  const { notifications } = useData();
  const latest = notifications[0];

  if (!latest) {
    return null;
  }

  return <div className="notification-ribbon">
  <div key="container" className="container notification-ribbon-inner">
    <span key="label" className="ribbon-label">
      {latest.type.toUpperCase()}
    </span>
    <span key="message" className="ribbon-message">
      {latest.message}
    </span>
    <Link key="link" className="ribbon-link" to="/notifications">View updates</Link>
  </div>
</div>;
};

export default NotificationRibbon;
