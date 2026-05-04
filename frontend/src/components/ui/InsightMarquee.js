import React from "react";
const paletteClasses = [
  "theme-aurora",
  "theme-sunset",
  "theme-lagoon",
  "theme-gold",
  "theme-plum"
];

const renderTrackItems = (items, prefix) =>
  items.map((item, index) =>
    <span key={`${prefix}-item-${index}`} className={`insight-marquee-item ${paletteClasses[index % paletteClasses.length]}`}>
  <span key="pulse" className="insight-marquee-dot" />
  <div key="content" className="insight-marquee-content">
    <span key="index" className="insight-marquee-index">
      {String(index + 1).padStart(2, "0")}
    </span>
    <span key="label" className="insight-marquee-label">
      {item}
    </span>
  </div>
</span>
  );

const InsightMarquee = ({
  eyebrow = "Live Growth Ribbon",
  items = [],
  speed = "normal",
  reverse = false
}) => {
  const safeItems = items.length ? items : ["District-ready intelligence", "Smart rural growth", "Future-ready governance"];

  return <section className="insight-marquee-section">
  <div key="container" className="container">
    <div key="shell" className="insight-marquee-shell">
      <div key="header" className="insight-marquee-header">
        <span key="eyebrow" className="section-eyebrow insight-marquee-eyebrow">
          {eyebrow}
        </span>
      </div>
      <div key="viewport" className="insight-marquee-viewport">
        <div key="track" className={`insight-marquee-track speed-${speed}${reverse ? " reverse" : ""}`}>
          <div key="run-a" className="insight-marquee-run">
            {renderTrackItems(safeItems, "a")}
          </div>
          <div key="run-b" className="insight-marquee-run" aria-hidden="true">
            {renderTrackItems(safeItems, "b")}
          </div>
        </div>
      </div>
    </div>
  </div>
</section>;
};

export default InsightMarquee;
