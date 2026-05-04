import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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

  return <article className="village-card premium-card" onClick={() => navigate(`/villages/${village._id}`)}>
  <div key="visual" className="village-card-visual">
    <div key="image-frame" className={`public-image-frame village-card-image-frame${activeImage ? "" : " is-missing"}`}>
      {activeImage
                    ? <img key={activeImage.src} src={activeImage.src} alt={`${village.name} village visual`} className="public-image village-card-image" onError={() => setImageIndex((current) => current + 1)} />
                    : null}
      <span key="note" className="media-fallback">
        {`Add ${imageCandidates[0]?.recommended || "/images/village.jpg"}`}
      </span>
    </div>
    <span key="state" className="village-state-badge">
      {village.state}
    </span>
    <div key="glow" className="village-visual-glow" />
  </div>
  <div key="content" className="village-card-content">
    <h3 key="name" className="village-card-title">
      {village.name}
    </h3>
    <p key="description" className="village-card-text">
      {village.description}
    </p>
    <div key="meta" className="village-meta-grid">
      <span key="water" className="pill-badge water">
        {`Water ${formatPercent(village.waterLevel)}`}
      </span>
      <span key="growth" className="pill-badge growth">
        {`Growth ${formatPercent(village.growthIndex)}`}
      </span>
      <span key="infra" className="pill-badge earth">
        {village.roadCondition}
      </span>
      <span key="literacy" className="pill-badge literacy">
        {`Literacy ${formatPercent(village.literacyRate)}`}
      </span>
    </div>
    <div key="footer" className="village-card-footer">
      <span key="soil" className="small-label">
        {`Soil: ${village.soilType}`}
      </span>
      <strong key="population" className="small-value">
        {`${formatNumber(village.population)} citizens`}
      </strong>
    </div>
  </div>
</article>;
};

export default VillageCard;
