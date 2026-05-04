import React from "react";
const SectionTitle = ({ eyebrow, title, description, align = "start" }) =>
  <div className={`section-title text-${align}`}>
  {eyebrow
        ? <span key="eyebrow" className="section-eyebrow">
    {eyebrow}
  </span>
        : null}
  <h2 key="title" className="section-heading">
    {title}
  </h2>
  {description
        ? <p key="description" className="section-description">
    {description}
  </p>
        : null}
</div>;

export default SectionTitle;

