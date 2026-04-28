import createSectorPage from "./createSectorPage";

const average = (villages, key) =>
  Math.round(villages.reduce((sum, village) => sum + (village[key] || 0), 0) / Math.max(villages.length, 1));

const config = {
  chips: ["Sanitation", "Resilience", "Civic services"],
  sectionEyebrow: "Extended Sector View",
  sectionTitle: "Additional governance sectors beyond the core modules",
  sectionDescription:
    "This page broadens the platform into a more complete civic system by framing resilience, sanitation, and support services as measurable layers.",
  metricChip: "Integrated public service readiness",
  tableTitle: "Extended sector monitoring",
  getStats: (villages) => [
    {
      icon: "🧱",
      title: "Infrastructure score",
      value: average(villages, "infrastructureScore"),
      tone: "earth",
      description: "Foundational public services depend on basic infrastructure quality.",
      formatter: (value) => `${value}%`
    },
    {
      icon: "🌿",
      title: "Water level",
      value: average(villages, "waterLevel"),
      tone: "green",
      description: "Resource quality affects sanitation and resilience planning.",
      formatter: (value) => `${value}%`
    },
    {
      icon: "🧑‍🤝‍🧑",
      title: "Health access",
      value: average(villages, "healthAccessScore"),
      tone: "maroon",
      description: "Citizen-facing services should be planned as a connected system.",
      formatter: (value) => `${value}%`
    },
    {
      icon: "📈",
      title: "Growth linkage",
      value: average(villages, "growthIndex"),
      tone: "orange",
      description: "Integrated civic service quality supports long-term growth.",
      formatter: (value) => `${value}%`
    }
  ],
  getCharts: (villages) => [
    {
      title: "Integrated service readiness",
      subtitle: "Comparing public system signals",
      type: "bar",
      data: {
        labels: ["Water", "Infrastructure", "Health", "Education"],
        datasets: [
          {
            label: "Average score",
            data: [
              average(villages, "waterLevel"),
              average(villages, "infrastructureScore"),
              average(villages, "healthAccessScore"),
              average(villages, "educationScore")
            ],
            backgroundColor: ["#4f9d69", "#8a5a44", "#7b3f52", "#74c0fc"]
          }
        ]
      }
    },
    {
      title: "Cross-sector balance",
      subtitle: "Quarter style overview",
      type: "line",
      data: {
        labels: ["Foundation", "Expansion", "Quality", "Resilience"],
        datasets: [
          {
            label: "Service maturity",
            data: [65, 72, 76, 80],
            borderColor: "#7b3f52",
            tension: 0.35
          }
        ]
      }
    }
  ],
  getInsights: () => [
    "The More Sectors page helps the product feel complete rather than narrowly thematic.",
    "Integrated public services are easier to understand when shown as one coordinated operating model.",
    "This section is also useful as a flexible space for future modules in a team project."
  ],
  getRows: (villages) => villages,
  columns: [
    { key: "name", label: "Village" },
    { key: "state", label: "State" },
    { key: "waterLevel", label: "Water", render: (record) => `${record.waterLevel}%` },
    { key: "healthAccessScore", label: "Health", render: (record) => `${record.healthAccessScore}%` },
    { key: "infrastructureScore", label: "Infrastructure", render: (record) => `${record.infrastructureScore}%` }
  ]
};

export default createSectorPage(config);
