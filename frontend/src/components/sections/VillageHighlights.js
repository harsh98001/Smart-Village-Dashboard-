import React from "react";
import { h } from "../../utils/h";
import SectionTitle from "../ui/SectionTitle";
import VillageCard from "../ui/VillageCard";

const VillageHighlights = ({
  villages,
  eyebrow = "Village Network",
  title = "Explore 30 villages across diverse Indian states",
  description = "Each card shows a quick snapshot of water, electricity, infrastructure, literacy, soil, and development status.",
  className = ""
}) =>
  h("section", { className: "village-highlights-section" }, [
    h("div", { key: "container", className: `container ${className}`.trim() }, [
      h(SectionTitle, {
        key: "title",
        eyebrow,
        title,
        description
      }),
      h(
        "div",
        {
          key: "grid",
          className: "village-grid"
        },
        villages.map((village) => h(VillageCard, { key: village._id, village }))
      )
    ])
  ]);

export default VillageHighlights;
