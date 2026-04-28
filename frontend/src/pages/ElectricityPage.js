import createSectorPage from "./createSectorPage";

const average = (villages, key) =>
  Math.round(villages.reduce((sum, village) => sum + (village[key] || 0), 0) / Math.max(villages.length, 1));

const config = {
  chips: ["Grid reliability", "Renewables", "Smart meters"],
  sectionEyebrow: "Energy Assurance",
  sectionTitle: "Village energy readiness with smart infrastructure visibility",
  sectionDescription:
    "Power reliability, renewable energy, and smart metering trends are presented in an executive-friendly, modern view.",
  metricChip: "Renewable readiness",
  tableTitle: "Electricity and energy overview",
  getStats: (villages) => [
    {
      icon: "⚡",
      title: "Renewable index",
      value: average(villages, "renewableIndex"),
      tone: "orange",
      description: "How well villages are positioned for clean energy growth.",
      formatter: (value) => `${value}%`
    },
    {
      icon: "🔌",
      title: "Infrastructure score",
      value: average(villages, "infrastructureScore"),
      tone: "sky",
      description: "Reliable physical assets improve service consistency.",
      formatter: (value) => `${value}%`
    },
    {
      icon: "📶",
      title: "Technology adoption",
      value: average(villages, "educationScore"),
      tone: "green",
      description: "Digital systems support energy service modernisation.",
      formatter: (value) => `${value}%`
    },
    {
      icon: "🚜",
      title: "Growth support",
      value: average(villages, "growthIndex"),
      tone: "earth",
      description: "Power reliability remains central to rural enterprise growth.",
      formatter: (value) => `${value}%`
    }
  ],
  getCharts: (villages) => [
    {
      title: "Renewable energy readiness",
      subtitle: "Village by village comparison",
      type: "bar",
      data: {
        labels: villages.slice(0, 6).map((village) => village.name),
        datasets: [
          {
            label: "Renewable index",
            data: villages.slice(0, 6).map((village) => village.renewableIndex),
            backgroundColor: "#f1a54b"
          }
        ]
      }
    },
    {
      title: "Energy status mix",
      subtitle: "Distribution across all villages",
      type: "pie",
      data: {
        labels: [...new Set(villages.map((village) => village.electricityStatus))],
        datasets: [
          {
            data: [...new Set(villages.map((village) => village.electricityStatus))].map(
              (status) =>
                villages.filter((village) => village.electricityStatus === status).length
            ),
            backgroundColor: ["#f1a54b", "#4f9d69", "#7b3f52", "#74c0fc"]
          }
        ]
      }
    }
  ],
  getInsights: () => [
    "Renewable expansion should be coordinated with feeder reliability and service monitoring.",
    "Villages using smart metering language in electricity status suggest stronger modernization readiness.",
    "Energy performance becomes more valuable when linked to irrigation, enterprise, and public facility uptime."
  ],
  getRows: (villages) => villages,
  columns: [
    { key: "name", label: "Village" },
    { key: "state", label: "State" },
    { key: "electricityStatus", label: "Electricity Status" },
    { key: "renewableIndex", label: "Renewable", render: (record) => `${record.renewableIndex}%` },
    { key: "technologyUsage", label: "Technology Usage" }
  ]
};

export default createSectorPage(config);

