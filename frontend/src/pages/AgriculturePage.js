import createSectorPage from "./createSectorPage";

const average = (villages, key) =>
  Math.round(villages.reduce((sum, village) => sum + (village[key] || 0), 0) / Math.max(villages.length, 1));

const config = {
  chips: ["Crops", "Irrigation", "Farm analytics"],
  sectionEyebrow: "Agriculture Operations",
  sectionTitle: "Crop, irrigation, and farm-readiness insights in one place",
  sectionDescription:
    "This page is designed to feel like a modern agriculture command deck for rural development teams and village administrators.",
  metricChip: "Crop productivity readiness",
  tableTitle: "Agriculture management table",
  getStats: (villages) => [
    {
      icon: "🌾",
      title: "Growth index",
      value: average(villages, "growthIndex"),
      tone: "green",
      description: "Overall agriculture-led growth signal across village profiles.",
      formatter: (value) => `${value}%`
    },
    {
      icon: "🚜",
      title: "Irrigation coverage",
      value: average(villages, "irrigationCoverage"),
      tone: "sky",
      description: "Coverage indicates field preparedness for stable production.",
      formatter: (value) => `${value}%`
    },
    {
      icon: "🧭",
      title: "Water support",
      value: average(villages, "waterLevel"),
      tone: "orange",
      description: "Water remains the strongest agriculture dependency.",
      formatter: (value) => `${value}%`
    },
    {
      icon: "📈",
      title: "Education score",
      value: average(villages, "educationScore"),
      tone: "earth",
      description: "Training capacity improves adoption of smart farm practices.",
      formatter: (value) => `${value}%`
    }
  ],
  getCharts: (villages) => [
    {
      title: "Village growth and irrigation",
      subtitle: "Comparing development and farm support",
      type: "bar",
      data: {
        labels: villages.slice(0, 6).map((village) => village.name),
        datasets: [
          {
            label: "Growth index",
            data: villages.slice(0, 6).map((village) => village.growthIndex),
            backgroundColor: "#4f9d69"
          },
          {
            label: "Irrigation coverage",
            data: villages.slice(0, 6).map((village) => village.irrigationCoverage),
            backgroundColor: "#74c0fc"
          }
        ]
      }
    },
    {
      title: "Water support trend",
      subtitle: "Selected village comparison",
      type: "line",
      data: {
        labels: villages.slice(0, 6).map((village) => village.name),
        datasets: [
          {
            label: "Water level",
            data: villages.slice(0, 6).map((village) => village.waterLevel),
            borderColor: "#7b3f52",
            backgroundColor: "rgba(123, 63, 82, 0.18)",
            tension: 0.35,
            fill: true
          }
        ]
      }
    }
  ],
  getInsights: (villages) => [
    `${villages[0]?.name || "Leading villages"} and similar profiles combine water strength with higher irrigation coverage.`,
    "Agriculture readiness improves when soil, water, and energy indicators are interpreted together.",
    "This module is ideal for explaining rural growth planning during project reviews or demonstrations."
  ],
  getRows: (villages) =>
    villages.map((village) => ({
      ...village,
      crops: village.agricultureCrops.join(", ")
    })),
  columns: [
    { key: "name", label: "Village" },
    { key: "state", label: "State" },
    { key: "crops", label: "Crops" },
    { key: "irrigation", label: "Irrigation" },
    { key: "growthIndex", label: "Growth", render: (record) => `${record.growthIndex}%` }
  ]
};

export default createSectorPage(config);

