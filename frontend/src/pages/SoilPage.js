import createSectorPage from "./createSectorPage";

const average = (villages, key) =>
  Math.round(villages.reduce((sum, village) => sum + (village[key] || 0), 0) / Math.max(villages.length, 1));

const config = {
  chips: ["Soil health", "Crop suitability", "Resilience mapping"],
  sectionEyebrow: "Soil Quality Intelligence",
  sectionTitle: "Ground-level soil readiness across the village network",
  sectionDescription:
    "Monitor land profile, crop matching, and local resilience needs using responsive cards, charts, and tables.",
  metricChip: "Soil-based crop alignment",
  tableTitle: "Village soil and crop profile",
  getStats: (villages) => [
    {
      icon: "🌱",
      title: "Avg. literacy support",
      value: average(villages, "literacyRate"),
      tone: "sky",
      description: "Farmer education readiness improves soil management decisions.",
      formatter: (value) => `${value}%`
    },
    {
      icon: "🧪",
      title: "Irrigation coverage",
      value: average(villages, "irrigationCoverage"),
      tone: "green",
      description: "Soil performance is linked to irrigation stability.",
      formatter: (value) => `${value}%`
    },
    {
      icon: "🌾",
      title: "Growth index",
      value: average(villages, "growthIndex"),
      tone: "orange",
      description: "Soil health remains a strong multiplier for output.",
      formatter: (value) => `${value}%`
    },
    {
      icon: "🛤️",
      title: "Infrastructure score",
      value: average(villages, "infrastructureScore"),
      tone: "earth",
      description: "Better logistics strengthen land-to-market flow.",
      formatter: (value) => `${value}%`
    }
  ],
  getCharts: (villages) => [
    {
      title: "Soil-linked irrigation readiness",
      subtitle: "Top villages by water support",
      type: "bar",
      data: {
        labels: villages.slice(0, 6).map((village) => village.name),
        datasets: [
          {
            label: "Irrigation coverage",
            data: villages.slice(0, 6).map((village) => village.irrigationCoverage),
            backgroundColor: "#4f9d69"
          }
        ]
      }
    },
    {
      title: "Soil type distribution",
      subtitle: "Across all prepared villages",
      type: "pie",
      data: {
        labels: [...new Set(villages.map((village) => village.soilType))],
        datasets: [
          {
            data: [...new Set(villages.map((village) => village.soilType))].map(
              (soil) => villages.filter((village) => village.soilType === soil).length
            ),
            backgroundColor: ["#7b3f52", "#74c0fc", "#4f9d69", "#f1a54b", "#8a5a44", "#d8ecff"]
          }
        ]
      }
    }
  ],
  getInsights: (villages) => [
    `${villages.filter((village) => village.soilType === "Alluvial").length} villages are operating on highly productive alluvial conditions.`,
    "Soil quality should be reviewed alongside irrigation coverage and literacy readiness for durable farm outcomes.",
    "Regions with laterite or mountain loam benefit from tailored crop advisories and water planning."
  ],
  getRows: (villages) =>
    villages.map((village) => ({
      ...village,
      crops: village.agricultureCrops.join(", ")
    })),
  columns: [
    { key: "name", label: "Village" },
    { key: "state", label: "State" },
    { key: "soilType", label: "Soil Type" },
    { key: "crops", label: "Major Crops" },
    { key: "waterLevel", label: "Water Level", render: (record) => `${record.waterLevel}%` }
  ]
};

export default createSectorPage(config);

