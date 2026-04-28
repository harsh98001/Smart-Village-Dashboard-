import createSectorPage from "./createSectorPage";

const average = (villages, key) =>
  Math.round(villages.reduce((sum, village) => sum + (village[key] || 0), 0) / Math.max(villages.length, 1));

const config = {
  chips: ["Local enterprise", "Processing", "Employment"],
  sectionEyebrow: "Rural Enterprise",
  sectionTitle: "Industrial and livelihood momentum across the network",
  sectionDescription:
    "From food processing to craft clusters, this module frames rural enterprise as a measurable growth engine within the dashboard.",
  metricChip: "Enterprise acceleration",
  tableTitle: "Industries and enterprise table",
  getStats: (villages) => [
    {
      icon: "🏭",
      title: "Growth index",
      value: average(villages, "growthIndex"),
      tone: "orange",
      description: "Enterprise-ready villages tend to show stronger momentum.",
      formatter: (value) => `${value}%`
    },
    {
      icon: "🚚",
      title: "Infrastructure score",
      value: average(villages, "infrastructureScore"),
      tone: "earth",
      description: "Roads and logistics are core to rural industrial flow.",
      formatter: (value) => `${value}%`
    },
    {
      icon: "⚡",
      title: "Renewable index",
      value: average(villages, "renewableIndex"),
      tone: "green",
      description: "Reliable energy widens the operational base for local units.",
      formatter: (value) => `${value}%`
    },
    {
      icon: "👩‍💼",
      title: "Literacy support",
      value: average(villages, "literacyRate"),
      tone: "sky",
      description: "Human capability remains a strong productivity enabler.",
      formatter: (value) => `${value}%`
    }
  ],
  getCharts: (villages) => [
    {
      title: "Industrial readiness comparison",
      subtitle: "Growth and infrastructure together",
      type: "bar",
      data: {
        labels: villages.slice(0, 6).map((village) => village.name),
        datasets: [
          {
            label: "Growth index",
            data: villages.slice(0, 6).map((village) => village.growthIndex),
            backgroundColor: "#f1a54b"
          },
          {
            label: "Infrastructure score",
            data: villages.slice(0, 6).map((village) => village.infrastructureScore),
            backgroundColor: "#8a5a44"
          }
        ]
      }
    },
    {
      title: "Industry mix",
      subtitle: "Top categories in current records",
      type: "pie",
      data: {
        labels: ["Processing", "Logistics", "Crafts", "Energy", "Tourism"],
        datasets: [
          {
            data: [8, 6, 7, 5, 4],
            backgroundColor: ["#f1a54b", "#8a5a44", "#7b3f52", "#4f9d69", "#74c0fc"]
          }
        ]
      }
    }
  ],
  getInsights: () => [
    "Industries work best in the dashboard when shown as part of a broader growth ecosystem.",
    "Enterprise health becomes more credible when energy, logistics, and literacy are visible nearby.",
    "This view helps position the project strongly for GitHub showcases and interviews."
  ],
  getRows: (villages) =>
    villages.map((village) => ({
      ...village,
      industryList: village.industries.join(", ")
    })),
  columns: [
    { key: "name", label: "Village" },
    { key: "state", label: "State" },
    { key: "industryList", label: "Industries" },
    { key: "growthIndex", label: "Growth", render: (record) => `${record.growthIndex}%` },
    { key: "infrastructureScore", label: "Infrastructure", render: (record) => `${record.infrastructureScore}%` }
  ]
};

export default createSectorPage(config);

