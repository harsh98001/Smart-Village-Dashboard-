import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
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

  return <div className={["chart-card", className].filter(Boolean).join(" ")}>
  <div key="header" className="chart-card-header">
    <h3 key="title" className="chart-card-title">
      {title}
    </h3>
    {subtitle
              ? <span key="subtitle" className="chart-card-subtitle">
      {subtitle}
    </span>
              : null}
  </div>
  <canvas key="canvas" ref={canvasRef} height={canvasHeight} />
</div>;
};

export default ChartCard;
