import React from "react";
import { useData } from "../context/DataContext";
import PageBanner from "../components/layout/PageBanner";
import StatCard from "../components/ui/StatCard";
import ChartCard from "../components/ui/ChartCard";
import AirQualitySection from "../components/sections/AirQualitySection";
import InsightMarquee from "../components/ui/InsightMarquee";
import { formatNumber } from "../utils/formatters";
import {
  growthHeroSignals,
  growthMissionCards,
  growthProgramRows,
  growthBusinessModels
} from "../data/intelligenceDecks";

const growthMarqueeItems = [
  "Metro-linked mobility corridors",
  "Regional airport cargo readiness",
  "Dam modernization command",
  "Solar and irrigation mission",
  "E-education district rollout",
  "Land bank activation",
  "Startup and dairy clusters",
  "Blinkit and ecommerce expansion",
  "Business model diversification",
  "Disaster management grid"
];

const firstNumberFromText = (value, fallback = 0) => {
  const match = String(value || "").match(/(\d+(?:,\d+)*(?:\.\d+)?)/);

  return match ? Number(match[1].replace(/,/g, "")) : fallback;
};

const parseIndianMagnitude = (value, fallback = 0) => {
  const text = String(value || "").toLowerCase();
  const base = firstNumberFromText(text, fallback);

  if (text.includes("crore")) {
    return base * 10000000;
  }

  if (text.includes("lakh")) {
    return base * 100000;
  }

  return base;
};

const buildRelativeScores = (values) => {
  const maxValue = Math.max(...values, 1);

  return values.map((value) =>
    Math.max(18, Math.round((Math.log(value + 1) / Math.log(maxValue + 1)) * 100))
  );
};

const buildLightChartOptions = (overrides = {}) => ({
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      labels: {
        color: "#17324d",
        font: {
          family: "Manrope",
          weight: "700"
        }
      }
    },
    ...overrides.plugins
  },
  scales: {
    x: {
      ticks: {
        color: "#5d6f85",
        font: {
          family: "Manrope",
          weight: "700"
        }
      },
      grid: {
        display: false
      },
      ...((overrides.scales && overrides.scales.x) || {})
    },
    y: {
      beginAtZero: true,
      ticks: {
        color: "#5d6f85",
        font: {
          family: "Manrope",
          weight: "700"
        }
      },
      grid: {
        color: "rgba(24, 50, 79, 0.08)"
      },
      ...((overrides.scales && overrides.scales.y) || {})
    }
  },
  ...overrides
});

const renderGrowthSignal = (signal) =>
  <div key={signal.label} className="command-signal-card growth-signal-card">
  <span key="label" className="command-signal-label">
    {signal.label}
  </span>
  <strong key="value" className="command-signal-value">
    {signal.value}
  </strong>
  <p key="note" className="command-signal-note">
    {signal.note}
  </p>
</div>;

const renderVisualTile = (tile) =>
  <div key={tile.label} className="visual-metric-tile">
  <span key="label" className="visual-metric-label">
    {tile.label}
  </span>
  <strong key="value" className="visual-metric-value">
    {tile.value}
  </strong>
  <span key="note" className="visual-metric-note">
    {tile.note}
  </span>
</div>;

