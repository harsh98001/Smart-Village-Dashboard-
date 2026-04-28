import createSectorPage from "./createSectorPage";

const average = (villages, key) =>
  Math.round(villages.reduce((sum, village) => sum + (village[key] || 0), 0) / Math.max(villages.length, 1));

const config = {
  chips: ["Clinics", "Telemedicine", "Outreach"],
  sectionEyebrow: "Health Systems",
  sectionTitle: "Health service visibility with citizen-focused indicators",
  sectionDescription:
    "Health access, wellness support, and village care infrastructure are organised into a polished, readable governance view.",
  metricChip: "Health service readiness",
  tableTitle: "Village health services table",
  getStats: (villages) => [
    {
      icon: "🏥",
      title: "Health access",
      value: average(villages, "healthAccessScore"),
      tone: "maroon",
      description: "Overall service reach across village profiles.",
      formatter: (value) => `${value}%`
    },
    {
      icon: "🚑",
      title: "Infrastructure support",
      value: average(villages, "infrastructureScore"),
      tone: "earth",
      description: "Mobility and facilities strengthen access to care.",
      formatter: (value) => `${value}%`
    },
    {
      icon: "💡",
      title: "Energy readiness",
      value: average(villages, "renewableIndex"),
      tone: "orange",
      description: "Reliable energy improves clinic and diagnostic uptime.",
      formatter: (value) => `${value}%`
    },
    {
      icon: "📚",
      title: "Education support",
      value: average(villages, "educationScore"),
      tone: "sky",
      description: "Awareness and literacy help care programmes scale better.",
      formatter: (value) => `${value}%`
    }
  ],
  getCharts: (villages) => [
    {
      title: "Health access by village",
      subtitle: "Comparative district-style view",
      type: "bar",
      data: {
        labels: villages.slice(0, 6).map((village) => village.name),
        datasets: [
          {
            label: "Health access",
            data: villages.slice(0, 6).map((village) => village.healthAccessScore),
            backgroundColor: "#7b3f52"
          }
        ]
      }
    },
    {
      title: "Care support balance",
      subtitle: "Health and education together",
      type: "line",
      data: {
        labels: villages.slice(0, 6).map((village) => village.name),
        datasets: [
          {
            label: "Health access",
            data: villages.slice(0, 6).map((village) => village.healthAccessScore),
            borderColor: "#7b3f52",
            tension: 0.35
          },
          {
            label: "Education score",
            data: villages.slice(0, 6).map((village) => village.educationScore),
            borderColor: "#74c0fc",
            tension: 0.35
          }
        ]
      }
    }
  ],
  getInsights: () => [
    "Telemedicine becomes more effective when supported by stable power and stronger literacy levels.",
    "Health service storytelling works best when access metrics and facility descriptions are both visible.",
    "This module helps the platform feel aligned with public service delivery and citizen wellbeing."
  ],
  getRows: (villages) =>
    villages.map((village) => ({
      ...village,
      facilities: village.healthFacilities.join(", ")
    })),
  columns: [
    { key: "name", label: "Village" },
    { key: "state", label: "State" },
    { key: "facilities", label: "Health Facilities" },
    { key: "healthAccessScore", label: "Access", render: (record) => `${record.healthAccessScore}%` },
    { key: "roadCondition", label: "Mobility" }
  ]
};

export default createSectorPage(config);

