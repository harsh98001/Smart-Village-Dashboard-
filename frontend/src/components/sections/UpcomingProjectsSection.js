import React from "react";
import SectionTitle from "../ui/SectionTitle";

const projectTracks = [
  {
    key: "finance",
    tone: "maroon",
    icon: "₹",
    kicker: "Financial Expansion",
    title: "Integrated Rural Finance Grid",
    description:
      "Cooperative banking, farmer credit, DBT traceability, pension routing, and insurance claims are planned as one monitored finance layer.",
    scope: "Credit desks, subsidy routing, and citizen payment visibility",
    impact: "Faster access to formal finance and cleaner reporting for district teams",
    points: ["DBT intelligence", "SHG lending map", "Insurance claim lane"]
  },
  {
    key: "tech",
    tone: "sky",
    icon: "⌘",
    kicker: "Tech Companies",
    title: "Innovation and Tech Company Cluster",
    description:
      "The roadmap introduces agritech, climate-tech, health-tech, and rural SaaS workspaces so villages connect to jobs, pilots, and service platforms.",
    scope: "Startup bays, fibre backbone, cloud support, and skilling labs",
    impact: "Higher local employment and faster deployment of digital public services",
    points: ["Startup hub", "Fibre-ready offices", "Apprenticeship seats"]
  },
  {
    key: "mobility",
    tone: "orange",
    icon: "↔",
    kicker: "Transportation",
    title: "Metro and Smart Mobility Corridor",
    description:
      "A mobility track explores metro-lite links, e-bus interchanges, smart ticketing, and faster movement between villages, mandis, and nearby city hubs.",
    scope: "Metro-lite planning, EV feeder routes, and multimodal terminals",
    impact: "Lower travel friction for workers, students, and goods movement",
    points: ["Metro-lite route", "EV feeder mesh", "Unified smart ticketing"]
  },
  {
    key: "airports",
    tone: "earth",
    icon: "✈",
    kicker: "Airport Access",
    title: "Airport and Air-Cargo Gateway",
    description:
      "Future airport upgrades and air-cargo connections support tourism, emergency medical transfers, and premium farm produce movement at regional scale.",
    scope: "Air-cargo chain, logistics zones, and medical air access",
    impact: "Stronger export capacity and faster response for critical mobility needs",
    points: ["Perishable cargo lane", "Medical evacuation link", "Tourism gateway"]
  },
  {
    key: "ai-farming",
    tone: "green",
    icon: "AI",
    kicker: "AI Farming",
    title: "AI Integrated Farming Facilities",
    description:
      "Sensor-based soil labs, drone sheds, yield prediction engines, and automated irrigation rooms create a more precise and visible agricultural control layer.",
    scope: "Drone operations, soil scanning, crop vision, and irrigation automation",
    impact: "Higher crop efficiency with better farmer decision support",
    points: ["Drone sheds", "Yield prediction", "Auto irrigation rooms"]
  },
  {
    key: "disaster",
    tone: "slate",
    icon: "!",
    kicker: "Resilience Layer",
    title: "Disaster Management and Early Warning",
    description:
      "The resilience track adds flood, heatwave, fire, and storm command features with shelter mapping, siren control, and route-aware emergency response.",
    scope: "Early warning sensors, rescue routing, and relief stock visibility",
    impact: "Quicker district response and safer citizen communication during risk events",
    points: ["Warning sirens", "Shelter map", "Live command routing"]
  }
];

const roadmapLabels = [
  "Finance stack",
  "Mobility grid",
  "Tech cluster",
  "AI farming",
  "Resilience ops"
];

const roadmapDots = [
  { key: "d1", cx: "32", cy: "154", label: "2026" },
  { key: "d2", cx: "132", cy: "144", label: "2027" },
  { key: "d3", cx: "232", cy: "96", label: "2028" },
  { key: "d4", cx: "332", cy: "84", label: "2029" },
  { key: "d5", cx: "432", cy: "58", label: "2030+" }
];

