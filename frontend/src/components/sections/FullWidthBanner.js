import React from "react";
import { useNavigate } from "react-router-dom";
import { h } from "../../utils/h";

const FullWidthBanner = () => {
  const navigate = useNavigate();

  return h("section", { className: "full-width-banner" }, [
    h("div", { key: "container", className: "container" }, [
      h("div", { key: "card", className: "banner-card" }, [
        h("span", { key: "eyebrow", className: "section-eyebrow" }, "Growth Mission"),
        h(
          "h2",
          { key: "title", className: "section-heading" },
          "A premium digital backbone for agriculture-led village transformation"
        ),
        h(
          "p",
          { key: "text", className: "section-description" },
          "Bring sector analytics, live admin updates, and district-ready visual reporting into one production-style experience."
        ),
        h(
          "div",
          {
            key: "actions",
            className: "banner-actions"
          },
          [
            h(
              "button",
              {
                key: "analytics",
                type: "button",
                className: "btn btn-smart-primary",
                onClick: () => navigate("/analytics")
              },
              "View Analytics"
            ),
            h(
              "button",
              {
                key: "contact",
                type: "button",
                className: "btn btn-outline-smart",
                onClick: () => navigate("/contact")
              },
              "Contact Programme Team"
            )
          ]
        )
      ])
    ])
  ]);
};

export default FullWidthBanner;

