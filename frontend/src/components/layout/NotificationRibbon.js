import React from "react";
import { Link } from "react-router-dom";
import { h } from "../../utils/h";
import { useData } from "../../context/DataContext";

const NotificationRibbon = () => {
  const { notifications } = useData();
  const latest = notifications[0];

  if (!latest) {
    return null;
  }

  return h("div", { className: "notification-ribbon" }, [
    h("div", { key: "container", className: "container notification-ribbon-inner" }, [
      h("span", { key: "label", className: "ribbon-label" }, latest.type.toUpperCase()),
      h("span", { key: "message", className: "ribbon-message" }, latest.message),
      h(Link, { key: "link", className: "ribbon-link", to: "/notifications" }, "View updates")
    ])
  ]);
};

export default NotificationRibbon;
