import React from "react";
import usePageMeta from "../../hooks/usePageMeta";

const PageBanner = ({ chips = [] }) => {
  const meta = usePageMeta();

  return <section className="page-banner">
  <div key="container" className="container">
    <div key="inner" className="page-banner-inner">
      <span key="eyebrow" className="section-eyebrow">
        {meta.eyebrow}
      </span>
      <h1 key="title" className="page-banner-title">
        {meta.title}
      </h1>
      <p key="description" className="page-banner-description">
        {meta.description}
      </p>
      {chips.length
                ? <div key="chips" className="page-banner-chips">
        {chips.map((chip) => <span key={chip} className="page-chip">
          {chip}
        </span>)}
      </div>
                : null}
    </div>
  </div>
</section>;
};

export default PageBanner;

