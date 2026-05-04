import React from "react";
import SectionTitle from "../ui/SectionTitle";
import VillageCard from "../ui/VillageCard";

const VillageHighlights = ({
  villages,
  eyebrow = "Village Network",
  title = "Explore 30 villages across diverse Indian states",
  description = "Each card shows a quick snapshot of water, electricity, infrastructure, literacy, soil, and development status.",
  className = ""
}) =>
  <section className="village-highlights-section">
  <div key="container" className={`container ${className}`.trim()}>
    <SectionTitle key="title" eyebrow={eyebrow} title={title} description={description} />
    <div key="grid" className="village-grid">
      {villages.map((village) => <VillageCard key={village._id} village={village} />)}
    </div>
  </div>
</section>;

export default VillageHighlights;