const GrowthPage = () => {
  const { villages, trends } = useData();

  const topGrowthVillages = villages
    .slice()
    .sort((firstVillage, secondVillage) => secondVillage.growthIndex - firstVillage.growthIndex)
    .slice(0, 6);

  const missionMetricValues = growthMissionCards.map((mission) =>
    parseIndianMagnitude(mission.metric, 1)
  );
  const missionScores = buildRelativeScores(missionMetricValues);
  const programTargetValues = growthProgramRows.map((row) => parseIndianMagnitude(row.target, 1));
  const programTargetScores = buildRelativeScores(programTargetValues);
  const missionLabels = growthMissionCards.map((mission) =>
    mission.title
      .replace(" and ", " & ")
      .replace(" modernization", "")
      .replace(" expansion", "")
      .replace(" rollout", "")
  );

  const growthSummaryCards = [
    {
      key: "land",
      icon: "LAND",
      title: "Serviced land bank",
      value: 1460,
      description: "Land parcels identified for logistics, enterprise, tourism, and civic growth corridors.",
      formatter: (value) => `${formatNumber(value)} acres`,
      tone: "earth"
    },
    {
      key: "startup",
      icon: "LAB",
      title: "Startup pipeline",
      value: 128,
      description: "Agri-tech, dairy-tech, fintech, logistics, and climate ventures in the growth funnel.",
      formatter: formatNumber,
      tone: "orange"
    },
    {
      key: "dams",
      icon: "DAM",
      title: "Dam and reservoir works",
      value: 45,
      description: "Three dams and forty-two check dams planned or upgraded for water security.",
      formatter: formatNumber,
      tone: "sky"
    },
    {
      key: "mobility",
      icon: "GRID",
      title: "Mobility corridor scope",
      value: 68,
      description: "Metro-lite, feeder buses, and logistics spines planned across high-growth routes.",
      formatter: (value) => `${formatNumber(value)} km`,
      tone: "green"
    }
  ];

  const missionTiles = [
    {
      label: "Top scale mission",
      value: growthMissionCards[missionScores.indexOf(Math.max(...missionScores))].title,
      note: "Highest normalized mission footprint"
    },
    {
      label: "Mobility scope",
      value: "68 km planned",
      note: "Metro-lite and feeder integration"
    },
    {
      label: "Water security",
      value: "3 dams modernized",
      note: "Dam and reservoir mission line"
    }
  ];

  const programTiles = [
    {
      label: "Fastest programme",
      value: "Flood and disaster layer",
      note: "10-month readiness timeline"
    },
    {
      label: "Largest target",
      value: "420 MSME jobs",
      note: "Agro-processing and cold-chain track"
    },
    {
      label: "Skill activation",
      value: "5 applied centers",
      note: "PMKVY-linked employment spine"
    }
  ];

  const businessTiles = [
    {
      label: "Primary model",
      value: "Agri-processing cluster",
      note: "Processing, grading, cold-storage, and demand aggregation"
    },
    {
      label: "Digital model",
      value: "Rural services marketplace",
      note: "ONDC, delivery partners, repairs, and village commerce"
    },
    {
      label: "Place brand",
      value: "Tourism economy",
      note: "Heritage stays, food circuits, and destination-linked products"
    }
  ];

  const timelineChartConfig = {
    type: "line",
    data: {
      labels: trends.timeline.map((item) => item.quarter),
      datasets: [
        {
          label: "Agriculture",
          data: trends.timeline.map((item) => item.agriculture),
          borderColor: "#4f9d69",
          backgroundColor: "rgba(79, 157, 105, 0.12)",
          tension: 0.34,
          fill: true
        },
        {
          label: "Electricity",
          data: trends.timeline.map((item) => item.electricity),
          borderColor: "#f1a54b",
          tension: 0.34
        },
        {
          label: "Literacy",
          data: trends.timeline.map((item) => item.literacy),
          borderColor: "#4399df",
          tension: 0.34
        }
      ]
    },
    options: buildLightChartOptions()
  };

  const growthLeaderConfig = {
    type: "bar",
    data: {
      labels: topGrowthVillages.map((village) => village.name),
      datasets: [
        {
          label: "Growth index",
          data: topGrowthVillages.map((village) => village.growthIndex),
          backgroundColor: "rgba(123, 63, 82, 0.82)",
          borderRadius: 14
        },
        {
          label: "Infrastructure",
          data: topGrowthVillages.map((village) => village.infrastructureScore),
          backgroundColor: "rgba(67, 153, 223, 0.72)",
          borderRadius: 14
        }
      ]
    },
    options: buildLightChartOptions()
  };

  const programTimelineConfig = {
    type: "bar",
    data: {
      labels: growthProgramRows.map((row) => row.initiative),
      datasets: [
        {
          label: "Timeline (months)",
          data: growthProgramRows.map((row) => firstNumberFromText(row.timeline, 0)),
          backgroundColor: ["#4f9d69", "#74c0fc", "#f1a54b", "#7b3f52", "#8a5a44", "#4399df"],
          borderRadius: 16
        }
      ]
    },
    options: buildLightChartOptions()
  };

  const renewableReadinessConfig = {
    type: "line",
    data: {
      labels: topGrowthVillages.map((village) => village.name),
      datasets: [
        {
          label: "Renewable index",
          data: topGrowthVillages.map((village) => village.renewableIndex),
          borderColor: "#4f9d69",
          backgroundColor: "rgba(79, 157, 105, 0.12)",
          tension: 0.32,
          fill: true
        },
        {
          label: "E-education readiness",
          data: topGrowthVillages.map((village) => village.educationScore),
          borderColor: "#17324d",
          tension: 0.32
        }
      ]
    },
    options: buildLightChartOptions()
  };

  const missionScaleConfig = {
    type: "bar",
    data: {
      labels: missionLabels,
      datasets: [
        {
          label: "Mission scale score",
          data: missionScores,
          backgroundColor: ["#60b37b", "#6ab1ea", "#f3af4f", "#8f67f1", "#ff9dbc", "#64d4c0", "#7b3f52", "#98c6ff", "#8a5a44"],
          borderRadius: 14
        }
      ]
    },
    options: buildLightChartOptions()
  };

  const missionRadarConfig = {
    type: "radar",
    data: {
      labels: ["Mobility", "Water", "Energy", "Skills", "Land", "Enterprise"],
      datasets: [
        {
          label: "District growth mission",
          data: [82, 75, 79, 68, 95, 84],
          borderColor: "#4399df",
          backgroundColor: "rgba(67, 153, 223, 0.18)",
          pointBackgroundColor: "#7b3f52"
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false
        }
      },
      scales: {
        r: {
          angleLines: {
            color: "rgba(24, 50, 79, 0.1)"
          },
          grid: {
            color: "rgba(24, 50, 79, 0.08)"
          },
          pointLabels: {
            color: "#17324d",
            font: {
              family: "Manrope",
              weight: "700"
            }
          },
          ticks: {
            display: false
          }
        }
      }
    }
  };

  const missionBlendConfig = {
    type: "doughnut",
    data: {
      labels: ["Mobility", "Water", "Energy", "Land", "Enterprise", "Commerce"],
      datasets: [
        {
          data: [26, 16, 18, 19, 13, 8],
          backgroundColor: ["#6ab1ea", "#60b37b", "#f3af4f", "#8f67f1", "#7b3f52", "#64d4c0"],
          borderWidth: 0
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: "bottom",
          labels: {
            color: "#17324d",
            font: {
              family: "Manrope",
              weight: "700"
            }
          }
        }
      }
    }
  };

  const missionFlowConfig = {
    type: "line",
    data: {
      labels: ["Mobility", "Airport", "Dams", "Solar", "Education", "Land", "Startups", "Commerce", "Business"],
      datasets: [
        {
          label: "Mission momentum",
          data: missionScores,
          borderColor: "#ff9dbc",
          backgroundColor: "rgba(255, 157, 188, 0.14)",
          pointBackgroundColor: "#ff9dbc",
          pointRadius: 4,
          tension: 0.35,
          fill: true
        }
      ]
    },
    options: buildLightChartOptions()
  };

  const programTargetConfig = {
    type: "bar",
    data: {
      labels: growthProgramRows.map((row) => row.initiative),
      datasets: [
        {
          label: "Target scale score",
          data: programTargetScores,
          backgroundColor: "rgba(106, 177, 234, 0.8)",
          borderRadius: 14
        }
      ]
    },
    options: buildLightChartOptions({
      indexAxis: "y"
    })
  };

  const businessModelMixConfig = {
    type: "doughnut",
    data: {
      labels: ["Agri-processing", "Digital services", "Energy utility", "Tourism economy"],
      datasets: [
        {
          data: [34, 22, 24, 20],
          backgroundColor: ["#8f67f1", "#6ab1ea", "#60b37b", "#ff9dbc"],
          borderWidth: 0
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: "bottom",
          labels: {
            color: "#17324d",
            font: {
              family: "Manrope",
              weight: "700"
            }
          }
        }
      }
    }
  };

  const businessMomentumConfig = {
    type: "bar",
    data: {
      labels: ["Agri", "Marketplace", "Utility", "Tourism"],
      datasets: [
        {
          label: "Readiness score",
          data: [86, 72, 79, 68],
          backgroundColor: ["rgba(96, 179, 123, 0.82)", "rgba(106, 177, 234, 0.8)", "rgba(143, 103, 241, 0.78)", "rgba(255, 157, 188, 0.8)"],
          borderRadius: 14
        }
      ]
    },
    options: buildLightChartOptions()
  };

  return <div>
  <PageBanner key="banner" chips={[
          "Metro and airports",
          "Startups and business models",
          "Land and dams",
          "Solar and e-education",
          "Commerce and services",
          "Live AQI"
        ]} />
  <InsightMarquee key="marquee" eyebrow="Growth Priorities" items={growthMarqueeItems} speed="slow" reverse />
  <section key="body" className="growth-page-section">
    <div key="container" className="container">
      <div key="hero" className="intelligence-command-board growth-command-board">
        <div key="copy" className="command-copy growth-command-copy">
          <span key="eyebrow" className="section-eyebrow">Regional growth mission</span>
          <h2 key="title" className="command-title growth-command-title">Growth now reads like a future district mission board with metro, airport, dam, solar, startups, land, commerce, and disaster-management tracks</h2>
          <p key="description" className="command-description growth-command-description">This page now carries the future-facing side of the platform. It brings together transport, air-cargo, dam modernization, solar expansion, e-education, serviced land, startup zones, dairy networks, ecommerce delivery, and business models so the growth narrative feels large-scale and credible.</p>
          <div key="chips" className="command-chip-row growth-chip-row">
            {[
                            "Metro-lite mobility",
                            "Airport cargo",
                            "Dams and water security",
                            "Solar transition",
                            "Land bank",
                            "Startups and commerce"
                          ].map((chip) =>
                            <span key={chip} className="command-chip growth-command-chip">
              {chip}
            </span>
                          )}
          </div>
          <div key="signals" className="command-signal-grid growth-signal-grid">
            {growthHeroSignals.map(renderGrowthSignal)}
          </div>
        </div>
        <div key="visual" className="command-visual-shell growth-visual-shell">
          <div key="frame" className="command-visual-frame growth-visual-frame">
            <img key="image" src="/images/growth-reference.jpg" alt="Growth mission reference board" className="command-reference-image" />
            <div key="panel1" className="command-overlay-card overlay-top growth-overlay-card">
              <span key="label" className="command-overlay-label">Growth cluster scope</span>
              <strong key="value" className="command-overlay-value">Metro + airport + logistics</strong>
              <p key="text" className="command-overlay-note">Mobility, cargo, and service access stitched into one expansion frame</p>
            </div>
            <div key="panel2" className="command-overlay-card overlay-bottom-left growth-overlay-card">
              <span key="label" className="command-overlay-label">Enterprise land bank</span>
              <strong key="value" className="command-overlay-value">1,460 acres tagged</strong>
              <p key="text" className="command-overlay-note">Sites aligned for agro-processing, startups, tourism, and logistics</p>
            </div>
            <div key="panel3" className="command-overlay-card overlay-bottom-right growth-overlay-card">
              <span key="label" className="command-overlay-label">Disaster management</span>
              <strong key="value" className="command-overlay-value">42 sensor points</strong>
              <p key="text" className="command-overlay-note">Warning, relief, shelter, and flood routing now sit inside the growth layer</p>
            </div>
          </div>
        </div>
      </div>
      <div key="stats" className="stats-grid compact-grid intelligence-kpi-strip">
        {growthSummaryCards.map((card) =>
                    <StatCard key={card.key} icon={card.icon} title={card.title} value={card.value} description={card.description} formatter={card.formatter} tone={card.tone} />
                  )}
      </div>
      <div key="charts" className="intelligence-chart-grid">
        <ChartCard key="timeline" title="Quarter-on-quarter development pattern" subtitle="Agriculture, electricity, and literacy remain visible in the future story" config={timelineChartConfig} />
        <ChartCard key="leaders" title="Top growth villages" subtitle="Growth index and infrastructure support by leading villages" config={growthLeaderConfig} />
        <ChartCard key="timelines" title="Program delivery timelines" subtitle="Enterprise, logistics, skills, dairy, tourism, and disaster missions" config={programTimelineConfig} />
        <ChartCard key="renewable" title="Renewable and e-education readiness" subtitle="Tracks whether future missions are backed by clean energy and classroom capacity" config={renewableReadinessConfig} />
      </div>
      <section key="missionBoard" className="growth-track-shell visual-graph-board">
        <div key="head" className="intelligence-section-head">
          <span key="eyebrow" className="section-eyebrow">Upcoming growth programmes</span>
          <h3 key="title" className="table-title">Metro, airports, dams, land, startups, solar, ecommerce, and business-model tracks</h3>
          <p key="desc" className="command-muted">This block now behaves like a graph dashboard instead of a stack of descriptive cards.</p>
        </div>
        <div key="tiles" className="visual-metric-row">
          {missionTiles.map(renderVisualTile)}
        </div>
        <div key="graphs" className="mini-graph-grid service-graph-grid">
          <ChartCard key="missionScale" title="Mission scale" subtitle="Relative size of the future expansion tracks" config={missionScaleConfig} className="compact-graph-card" canvasHeight={180} />
          <ChartCard key="missionRadar" title="Mission readiness map" subtitle="Mobility, water, energy, skills, land, and enterprise radar" config={missionRadarConfig} className="compact-graph-card" canvasHeight={180} />
          <ChartCard key="missionBlend" title="Growth mix" subtitle="How the district mission is distributed across major tracks" config={missionBlendConfig} className="compact-graph-card" canvasHeight={180} />
          <ChartCard key="missionFlow" title="Mission momentum" subtitle="A compact view of expansion intensity across all future tracks" config={missionFlowConfig} className="compact-graph-card" canvasHeight={180} />
        </div>
      </section>
      <div key="executionBoards" className="intelligence-double-grid visual-board-double-grid">
        <section key="programBoard" className="visual-graph-board">
          <div key="head" className="intelligence-section-head">
            <span key="eyebrow" className="section-eyebrow">Delivery programme sheet</span>
            <h3 key="title" className="table-title">Programme pipeline with targets and district impact</h3>
            <p key="desc" className="command-muted">The delivery block is now compressed into metrics and charts instead of a full text table.</p>
          </div>
          <div key="tiles" className="visual-metric-row">
            {programTiles.map(renderVisualTile)}
          </div>
          <div key="graphs" className="mini-graph-grid two-up">
            <ChartCard key="programTimeline" title="Timeline stack" subtitle="Months needed across the main programmes" config={programTimelineConfig} className="compact-graph-card" canvasHeight={170} />
            <ChartCard key="programTargets" title="Target scale" subtitle="Relative size of the programme targets" config={programTargetConfig} className="compact-graph-card" canvasHeight={170} />
          </div>
        </section>
        <section key="businessBoard" className="visual-graph-board">
          <div key="head" className="intelligence-section-head">
            <span key="eyebrow" className="section-eyebrow">Business architecture</span>
            <h3 key="title" className="table-title">Business models that support long-term district growth</h3>
            <p key="desc" className="command-muted">The business side is now graph-led too, so it looks like a real planning interface instead of a document block.</p>
          </div>
          <div key="tiles" className="visual-metric-row">
            {businessTiles.map(renderVisualTile)}
          </div>
          <div key="graphs" className="mini-graph-grid two-up">
            <ChartCard key="businessMix" title="Business model mix" subtitle="The four long-term revenue structures in one ring" config={businessModelMixConfig} className="compact-graph-card" canvasHeight={170} />
            <ChartCard key="businessMomentum" title="Readiness by model" subtitle="Agri, marketplace, utility, and tourism priority scores" config={businessMomentumConfig} className="compact-graph-card" canvasHeight={170} />
          </div>
        </section>
      </div>
      <AirQualitySection key="aqi" compact eyebrow="Growth AQI" title="AQI remains visible so growth, transport, dams, and enterprise plans stay linked to environmental quality" description="A real growth page should still show environmental conditions, so the expansion narrative remains grounded rather than only aspirational." />
    </div>
  </section>
</div>;
};

export default GrowthPage;
