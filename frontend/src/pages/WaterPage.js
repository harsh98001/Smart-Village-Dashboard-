import createSectorPage from "./createSectorPage";

const average = (villages, key) =>
  Math.round(villages.reduce((sum, village) => sum + (village[key] || 0), 0) / Math.max(villages.length, 1));

const config = {
  chips: ["Reservoirs", "Rainfall", "Irrigation"],
  sectionEyebrow: "Water Governance",
  sectionTitle: "Track village water security with actionable clarity",
  sectionDescription:
    "This page helps decision-makers understand storage, rainfall trends, and irrigation reach without leaving the platform.",
  metricChip: "Water resilience benchmark",
  tableTitle: "Water and irrigation snapshot",
  getStats: (villages) => [
    {
      icon: "💧",
      title: "Average water level",
      value: average(villages, "waterLevel"),
      tone: "sky",
      description: "Current water availability across the seed village network.",
      formatter: (value) => `${value}%`
    },
    {
      icon: "🌦️",
      title: "Average rainfall",
      value: average(villages, "rainfall"),
      tone: "green",
      description: "Rainfall support informs reservoir and farming stability.",
      formatter: (value) => `${value} mm`
    },
    {
      icon: "🚰",
      title: "Irrigation coverage",
      value: average(villages, "irrigationCoverage"),
      tone: "orange",
      description: "Coverage reveals how evenly water reaches productive land.",
      formatter: (value) => `${value}%`
    },
    {
      icon: "⚙️",
      title: "Growth support",
      value: average(villages, "growthIndex"),
      tone: "earth",
      description: "Water availability is tightly linked with growth performance.",
      formatter: (value) => `${value}%`
    }
  ],
  getCharts: (villages) => [
    {
      title: "Water level by village",
      subtitle: "First six village profiles",
      type: "line",
      data: {
        labels: villages.slice(0, 6).map((village) => village.name),
        datasets: [
          {
            label: "Water level",
            data: villages.slice(0, 6).map((village) => village.waterLevel),
            borderColor: "#5ca9ff",
            backgroundColor: "rgba(92, 169, 255, 0.18)",
            fill: true,
            tension: 0.35
          }
        ]
      }
    },
    {
      title: "Rainfall versus irrigation coverage",
      subtitle: "Comparing resource support",
      type: "bar",
      data: {
        labels: villages.slice(0, 6).map((village) => village.name),
        datasets: [
          {
            label: "Rainfall / 20",
            data: villages.slice(0, 6).map((village) => Math.round(village.rainfall / 20)),
            backgroundColor: "#7b3f52"
          },
          {
            label: "Irrigation coverage",
            data: villages.slice(0, 6).map((village) => village.irrigationCoverage),
            backgroundColor: "#4f9d69"
          }
        ]
      }
    }
  ],
  getInsights: () => [
    "Water strategy should align rainfall trends with storage investments and irrigation efficiency.",
    "Villages with strong rainfall but modest coverage indicate opportunity for distribution improvements.",
    "Pre-monsoon planning is best supported by live dashboard alerts and local infrastructure records."
  ],
  getRows: (villages) => villages,
  columns: [
    { key: "name", label: "Village" },
    { key: "state", label: "State" },
    { key: "waterLevel", label: "Water Level", render: (record) => `${record.waterLevel}%` },
    { key: "irrigation", label: "Irrigation" },
    { key: "rainfall", label: "Rainfall", render: (record) => `${record.rainfall} mm` }
  ]
};

export default createSectorPage(config);

