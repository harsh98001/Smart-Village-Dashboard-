import React from "react";
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

    return <div>
  <PageBanner key="banner" chips={config.chips || []} />
  <section key="body" className="generic-sector-section">
    <div key="container" className="container">
      <SectionTitle key="title" eyebrow={config.sectionEyebrow} title={config.sectionTitle} description={config.sectionDescription} />
      <div key="stats" className="stats-grid">
        {stats.map((stat) =>
                      <StatCard key={stat.title} icon={stat.icon} title={stat.title} value={stat.value} tone={stat.tone} description={stat.description} formatter={stat.formatter} />
                    )}
      </div>
      <div key="charts" className="chart-grid">
        {charts.map((chart) =>
                      <ChartCard key={chart.title} title={chart.title} subtitle={chart.subtitle} config={{
                          type: chart.type,
                          data: chart.data,
                          options: chart.options || sharedChartOptions
                        }} />
                    )}
      </div>
      <div key="insights" className="insight-grid">
        <div key="left" className="premium-card insight-card sector-insight-card strategic-insight-card">
          <div key="header" className="insight-card-header">
            <span key="badge" className="insight-card-badge">Strategic insights</span>
            <h3 key="title" className="insight-card-title">Service strategy notes</h3>
          </div>
          <ul key="list" className="sector-insight-list">
            {config.getInsights(villages).map((item) =>
                              <li key={item} className="sector-insight-item">
              {item}
            </li>
                            )}
          </ul>
        </div>
        <div key="right" className="premium-card insight-card sector-insight-card operational-insight-card">
          <div key="header" className="insight-card-header">
            <span key="badge" className="insight-card-badge operational">Operational snapshot</span>
            <h3 key="title" className="insight-card-title">Readiness overview</h3>
          </div>
          <div key="metrics" className="sector-operational-metrics">
            <div key="villages" className="sector-metric-chip">
              <strong key="value">
                {formatNumber(villages.length)}
              </strong>
              <span key="label">Villages tracked</span>
            </div>
            <div key="growth" className="sector-metric-chip">
              <strong key="value">
                {formatPercent(stats[0]?.value || 0)}
              </strong>
              <span key="label">Headline indicator</span>
            </div>
            <div key="coverage" className="sector-metric-chip emphasis">
              <strong key="value">
                {config.metricChip}
              </strong>
              <span key="label">Coverage focus</span>
            </div>
          </div>
        </div>
      </div>
      <div key="tableCard" className="premium-card section-table-card">
        <h3 key="tableTitle" className="table-title">
          {config.tableTitle}
        </h3>
        <DataTable key="table" columns={config.columns} records={rows} />
      </div>
    </div>
  </section>
</div>;
  };

  return SectorPage;
};

export default createSectorPage;
