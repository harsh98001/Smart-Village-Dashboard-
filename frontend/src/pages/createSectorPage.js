import React from "react";
import { h } from "../utils/h";
import { useData } from "../context/DataContext";
import { formatNumber, formatPercent } from "../utils/formatters";
import PageBanner from "../components/layout/PageBanner";
import SectionTitle from "../components/ui/SectionTitle";
import StatCard from "../components/ui/StatCard";
import ChartCard from "../components/ui/ChartCard";
import DataTable from "../components/ui/DataTable";

const sharedChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      labels: {
        color: "#18324f"
      }
    }
  },
  scales: {
    x: {
      ticks: { color: "#18324f" },
      grid: { color: "rgba(24, 50, 79, 0.08)" }
    },
    y: {
      ticks: { color: "#18324f" },
      grid: { color: "rgba(24, 50, 79, 0.08)" }
    }
  }
};

const createSectorPage = (config) => {
  const SectorPage = () => {
    const { villages } = useData();
    const stats = config.getStats(villages);
    const charts = config.getCharts(villages);
    const rows = config.getRows(villages);

    return h("div", null, [
      h(PageBanner, { key: "banner", chips: config.chips || [] }),
      h("section", { key: "body", className: "generic-sector-section" }, [
        h("div", { key: "container", className: "container" }, [
          h(SectionTitle, {
            key: "title",
            eyebrow: config.sectionEyebrow,
            title: config.sectionTitle,
            description: config.sectionDescription
          }),
          h(
            "div",
            {
              key: "stats",
              className: "stats-grid"
            },
            stats.map((stat) =>
              h(StatCard, {
                key: stat.title,
                icon: stat.icon,
                title: stat.title,
                value: stat.value,
                tone: stat.tone,
                description: stat.description,
                formatter: stat.formatter
              })
            )
          ),
          h(
            "div",
            {
              key: "charts",
              className: "chart-grid"
            },
            charts.map((chart) =>
              h(ChartCard, {
                key: chart.title,
                title: chart.title,
                subtitle: chart.subtitle,
                config: {
                  type: chart.type,
                  data: chart.data,
                  options: chart.options || sharedChartOptions
                }
              })
            )
          ),
          h("div", { key: "insights", className: "insight-grid" }, [
            h("div", { key: "left", className: "premium-card insight-card sector-insight-card strategic-insight-card" }, [
              h("div", { key: "header", className: "insight-card-header" }, [
                h("span", { key: "badge", className: "insight-card-badge" }, "Strategic insights"),
                h("h3", { key: "title", className: "insight-card-title" }, "Service strategy notes")
              ]),
              h(
                "ul",
                { key: "list", className: "sector-insight-list" },
                config.getInsights(villages).map((item) =>
                  h("li", { key: item, className: "sector-insight-item" }, item)
                )
              )
            ]),
            h("div", { key: "right", className: "premium-card insight-card sector-insight-card operational-insight-card" }, [
              h("div", { key: "header", className: "insight-card-header" }, [
                h("span", { key: "badge", className: "insight-card-badge operational" }, "Operational snapshot"),
                h("h3", { key: "title", className: "insight-card-title" }, "Readiness overview")
              ]),
              h(
                "div",
                { key: "metrics", className: "sector-operational-metrics" },
                [
                  h("div", { key: "villages", className: "sector-metric-chip" }, [
                    h("strong", { key: "value" }, formatNumber(villages.length)),
                    h("span", { key: "label" }, "Villages tracked")
                  ]),
                  h("div", { key: "growth", className: "sector-metric-chip" }, [
                    h("strong", { key: "value" }, formatPercent(stats[0]?.value || 0)),
                    h("span", { key: "label" }, "Headline indicator")
                  ]),
                  h("div", { key: "coverage", className: "sector-metric-chip emphasis" }, [
                    h("strong", { key: "value" }, config.metricChip),
                    h("span", { key: "label" }, "Coverage focus")
                  ])
                ]
              )
            ])
          ]),
          h("div", { key: "tableCard", className: "premium-card section-table-card" }, [
            h("h3", { key: "tableTitle", className: "table-title" }, config.tableTitle),
            h(DataTable, {
              key: "table",
              columns: config.columns,
              records: rows
            })
          ])
        ])
      ])
    ]);
  };

  return SectorPage;
};

export default createSectorPage;
