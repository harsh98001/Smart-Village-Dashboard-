import React from "react";
import { useNavigate } from "react-router-dom";
const FullWidthBanner = () => {
  const navigate = useNavigate();

  return <section className="full-width-banner">
  <div key="container" className="container">
    <div key="card" className="banner-card">
      <span key="eyebrow" className="section-eyebrow">Growth Mission</span>
      <h2 key="title" className="section-heading">A premium digital backbone for agriculture-led village transformation</h2>
      <p key="text" className="section-description">Bring sector analytics, live admin updates, and district-ready visual reporting into one production-style experience.</p>
      <div key="actions" className="banner-actions">
        <button key="analytics" type="button" className="btn btn-smart-primary" onClick={() => navigate("/analytics")}>View Analytics</button>
        <button key="contact" type="button" className="btn btn-outline-smart" onClick={() => navigate("/contact")}>Contact Programme Team</button>
      </div>
    </div>
  </div>
</section>;
};

export default FullWidthBanner;

