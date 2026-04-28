import React from "react";
import { h } from "../../utils/h";
import SectionTitle from "../ui/SectionTitle";
import StatCard from "../ui/StatCard";
import DataTable from "../ui/DataTable";
import { getCctvSummary, getVillageCctvMetrics } from "../../utils/villageMetrics";

const CctvOperationsSection = ({ villages }) => {
  const summary = getCctvSummary(villages);
  const rows = villages.slice(0, 10).map((village, index) => ({
    ...village,
    ...getVillageCctvMetrics(village, index)
  }));

  return h("section", { className: "cctv-operations-section" }, [
    h("div", { key: "container", className: "container" }, [
      h(SectionTitle, {
        key: "title",
        eyebrow: "CCTV Operations",
        title: "Village surveillance and monitoring readiness",
        description:
          "This section shows installed CCTV coverage, working units, offline counts, and currently live monitoring feeds."
      }),
      h("div", { key: "stats", className: "stats-grid compact-grid" }, [
        h(StatCard, {
          key: "installed",
          icon: "📹",
          title: "Total CCTV Installed",
          value: summary.installed,
          description: "All mapped cameras across the prepared village network.",
          formatter: (value) => value,
          tone: "sky"
        }),
        h(StatCard, {
          key: "working",
          icon: "✅",
          title: "Working Cameras",
          value: summary.working,
          description: "Units currently reported operational.",
          formatter: (value) => value,
          tone: "green"
        }),
        h(StatCard, {
          key: "offline",
          icon: "⚠️",
          title: "Not Working",
          value: summary.offline,
          description: "Units needing maintenance or reconnection.",
          formatter: (value) => value,
          tone: "orange"
        }),
        h(StatCard, {
          key: "live",
          icon: "📡",
          title: "Live Running",
          value: summary.live,
          description: "Active feeds visible from the monitoring layer.",
          formatter: (value) => value,
          tone: "maroon"
        })
      ]),
      h("div", { key: "table", className: "premium-card section-table-card" }, [
        h("h3", { key: "heading", className: "table-title" }, "Village CCTV monitoring table"),
        h(DataTable, {
          key: "tableComp",
          records: rows,
          columns: [
            { key: "name", label: "Village" },
            { key: "state", label: "State" },
            { key: "installed", label: "Installed" },
            { key: "working", label: "Working" },
            { key: "offline", label: "Not Working" },
            { key: "live", label: "Live Running" }
          ]
        })
      ])
    ])
  ]);
};

export default CctvOperationsSection;

