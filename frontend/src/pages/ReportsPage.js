import React from "react";
import { useData } from "../context/DataContext";
import { formatNumber } from "../utils/formatters";
import PageBanner from "../components/layout/PageBanner";
import StatCard from "../components/ui/StatCard";
import ChartCard from "../components/ui/ChartCard";
import DataTable from "../components/ui/DataTable";

const ReportsPage = () => {
  const { overview, villages } = useData();

  return <div>
  <PageBanner key="banner" chips={["Executive reports", "Tables", "Presentation-ready metrics"]} />
  <section key="body" className="reports-page-section">
    <div key="container" className="container">
      <div key="stats" className="stats-grid compact-grid">
        <StatCard key="villages" icon="📄" title="Reportable villages" value={overview.totalVillages} description="All village profiles are ready for reporting." formatter={formatNumber} tone="maroon" />
        <StatCard key="population" icon="👥" title="Population in view" value={overview.totalPopulation} description="A large number helps the reports feel substantial and real." formatter={formatNumber} tone="sky" />
        <StatCard key="growth" icon="📈" title="Executive growth average" value={overview.averageGrowth} description="Useful for presentation summaries and dashboards." formatter={(value) => `${value}%`} tone="green" />
      </div>
      <div key="chart" className="chart-grid single-wide">
        <ChartCard key="reportChart" title="State comparison for executive briefing" subtitle="Growth versus infrastructure" config={{
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
                    }} />
      </div>
      <div key="summary" className="premium-card report-summary-card">
        <h3 key="title">Executive summary</h3>
        <p key="text">The Smart Village Dashboard consolidates agriculture, water, energy, infrastructure, health, education, and enterprise indicators into a polished, report-ready national governance experience.</p>
      </div>
      <div key="table" className="premium-card section-table-card">
        <h3 key="title" className="table-title">Report data table</h3>
        <DataTable key="tableComp" records={villages} columns={[
                      { key: "name", label: "Village" },
                      { key: "state", label: "State" },
                      { key: "population", label: "Population", render: (record) => formatNumber(record.population) },
                      { key: "growthIndex", label: "Growth", render: (record) => `${record.growthIndex}%` },
                      { key: "literacyRate", label: "Literacy", render: (record) => `${record.literacyRate}%` }
                    ]} />
      </div>
    </div>
  </section>
</div>;
};

export default ReportsPage;

