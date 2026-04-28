import React from "react";
import { h } from "../utils/h";
import { useData } from "../context/DataContext";
import { formatNumber } from "../utils/formatters";
import PageBanner from "../components/layout/PageBanner";
import StatCard from "../components/ui/StatCard";
import ChartCard from "../components/ui/ChartCard";
import DataTable from "../components/ui/DataTable";
import InsightMarquee from "../components/ui/InsightMarquee";

const dashboardMarqueeItems = [
  "Village command center",
  "Smart water grids",
  "Solar street resilience",
  "Panchayat service pulse",
  "Women SHG enterprise hubs",
  "AI crop advisories",
  "Digital health outreach",
  "Rural tourism circuits",
  "Safe roads and CCTV coverage",
  "Citizen-first governance"
];

const HomeDashboardPage = () => {
  const { overview, trends, villages, notifications } = useData();

  return h("div", null, [
    h(PageBanner, {
      key: "banner",
      chips: ["National command center", "Live metrics", "Role-based visibility"]
    }),
    h(InsightMarquee, {
      key: "marquee",
      eyebrow: "Dashboard Priorities",
      items: dashboardMarqueeItems,
      speed: "slow"
    }),
    h("section", { key: "body", className: "dashboard-page-section" }, [
      h("div", { key: "container", className: "container" }, [
        h("div", { key: "stats", className: "stats-grid" }, [
          h(StatCard, {
            key: "villages",
            icon: "🏘️",
            title: "Total Villages",
            value: overview.totalVillages,
            description: "Village profiles available for monitoring.",
            formatter: formatNumber,
            tone: "sky"
          }),
          h(StatCard, {
            key: "population",
            icon: "👥",
            title: "Population Reach",
            value: overview.totalPopulation,
            description: "Population represented in the current dataset.",
            formatter: formatNumber,
            tone: "maroon"
          }),
          h(StatCard, {
            key: "growth",
            icon: "📈",
            title: "Average Growth",
            value: overview.averageGrowth,
            description: "Composite growth momentum score.",
            formatter: (value) => `${value}%`,
            tone: "orange"
          }),
          h(StatCard, {
            key: "renewable",
            icon: "🔋",
            title: "Renewable Leaders",
            value: overview.renewableLeaderCount,
            description: "Villages already crossing higher energy-readiness marks.",
            formatter: formatNumber,
            tone: "green"
          })
        ]),
        h("div", { key: "charts", className: "chart-grid" }, [
          h(ChartCard, {
            key: "stateGrowth",
            title: "Top state growth comparison",
            subtitle: "Average growth and infrastructure by state",
            config: {
              type: "bar",
              data: {
                labels: overview.topStates?.map((item) => item.label) || [],
                datasets: [
                  {
                    label: "Growth",
                    data: overview.topStates?.map((item) => item.growth) || [],
                    backgroundColor: "#7b3f52"
                  },
                  {
                    label: "Infrastructure",
                    data: overview.topStates?.map((item) => item.infrastructure) || [],
                    backgroundColor: "#74c0fc"
                  }
                ]
              },
              options: {
                responsive: true,
                maintainAspectRatio: false
              }
            }
          }),
          h(ChartCard, {
            key: "trends",
            title: "Quarterly service trend",
            subtitle: "Cross-sector movement",
            config: {
              type: "line",
              data: {
                labels: trends.timeline.map((item) => item.quarter),
                datasets: [
                  {
                    label: "Agriculture",
                    data: trends.timeline.map((item) => item.agriculture),
                    borderColor: "#4f9d69",
                    tension: 0.35
                  },
                  {
                    label: "Water",
                    data: trends.timeline.map((item) => item.water),
                    borderColor: "#74c0fc",
                    tension: 0.35
                  },
                  {
                    label: "Electricity",
                    data: trends.timeline.map((item) => item.electricity),
                    borderColor: "#f1a54b",
                    tension: 0.35
                  }
                ]
              },
              options: {
                responsive: true,
                maintainAspectRatio: false
              }
            }
          })
        ]),
        h("div", { key: "split", className: "dashboard-split-grid" }, [
          h("div", { key: "table", className: "premium-card section-table-card" }, [
            h("h3", { key: "title", className: "table-title" }, "Village leaderboard"),
            h(DataTable, {
              key: "tableComp",
              records: villages.slice(0, 12),
              columns: [
                { key: "name", label: "Village" },
                { key: "state", label: "State" },
                { key: "growthIndex", label: "Growth", render: (record) => `${record.growthIndex}%` },
                { key: "waterLevel", label: "Water", render: (record) => `${record.waterLevel}%` }
              ]
            })
          ]),
          h("div", { key: "notices", className: "premium-card dashboard-notices" }, [
            h("h3", { key: "title" }, "Latest updates"),
            h(
              "div",
              { key: "list", className: "notice-list" },
              notifications.slice(0, 4).map((notification) =>
                h("article", { key: notification._id, className: "notice-item" }, [
                  h("strong", { key: "title" }, notification.title),
                  h("p", { key: "text" }, notification.message)
                ])
              )
            )
          ])
        ])
      ])
    ])
  ]);
};

export default HomeDashboardPage;
