import createSectorPage from "./createSectorPage";

const average = (villages, key) =>
  Math.round(villages.reduce((sum, village) => sum + (village[key] || 0), 0) / Math.max(villages.length, 1));

const config = {
  chips: ["Roads", "Mobility", "Public works"],
  sectionEyebrow: "Infrastructure Execution",
  sectionTitle: "Roads and infrastructure quality with visible operational context",
  sectionDescription:
    "Use this page to demonstrate responsive cards, charts, and tables for public works, connectivity, and service infrastructure.",
  metricChip: "Mobility support index",
  tableTitle: "Infrastructure and transport view",
  getStats: (villages) => [
    {
      icon: "🛣️",
      title: "Infrastructure score",
      value: average(villages, "infrastructureScore"),
      tone: "earth",
      description: "Overall infrastructure readiness across the network.",
      formatter: (value) => `${value}%`
    },
    {
      icon: "🏗️",
      title: "Growth support",
      value: average(villages, "growthIndex"),
      tone: "orange",
      description: "Roads and logistics directly strengthen development momentum.",
      formatter: (value) => `${value}%`
    },
    {
      icon: "📦",
      title: "Health access",
      value: average(villages, "healthAccessScore"),
      tone: "green",
      description: "Service access improves when road infrastructure is dependable.",
      formatter: (value) => `${value}%`
    },
    {
      icon: "🏫",
      title: "Education support",
      value: average(villages, "educationScore"),
      tone: "sky",
      description: "Transport quality helps schools and citizens stay connected.",
      formatter: (value) => `${value}%`
    }
  ],
  getCharts: (villages) => [
    {
      title: "Infrastructure performance",
      subtitle: "Village comparison",
      type: "bar",
      data: {
        labels: villages.slice(0, 6).map((village) => village.name),
        datasets: [
          {
            label: "Infrastructure score",
            data: villages.slice(0, 6).map((village) => village.infrastructureScore),
            backgroundColor: "#8a5a44"
          }
        ]
      }
    },
    {
      title: "Road condition categories",
      subtitle: "Across all villages",
      type: "pie",
      data: {
        labels: [...new Set(villages.map((village) => village.roadCondition))],
        datasets: [
          {
            data: [...new Set(villages.map((village) => village.roadCondition))].map(
              (status) => villages.filter((village) => village.roadCondition === status).length
            ),
            backgroundColor: ["#8a5a44", "#f1a54b", "#7b3f52", "#74c0fc"]
          }
        ]
      }
    }
  ],
  getInsights: () => [
    "Infrastructure performance is easier to communicate when linked with health, education, and growth outcomes.",
    "Road condition summaries can be used to prioritise logistics corridors and farmer market access.",
    "This section helps the overall project feel like a true governance operations platform rather than a simple website."
  ],
  getRows: (villages) => villages,
  columns: [
    { key: "name", label: "Village" },
    { key: "state", label: "State" },
    { key: "roadCondition", label: "Road Condition" },
    { key: "infrastructureScore", label: "Score", render: (record) => `${record.infrastructureScore}%` },
    { key: "electricityStatus", label: "Power Support" }
  ]
};

export default createSectorPage(config);
