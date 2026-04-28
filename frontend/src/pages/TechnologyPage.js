import createSectorPage from "./createSectorPage";

const average = (villages, key) =>
  Math.round(villages.reduce((sum, village) => sum + (village[key] || 0), 0) / Math.max(villages.length, 1));

const config = {
  chips: ["Digital kiosks", "Payments", "Service dashboards"],
  sectionEyebrow: "Technology Adoption",
  sectionTitle: "Digital public infrastructure for village governance",
  sectionDescription:
    "Track adoption of smart services, digital governance tools, and connected citizen support systems through a clean premium layout.",
  metricChip: "Digital governance readiness",
  tableTitle: "Technology adoption table",
  getStats: (villages) => [
    {
      icon: "💻",
      title: "Education score",
      value: average(villages, "educationScore"),
      tone: "sky",
      description: "Digital learning capacity supports platform adoption.",
      formatter: (value) => `${value}%`
    },
    {
      icon: "📡",
      title: "Infrastructure score",
      value: average(villages, "infrastructureScore"),
      tone: "earth",
      description: "Connected services work better with stronger physical assets.",
      formatter: (value) => `${value}%`
    },
    {
      icon: "⚙️",
      title: "Growth linkage",
      value: average(villages, "growthIndex"),
      tone: "green",
      description: "Digital adoption helps villages operate more efficiently.",
      formatter: (value) => `${value}%`
    },
    {
      icon: "🔋",
      title: "Renewable support",
      value: average(villages, "renewableIndex"),
      tone: "orange",
      description: "Energy reliability is a quiet enabler for smart services.",
      formatter: (value) => `${value}%`
    }
  ],
  getCharts: (villages) => [
    {
      title: "Digital readiness trend",
      subtitle: "Technology-linked education pattern",
      type: "line",
      data: {
        labels: villages.slice(0, 6).map((village) => village.name),
        datasets: [
          {
            label: "Education score",
            data: villages.slice(0, 6).map((village) => village.educationScore),
            borderColor: "#74c0fc",
            tension: 0.35
          },
          {
            label: "Infrastructure score",
            data: villages.slice(0, 6).map((village) => village.infrastructureScore),
            borderColor: "#8a5a44",
            tension: 0.35
          }
        ]
      }
    },
    {
      title: "Village technology narratives",
      subtitle: "Category distribution",
      type: "pie",
      data: {
        labels: [...new Set(villages.map((village) => village.technologyUsage))],
        datasets: [
          {
            data: [...new Set(villages.map((village) => village.technologyUsage))].map(
              (value) => villages.filter((village) => village.technologyUsage === value).length
            ),
            backgroundColor: ["#74c0fc", "#4f9d69", "#7b3f52", "#f1a54b"]
          }
        ]
      }
    }
  ],
  getInsights: () => [
    "Technology adoption is more convincing when paired with service outcomes instead of just feature lists.",
    "This page helps explain how the platform becomes intelligent without relying on external AI infrastructure everywhere.",
    "Digital usage patterns can be filtered further from the search and village detail views."
  ],
  getRows: (villages) => villages,
  columns: [
    { key: "name", label: "Village" },
    { key: "state", label: "State" },
    { key: "technologyUsage", label: "Technology Usage" },
    { key: "educationScore", label: "Education", render: (record) => `${record.educationScore}%` },
    { key: "infrastructureScore", label: "Infrastructure", render: (record) => `${record.infrastructureScore}%` }
  ]
};

export default createSectorPage(config);