const UpcomingProjectsSection = () =>
  <section className="upcoming-projects-section">
  <div key="container" className="container">
    <div key="shell" className="upcoming-projects-shell">
      <div key="top" className="upcoming-projects-top">
        <div key="copy" className="upcoming-projects-copy">
          <SectionTitle key="title" eyebrow="Upcoming Projects" title="A bigger district roadmap starts immediately after the first six flagship village profiles" description="This block expands the dashboard from village monitoring into finance, transport, enterprise, farming, and resilience infrastructure that can shape the next phase of the product." />
          <div key="tags" className="upcoming-project-tag-row">
            <span key="tag-1" className="upcoming-project-tag">6 expansion tracks</span>
            <span key="tag-2" className="upcoming-project-tag">2026 to 2030 pipeline</span>
            <span key="tag-3" className="upcoming-project-tag">District-ready scope</span>
          </div>
          <div key="summary" className="upcoming-project-summary-grid">
            <div key="s1" className="upcoming-project-summary-card">
              <span key="label" className="upcoming-project-summary-label">Investment Focus</span>
              <strong key="value" className="upcoming-project-summary-value">Finance, mobility, AI, resilience</strong>
            </div>
            <div key="s2" className="upcoming-project-summary-card">
              <span key="label" className="upcoming-project-summary-label">Delivery Style</span>
              <strong key="value" className="upcoming-project-summary-value">Compact phases with measurable public benefit</strong>
            </div>
            <div key="s3" className="upcoming-project-summary-card">
              <span key="label" className="upcoming-project-summary-label">Why It Matters</span>
              <strong key="value" className="upcoming-project-summary-value">Turns the product into a full growth command layer</strong>
            </div>
          </div>
        </div>
        <div key="visual" className="upcoming-project-radar">
          <div key="radar-head" className="upcoming-project-radar-head">
            <span key="eyebrow" className="upcoming-project-radar-chip">Expansion signal</span>
            <strong key="value" className="upcoming-project-radar-title">Program pipeline trajectory</strong>
          </div>
          <svg key="chart" className="upcoming-project-radar-chart" viewBox="0 0 460 190" role="img" aria-label="Upcoming projects roadmap trajectory">
            <defs key="defs">
              <linearGradient key="line-gradient" id="projectLineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop key="stop-1" offset="0%" stopColor="#f1a54b" />
                <stop key="stop-2" offset="55%" stopColor="#74c0fc" />
                <stop key="stop-3" offset="100%" stopColor="#7b3f52" />
              </linearGradient>
              <linearGradient key="fill-gradient" id="projectFillGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop key="fill-stop-1" offset="0%" stopColor="#f1a54b" stopOpacity="0.34" />
                <stop key="fill-stop-2" offset="100%" stopColor="#f1a54b" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path key="fill" className="upcoming-project-radar-fill" d="M 32 154 C 72 154, 98 150, 132 144 C 170 136, 194 118, 232 96 C 264 78, 302 80, 332 84 C 364 88, 396 74, 432 58 L 432 178 L 32 178 Z" />
            <path key="line" className="upcoming-project-radar-line" d="M 32 154 C 72 154, 98 150, 132 144 C 170 136, 194 118, 232 96 C 264 78, 302 80, 332 84 C 364 88, 396 74, 432 58" />
            {roadmapDots.map((dot) =>
                              <g key={dot.key} className="upcoming-project-radar-dot-group">
              <circle key={`${dot.key}-halo`} className="upcoming-project-radar-dot-halo" cx={dot.cx} cy={dot.cy} r="12" />
              <circle key={`${dot.key}-core`} className="upcoming-project-radar-dot-core" cx={dot.cx} cy={dot.cy} r="4.5" />
              <text key={`${dot.key}-label`} className="upcoming-project-radar-dot-label" x={dot.cx} y={String(Number(dot.cy) - 16)}>
                {dot.label}
              </text>
            </g>
                            )}
          </svg>
          <div key="timeline" className="upcoming-project-roadmap-row">
            {roadmapLabels.map((label) =>
                            <span key={label} className="upcoming-project-roadmap-pill">
              {label}
            </span>
                          )}
          </div>
        </div>
      </div>
      <div key="grid" className="upcoming-project-grid">
        {projectTracks.map((project) =>
                    <article key={project.key} className={`upcoming-project-card tone-${project.tone}`}>
          <div key="top" className="upcoming-project-card-top">
            <span key="icon" className="upcoming-project-icon">
              {project.icon}
            </span>
            <div key="heading" className="upcoming-project-heading">
              <span key="kicker" className="upcoming-project-kicker">
                {project.kicker}
              </span>
              <h3 key="title" className="upcoming-project-title">
                {project.title}
              </h3>
            </div>
          </div>
          <p key="text" className="upcoming-project-text">
            {project.description}
          </p>
          <div key="pulse" className="upcoming-project-pulse-row">
            <span key="pulse-1" className="upcoming-project-pulse pulse-1" />
            <span key="pulse-2" className="upcoming-project-pulse pulse-2" />
            <span key="pulse-3" className="upcoming-project-pulse pulse-3" />
            <span key="pulse-4" className="upcoming-project-pulse pulse-4" />
            <span key="pulse-5" className="upcoming-project-pulse pulse-5" />
          </div>
          <div key="details" className="upcoming-project-detail-stack">
            <div key="scope" className="upcoming-project-detail-line">
              <span key="scope-label" className="upcoming-project-detail-label">Scope</span>
              <strong key="scope-value" className="upcoming-project-detail-value">
                {project.scope}
              </strong>
            </div>
            <div key="impact" className="upcoming-project-detail-line">
              <span key="impact-label" className="upcoming-project-detail-label">Impact</span>
              <strong key="impact-value" className="upcoming-project-detail-value">
                {project.impact}
              </strong>
            </div>
          </div>
          <div key="pills" className="upcoming-project-pill-row">
            {project.points.map((point) =>
                              <span key={point} className="upcoming-project-pill">
              {point}
            </span>
                            )}
          </div>
        </article>
                  )}
      </div>
    </div>
  </div>
</section>;

export default UpcomingProjectsSection;
