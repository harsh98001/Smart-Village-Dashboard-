import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import { h } from "../../utils/h";

const ChartCard = ({ title, subtitle, config, className = "", canvasHeight = 220 }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current || !config) {
      return undefined;
    }

    const chartInstance = new Chart(canvasRef.current, config);

    return () => {
      chartInstance.destroy();
    };
  }, [config]);

  return h("div", { className: ["chart-card", className].filter(Boolean).join(" ") }, [
    h(
      "div",
      {
        key: "header",
        className: "chart-card-header"
      },
      [
        h(
          "h3",
          {
            key: "title",
            className: "chart-card-title"
          },
          title
        ),
        subtitle
          ? h(
              "span",
              {
                key: "subtitle",
                className: "chart-card-subtitle"
              },
              subtitle
            )
          : null
      ]
    ),
    h("canvas", {
      key: "canvas",
      ref: canvasRef,
      height: canvasHeight
    })
  ]);
};

export default ChartCard;
