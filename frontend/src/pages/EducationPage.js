import createSectorPage from "./createSectorPage";

const average = (villages, key) =>
  Math.round(villages.reduce((sum, village) => sum + (village[key] || 0), 0) / Math.max(villages.length, 1));

const config = {
  chips: ["Schools", "Literacy", "Digital learning"],
  sectionEyebrow: "Education Quality",
  sectionTitle: "Literacy, learning spaces, and digital capacity in one module",
  sectionDescription:
    "This page combines education outcomes, school infrastructure, and digital capability into a refined civic-tech presentation.",
  metricChip: "Learning transformation",
  tableTitle: "Education system table",
  getStats: (villages) => [
    {
      icon: "📚",
      title: "Literacy rate",
      value: average(villages, "literacyRate"),
      tone: "sky",
      description: "Average literacy across the monitored village network.",
      formatter: (value) => `${value}%`
    },
    {
      icon: "🏫",
      title: "Education score",
      value: average(villages, "educationScore"),
      tone: "green",
      description: "Facility quality and digital readiness combined.",
      formatter: (value) => `${value}%`
    },
    {
      icon: "🧠",
      title: "Technology support",
      value: average(villages, "renewableIndex"),
      tone: "orange",
      description: "Connected learning improves when power and devices are stable.",
      formatter: (value) => `${value}%`
    },
    {
      icon: "🌍",
      title: "Growth linkage",
      value: average(villages, "growthIndex"),
      tone: "earth",
      description: "Education remains a core long-term driver of village growth.",
      formatter: (value) => `${value}%`
    }
  ],
  getCharts: (villages) => [
    {
      title: "Literacy comparison",
      subtitle: "First six village profiles",
      type: "bar",
      data: {
        labels: villages.slice(0, 6).map((village) => village.name),
        datasets: [
          {
            label: "Literacy rate",
            data: villages.slice(0, 6).map((village) => village.literacyRate),
            backgroundColor: "#74c0fc"
          }
        ]
      }
    },
    {
      title: "Education and growth",
      subtitle: "Shared improvement pattern",
      type: "line",
      data: {
        labels: villages.slice(0, 6).map((village) => village.name),
        datasets: [
          {
            label: "Education score",
            data: villages.slice(0, 6).map((village) => village.educationScore),
            borderColor: "#4f9d69",
            tension: 0.35
          },
          {
            label: "Growth index",
            data: villages.slice(0, 6).map((village) => village.growthIndex),
            borderColor: "#7b3f52",
            tension: 0.35
          }
        ]
      }
    }
  ],
  getInsights: () => [
    "Literacy and growth tend to move together when infrastructure and service delivery stay reliable.",
    "Digital classrooms and libraries make this platform presentation feel future-ready and practical.",
    "The education module is especially useful for interviews and project demos because the signals are immediately understandable."
  ],
  getRows: (villages) =>
    villages.map((village) => ({
      ...village,
      facilities: village.educationFacilities.join(", ")
    })),
  columns: [
    { key: "name", label: "Village" },
    { key: "state", label: "State" },
    { key: "facilities", label: "Education Facilities" },
    { key: "literacyRate", label: "Literacy", render: (record) => `${record.literacyRate}%` },
    { key: "educationScore", label: "Score", render: (record) => `${record.educationScore}%` }
  ]
};

export default createSectorPage(config);

