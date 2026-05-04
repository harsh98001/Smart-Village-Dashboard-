import React from "react";
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

  return <section className="cctv-operations-section">
  <div key="container" className="container">
    <SectionTitle key="title" eyebrow="CCTV Operations" title="Village surveillance and monitoring readiness" description="This section shows installed CCTV coverage, working units, offline counts, and currently live monitoring feeds." />
    <div key="stats" className="stats-grid compact-grid">
      <StatCard key="installed" icon="📹" title="Total CCTV Installed" value={summary.installed} description="All mapped cameras across the prepared village network." formatter={(value) => value} tone="sky" />
      <StatCard key="working" icon="✅" title="Working Cameras" value={summary.working} description="Units currently reported operational." formatter={(value) => value} tone="green" />
      <StatCard key="offline" icon="⚠️" title="Not Working" value={summary.offline} description="Units needing maintenance or reconnection." formatter={(value) => value} tone="orange" />
      <StatCard key="live" icon="📡" title="Live Running" value={summary.live} description="Active feeds visible from the monitoring layer." formatter={(value) => value} tone="maroon" />
    </div>
    <div key="table" className="premium-card section-table-card">
      <h3 key="heading" className="table-title">Village CCTV monitoring table</h3>
      <DataTable key="tableComp" records={rows} columns={[
                  { key: "name", label: "Village" },
                  { key: "state", label: "State" },
                  { key: "installed", label: "Installed" },
                  { key: "working", label: "Working" },
                  { key: "offline", label: "Not Working" },
                  { key: "live", label: "Live Running" }
                ]} />
    </div>
  </div>
</section>;
};

export default CctvOperationsSection;

