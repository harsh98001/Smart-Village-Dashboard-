import React from "react";
import { Link } from "react-router-dom";
import { h } from "../../utils/h";

const Footer = () =>
  h("footer", { className: "site-footer" }, [
    h("div", { key: "container", className: "container" }, [
      h("div", { key: "grid", className: "footer-grid" }, [
        h("div", { key: "about", className: "footer-card" }, [
          h("h3", { key: "title" }, "About"),
          h(
            "p",
            { key: "text" },
            "Smart Village Dashboard a  platform for analytics, public service visibility, and rural growth coordination."
          )
        ]),
        h("div", { key: "links", className: "footer-card" }, [
          h("h3", { key: "title" }, "Quick Links"),
          h(Link, { key: "dashboard", to: "/dashboard" }, "Dashboard"),
          h(Link, { key: "reports", to: "/reports" }, "Reports"),
          h(Link, { key: "notifications", to: "/notifications" }, "Notifications")
        ]),
        h("div", { key: "contact", className: "footer-card" }, [
          h("h3", { key: "title" }, "Contact"),
          h("span", { key: "mail" }, "Harsh832019@gamil.com"),
          h("span", { key: "phone" }, "+91 9693967173"),
          h("span", { key: "location" }, "National Rural Governance Cell, India")
        ])
      ]),
      h(
        "div",
        { key: "copyright", className: "footer-bottom" },
        "© 2026 Smart Village Dashboard. All rights reserved."
      )
    ])
  ]);

export default Footer;
