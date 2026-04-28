import React from "react";
import { h } from "../../utils/h";

const paletteClasses = [
  "theme-aurora",
  "theme-sunset",
  "theme-lagoon",
  "theme-gold",
  "theme-plum"
];

const renderTrackItems = (items, prefix) =>
  items.map((item, index) =>
    h(
      "span",
      {
        key: `${prefix}-item-${index}`,
        className: `insight-marquee-item ${paletteClasses[index % paletteClasses.length]}`
      },
      [
        h("span", { key: "pulse", className: "insight-marquee-dot" }),
        h("div", { key: "content", className: "insight-marquee-content" }, [
          h(
            "span",
            { key: "index", className: "insight-marquee-index" },
            String(index + 1).padStart(2, "0")
          ),
          h("span", { key: "label", className: "insight-marquee-label" }, item)
        ])
      ]
    )
  );

const InsightMarquee = ({
  eyebrow = "Live Growth Ribbon",
  items = [],
  speed = "normal",
  reverse = false
}) => {
  const safeItems = items.length ? items : ["District-ready intelligence", "Smart rural growth", "Future-ready governance"];

  return h("section", { className: "insight-marquee-section" }, [
    h("div", { key: "container", className: "container" }, [
      h("div", { key: "shell", className: "insight-marquee-shell" }, [
        h("div", { key: "header", className: "insight-marquee-header" }, [
          h("span", { key: "eyebrow", className: "section-eyebrow insight-marquee-eyebrow" }, eyebrow)
        ]),
        h("div", { key: "viewport", className: "insight-marquee-viewport" }, [
          h(
            "div",
            {
              key: "track",
              className: `insight-marquee-track speed-${speed}${reverse ? " reverse" : ""}`
            },
            [
              h("div", { key: "run-a", className: "insight-marquee-run" }, renderTrackItems(safeItems, "a")),
              h(
                "div",
                {
                  key: "run-b",
                  className: "insight-marquee-run",
                  "aria-hidden": "true"
                },
                renderTrackItems(safeItems, "b")
              )
            ]
          )
        ])
      ])
    ])
  ]);
};

export default InsightMarquee;
