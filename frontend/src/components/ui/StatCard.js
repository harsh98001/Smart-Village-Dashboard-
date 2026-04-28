import React from "react";
import { h } from "../../utils/h";
import Counter from "./Counter";

const StatCard = ({ icon, title, value, description, formatter, tone = "sky" }) =>
  h("div", { className: `stat-card tone-${tone}` }, [
    h(
      "div",
      {
        key: "icon",
        className: "stat-icon"
      },
      icon || "◌"
    ),
    h(
      "div",
      {
        key: "body",
        className: "stat-body"
      },
      [
        h(
          "span",
          {
            key: "title",
            className: "stat-title"
          },
          title
        ),
        h(
          "strong",
          {
            key: "value",
            className: "stat-value"
          },
          h(Counter, {
            value,
            formatter
          })
        ),
        h(
          "p",
          {
            key: "desc",
            className: "stat-description"
          },
          description
        )
      ]
    )
  ]);

export default StatCard;

