import React from "react";
import { h } from "../utils/h";
import { useData } from "../context/DataContext";
import { formatNumber } from "../utils/formatters";
import PageBanner from "../components/layout/PageBanner";
import StatCard from "../components/ui/StatCard";
import ChartCard from "../components/ui/ChartCard";
import DataTable from "../components/ui/DataTable";

const ReportsPage = () => {
  const { overview, villages } = useData();

  return h("div", null, [
    h(PageBanner, {
      key: "banner",
      chips: ["Executive reports", "Tables", "Presentation-ready metrics"]
    }),
    h("section", { key: "body", className: "reports-page-section" }, [
      h("div", { key: "container", className: "container" }, [
        h("div", { key: "stats", className: "stats-grid compact-grid" }, [
          h(StatCard, {
            key: "villages",
            icon: "📄",
            title: "Reportable villages",
            value: overview.totalVillages,
            description: "All village profiles are ready for reporting.",
            formatter: formatNumber,
            tone: "maroon"
          }),
          h(StatCard, {
            key: "population",
            icon: "👥",
            title: "Population in view",
            value: overview.totalPopulation,
            description: "A large number helps the reports feel substantial and real.",
            formatter: formatNumber,
            tone: "sky"
          }),
          h(StatCard, {
            key: "growth",
            icon: "📈",
            title: "Executive growth average",
            value: overview.averageGrowth,
            description: "Useful for presentation summaries and dashboards.",
            formatter: (value) => `${value}%`,
            tone: "green"
          })
        ]),
        h("div", { key: "chart", className: "chart-grid single-wide" }, [
          h(ChartCard, {
            key: "reportChart",
            title: "State comparison for executive briefing",
            subtitle: "Growth versus infrastructure",
            config: {
              type: "bar",
              data: {
                labels: overview.topStates.map((item) => item.label),
                datasets: [
                  {
                    label: "Growth",
                    data: overview.topStates.map((item) => item.growth),
                    backgroundColor: "#7b3f52"
                  },
                  {
                    label: "Infrastructure",
                    data: overview.topStates.map((item) => item.infrastructure),
                    backgroundColor: "#8a5a44"
                  }
                ]
              },
              options: { responsive: true, maintainAspectRatio: false }
            }
          })
        ]),
        h("div", { key: "summary", className: "premium-card report-summary-card" }, [
          h("h3", { key: "title" }, "Executive summary"),
          h(
            "p",
            { key: "text" },
            "The Smart Village Dashboard consolidates agriculture, water, energy, infrastructure, health, education, and enterprise indicators into a polished, report-ready national governance experience."
          )
        ]),
        h("div", { key: "table", className: "premium-card section-table-card" }, [
          h("h3", { key: "title", className: "table-title" }, "Report data table"),
          h(DataTable, {
            key: "tableComp",
            records: villages,
            columns: [
              { key: "name", label: "Village" },
              { key: "state", label: "State" },
              { key: "population", label: "Population", render: (record) => formatNumber(record.population) },
              { key: "growthIndex", label: "Growth", render: (record) => `${record.growthIndex}%` },
              { key: "literacyRate", label: "Literacy", render: (record) => `${record.literacyRate}%` }
            ]
          })
        ])
      ])
    ])
  ]);
};

export default ReportsPage;

