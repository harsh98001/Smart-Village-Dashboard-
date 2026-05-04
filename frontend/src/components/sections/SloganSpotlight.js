import React from "react";
import SectionTitle from "../ui/SectionTitle";

const slogans = [
  "Smarter villages begin with visible data, trusted services, and local action.",
  "Growth looks stronger when agriculture, roads, energy, CCTV, and AQI live in one dashboard.",
  "A premium governance platform should tell a story, not just show a list of cards."
];

const SloganSpotlight = () =>
  <section className="landing-slogan-section">
  <div key="container" className="container">
    <div key="card" className="slogan-spotlight-card premium-card">
      <div key="copy" className="slogan-spotlight-copy">
        <SectionTitle key="title" eyebrow="Vision Block" title="Smart villages grow best when the dashboard speaks like a mission, not a spreadsheet" description="This break section is placed after the first six village cards to improve flow and make the landing page feel more curated." />
        <div key="list" className="slogan-pill-grid">
          {slogans.map((slogan) => <div key={slogan} className="slogan-pill">
            {slogan}
          </div>)}
        </div>
      </div>
      <div key="image" className="slogan-image-slot public-image-frame">
        <img key="visual" src="public/images/cartoon.png" alt="Smart village slogan visual" className="public-image" onError={(event) => {
                      event.currentTarget.parentElement?.classList.add("is-missing");
                    }} />
        <span key="note" className="media-fallback">Add /images/landing/smart-slogan.jpg</span>
      </div>
    </div>
  </div>
</section>;

export default SloganSpotlight;
