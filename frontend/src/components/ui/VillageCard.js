import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { h } from "../../utils/h";
import { formatNumber, formatPercent } from "../../utils/formatters";

const toVillageImageSlug = (value) =>
  String(value || "village")
    .trim()
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

const buildVillageImageCandidates = (villageName) => {
  const slug = toVillageImageSlug(villageName);
  return ["jpg", "jpeg", "png", "webp"].map((extension) => ({
    src: `/images/${slug}.${extension}`,
    recommended: `/images/${slug}.jpg`
  }));
};

const VillageCard = ({ village }) => {
  const navigate = useNavigate();
  const imageCandidates = buildVillageImageCandidates(village.name);
  const [imageIndex, setImageIndex] = useState(0);

  useEffect(() => {
    setImageIndex(0);
  }, [village.name]);

  const activeImage = imageCandidates[imageIndex] || null;

  return h(
    "article",
    {
      className: "village-card premium-card",
      onClick: () => navigate(`/villages/${village._id}`)
    },
    [
      h("div", { key: "visual", className: "village-card-visual" }, [
        h(
          "div",
          {
            key: "image-frame",
            className: `public-image-frame village-card-image-frame${activeImage ? "" : " is-missing"}`
          },
          [
            activeImage
              ? h("img", {
                  key: activeImage.src,
                  src: activeImage.src,
                  alt: `${village.name} village visual`,
                  className: "public-image village-card-image",
                  onError: () => setImageIndex((current) => current + 1)
                })
              : null,
            h(
              "span",
              { key: "note", className: "media-fallback" },
              `Add ${imageCandidates[0]?.recommended || "/images/village.jpg"}`
            )
          ]
        ),
        h(
          "span",
          { key: "state", className: "village-state-badge" },
          village.state
        ),
        h("div", { key: "glow", className: "village-visual-glow" })
      ]),
      h("div", { key: "content", className: "village-card-content" }, [
        h("h3", { key: "name", className: "village-card-title" }, village.name),
        h("p", { key: "description", className: "village-card-text" }, village.description),
        h("div", { key: "meta", className: "village-meta-grid" }, [
          h("span", { key: "water", className: "pill-badge water" }, `Water ${formatPercent(village.waterLevel)}`),
          h("span", { key: "growth", className: "pill-badge growth" }, `Growth ${formatPercent(village.growthIndex)}`),
          h("span", { key: "infra", className: "pill-badge earth" }, village.roadCondition),
          h("span", { key: "literacy", className: "pill-badge literacy" }, `Literacy ${formatPercent(village.literacyRate)}`)
        ]),
        h("div", { key: "footer", className: "village-card-footer" }, [
          h("span", { key: "soil", className: "small-label" }, `Soil: ${village.soilType}`),
          h("strong", { key: "population", className: "small-value" }, `${formatNumber(village.population)} citizens`)
        ])
      ])
    ]
  );
};

export default VillageCard;
