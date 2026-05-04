import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useData } from "../context/DataContext";
import PageBanner from "../components/layout/PageBanner";
import StatCard from "../components/ui/StatCard";
import ChartCard from "../components/ui/ChartCard";

const VillageDetailPage = () => {
  const { id } = useParams();
  const { fetchVillageById } = useData();
  const [village, setVillage] = useState(null);

  useEffect(() => {
    const loadVillage = async () => {
      const response = await fetchVillageById(id);
      setVillage(response);
    };

    loadVillage();
  }, [fetchVillageById, id]);

  if (!village) {
    return <div className="container py-5">Loading village details...</div>;
  }

  return <div>
  <PageBanner key="banner" chips={[village.state, village.soilType, village.sector]} />
  <section key="body" className="village-detail-section">
    <div key="container" className="container">
      <div key="hero" className="village-detail-hero premium-card">
        <div key="copy" className="village-detail-copy">
          <span key="eyebrow" className="section-eyebrow">Village intelligence profile</span>
          <h2 key="title" className="section-heading">
            {`${village.name}, ${village.state}`}
          </h2>
          <p key="desc" className="section-description">
            {village.description}
          </p>
          <div key="tags" className="page-banner-chips">
            <span key="water" className="page-chip">
              {`Water ${village.waterLevel}%`}
            </span>
            <span key="growth" className="page-chip">
              {`Growth ${village.growthIndex}%`}
            </span>
            <span key="literacy" className="page-chip">
              {`Literacy ${village.literacyRate}%`}
            </span>
          </div>
        </div>
        <div key="visual" className="village-detail-visual">
          <div key="placeholder" className="hero-image-placeholder">
            <span key="label" className="hero-placeholder-label">Village banner placeholder</span>
          </div>
        </div>
      </div>
      <div key="stats" className="stats-grid compact-grid">
        <StatCard key="water" icon="💧" title="Water level" value={village.waterLevel} description={village.irrigation} formatter={(value) => `${value}%`} tone="sky" />
        <StatCard key="infra" icon="🛣️" title="Infrastructure" value={village.infrastructureScore} description={village.roadCondition} formatter={(value) => `${value}%`} tone="earth" />
        <StatCard key="health" icon="🏥" title="Health access" value={village.healthAccessScore} description={village.healthFacilities.join(", ")} formatter={(value) => `${value}%`} tone="maroon" />
        <StatCard key="education" icon="📚" title="Education" value={village.educationScore} description={village.educationFacilities.join(", ")} formatter={(value) => `${value}%`} tone="green" />
      </div>
      <div key="split" className="dashboard-split-grid">
        <ChartCard key="chart" title="Village performance mix" subtitle="Core village indicators" config={{
                      type: "bar",
                      data: {
                        labels: ["Growth", "Water", "Infrastructure", "Literacy", "Renewable"],
                        datasets: [
                          {
                            label: village.name,
                            data: [
                              village.growthIndex,
                              village.waterLevel,
                              village.infrastructureScore,
                              village.literacyRate,
                              village.renewableIndex
                            ],
                            backgroundColor: ["#7b3f52", "#74c0fc", "#8a5a44", "#4f9d69", "#f1a54b"]
                          }
                        ]
                      },
                      options: { responsive: true, maintainAspectRatio: false }
                    }} />
        <div key="info" className="premium-card village-detail-lists">
          <h3 key="title">Highlights</h3>
          <ul key="list" className="insight-list">
            {village.highlights.map((item) => <li key={item}>
              {item}
            </li>)}
          </ul>
          <h4 key="subTitle">Industries</h4>
          <p key="industries">
            {village.industries.join(", ")}
          </p>
          <h4 key="techTitle">Technology Usage</h4>
          <p key="tech">
            {village.technologyUsage}
          </p>
        </div>
      </div>
    </div>
  </section>
</div>;
};

export default VillageDetailPage;

