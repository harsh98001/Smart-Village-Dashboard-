import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { h } from "../utils/h";
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
    return h("div", { className: "container py-5" }, "Loading village details...");
  }

  return h("div", null, [
    h(PageBanner, {
      key: "banner",
      chips: [village.state, village.soilType, village.sector]
    }),
    h("section", { key: "body", className: "village-detail-section" }, [
      h("div", { key: "container", className: "container" }, [
        h("div", { key: "hero", className: "village-detail-hero premium-card" }, [
          h("div", { key: "copy", className: "village-detail-copy" }, [
            h("span", { key: "eyebrow", className: "section-eyebrow" }, "Village intelligence profile"),
            h("h2", { key: "title", className: "section-heading" }, `${village.name}, ${village.state}`),
            h("p", { key: "desc", className: "section-description" }, village.description),
            h("div", { key: "tags", className: "page-banner-chips" }, [
              h("span", { key: "water", className: "page-chip" }, `Water ${village.waterLevel}%`),
              h("span", { key: "growth", className: "page-chip" }, `Growth ${village.growthIndex}%`),
              h("span", { key: "literacy", className: "page-chip" }, `Literacy ${village.literacyRate}%`)
            ])
          ]),
          h("div", { key: "visual", className: "village-detail-visual" }, [
            h("div", { key: "placeholder", className: "hero-image-placeholder" }, [
              h("span", { key: "label", className: "hero-placeholder-label" }, "Village banner placeholder")
            ])
          ])
        ]),
        h("div", { key: "stats", className: "stats-grid compact-grid" }, [
          h(StatCard, {
            key: "water",
            icon: "💧",
            title: "Water level",
            value: village.waterLevel,
            description: village.irrigation,
            formatter: (value) => `${value}%`,
            tone: "sky"
          }),
          h(StatCard, {
            key: "infra",
            icon: "🛣️",
            title: "Infrastructure",
            value: village.infrastructureScore,
            description: village.roadCondition,
            formatter: (value) => `${value}%`,
            tone: "earth"
          }),
          h(StatCard, {
            key: "health",
            icon: "🏥",
            title: "Health access",
            value: village.healthAccessScore,
            description: village.healthFacilities.join(", "),
            formatter: (value) => `${value}%`,
            tone: "maroon"
          }),
          h(StatCard, {
            key: "education",
            icon: "📚",
            title: "Education",
            value: village.educationScore,
            description: village.educationFacilities.join(", "),
            formatter: (value) => `${value}%`,
            tone: "green"
          })
        ]),
        h("div", { key: "split", className: "dashboard-split-grid" }, [
          h(ChartCard, {
            key: "chart",
            title: "Village performance mix",
            subtitle: "Core village indicators",
            config: {
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
            }
          }),
          h("div", { key: "info", className: "premium-card village-detail-lists" }, [
            h("h3", { key: "title" }, "Highlights"),
            h("ul", { key: "list", className: "insight-list" }, village.highlights.map((item) => h("li", { key: item }, item))),
            h("h4", { key: "subTitle" }, "Industries"),
            h("p", { key: "industries" }, village.industries.join(", ")),
            h("h4", { key: "techTitle" }, "Technology Usage"),
            h("p", { key: "tech" }, village.technologyUsage)
          ])
        ])
      ])
    ])
  ]);
};

export default VillageDetailPage;

