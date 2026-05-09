import React, { useState } from "react";
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
    scope: "Credit desks, subsidy routing, and citizen payment visibility.",
    impact: "Faster access to formal finance and cleaner reporting for district teams.",
    reach: "2.1 lakh account touchpoints",
    horizon: "Q4 2026 launch",
    signal: "Benefit routing",
    heroChip: "78% subsidy traceability",
    heroMetric: "DBT and pension visibility",
    heroHeadline: "Connected finance lanes across village households",
    image: "/images/finance.png",
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
    scope: "Startup bays, fibre backbone, cloud support, and skilling labs.",
    impact: "Higher local employment and faster deployment of digital public services.",
    reach: "14 incubator and lab bays",
    horizon: "2026 to 2028 build",
    signal: "Employment stack",
    heroChip: "64 startup seats live",
    heroMetric: "27 pilot teams onboarded",
    heroHeadline: "District tech capacity linked to jobs and services",
    image: "/images/tech.png",
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
    scope: "Metro-lite planning, EV feeder routes, and multimodal terminals.",
    impact: "Lower travel friction for workers, students, and goods movement.",
    reach: "68 km planned service arc",
    horizon: "FY 2027 corridor phase",
    signal: "Mobility spine",
    heroChip: "24 min faster routes",
    heroMetric: "Metro-lite and EV mesh",
    heroHeadline: "Public movement redesigned around village-to-city access",
    image: "/images/metro.png",
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
    scope: "Air-cargo chain, logistics zones, and medical air access.",
    impact: "Stronger export capacity and faster response for critical mobility needs.",
    reach: "3 district export gateways",
    horizon: "2028 regional linkage",
    signal: "Cargo access",
    heroChip: "3 cold-chain belts",
    heroMetric: "Medical and cargo lift",
    heroHeadline: "Fast regional movement for produce, people, and response",
    image: "/images/Airport.png",
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
    scope: "Drone operations, soil scanning, crop vision, and irrigation automation.",
    impact: "Higher crop efficiency with better farmer decision support.",
    reach: "120 smart agri clusters",
    horizon: "2026 to 2029 rollout",
    signal: "Precision farming",
    heroChip: "73% crop vitality signal",
    heroMetric: "Drone and soil labs",
    heroHeadline: "Visible crop intelligence across high-value farming zones",
    image: "/images/integratedfarming.png",
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
    scope: "Early warning sensors, rescue routing, and relief stock visibility.",
    impact: "Quicker district response and safer citizen communication during risk events.",
    reach: "42 sensor and siren nodes",
    horizon: "Always-on emergency grid",
    signal: "Command readiness",
    heroChip: "11 min alert dispatch",
    heroMetric: "42 node response net",
    heroHeadline: "District safety command built for faster warnings and relief",
    image: "/images/disaster.png",
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

const UpcomingProjectsSection = () => {
  const [showExtendedProjects, setShowExtendedProjects] = useState(false);
  const [activeExtendedIndex, setActiveExtendedIndex] = useState(0);

  const primaryProjects = projectTracks.slice(0, 4);
  const extendedProjects = projectTracks.slice(4);
  const activeExtendedProject = extendedProjects[activeExtendedIndex];

  const renderProjectCard = (project, index) => (
    <article key={project.key} className={`upcoming-project-card upcoming-project-editorial-card tone-${project.tone} ${index % 2 === 1 ? "media-left" : ""}`}>
      <div className="upcoming-project-editorial-copy">
        <span className="upcoming-project-editorial-index">0{index + 1}</span>
        <span className="upcoming-project-kicker">{project.kicker}</span>
        <h3 className="upcoming-project-title upcoming-project-editorial-title">{project.title}</h3>
        <p className="upcoming-project-text upcoming-project-editorial-text">{project.description}</p>

        <div className="upcoming-project-editorial-points">
          {project.points.map((point) => (
            <span key={point} className="upcoming-project-pill upcoming-project-editorial-pill">
              {point}
            </span>
          ))}
        </div>

        <div className="upcoming-project-editorial-meta">
          <div className="upcoming-project-editorial-meta-card">
            <span className="upcoming-project-detail-label">Scope</span>
            <strong className="upcoming-project-detail-value">{project.scope}</strong>
          </div>
          <div className="upcoming-project-editorial-meta-card">
            <span className="upcoming-project-detail-label">Impact</span>
            <strong className="upcoming-project-detail-value">{project.impact}</strong>
          </div>
        </div>
      </div>

      <div className="upcoming-project-editorial-media" style={{ backgroundImage: `linear-gradient(180deg, rgba(17, 38, 62, 0.12), rgba(17, 38, 62, 0.34)), url(${project.image})` }}>
        <div className="upcoming-project-editorial-badges">
          <span className="upcoming-project-editorial-badge badge-left">{project.heroChip}</span>
          <span className="upcoming-project-editorial-badge badge-right">{project.heroMetric}</span>
        </div>

        <div className="upcoming-project-editorial-brand">{project.icon}</div>

        <div className="upcoming-project-editorial-overlay">
          <span className="upcoming-project-editorial-signal">{project.signal}</span>
          <strong className="upcoming-project-editorial-reach">{project.reach}</strong>
          <span className="upcoming-project-editorial-headline">{project.heroHeadline}</span>
          <span className="upcoming-project-editorial-horizon">{project.horizon}</span>
        </div>
      </div>
    </article>
  );

  return (
    <section className="upcoming-projects-section">
      <div className="container">
        <div className="upcoming-projects-shell">
          <div className="upcoming-projects-top">
            <div className="upcoming-projects-copy">
              <SectionTitle
                eyebrow="Upcoming Projects"
                title="A bigger district roadmap starts immediately after the first six flagship village profiles"
                description="This block expands the dashboard from village monitoring into finance, transport, enterprise, farming, and resilience infrastructure that can shape the next phase of the product."
              />
              <div className="upcoming-project-tag-row">
                <span className="upcoming-project-tag">6 expansion tracks</span>
                <span className="upcoming-project-tag">2026 to 2030 pipeline</span>
                <span className="upcoming-project-tag">District-ready scope</span>
              </div>
              <div className="upcoming-project-summary-grid">
                <div className="upcoming-project-summary-card">
                  <span className="upcoming-project-summary-label">Investment Focus</span>
                  <strong className="upcoming-project-summary-value">Finance, mobility, AI, resilience</strong>
                </div>
                <div className="upcoming-project-summary-card">
                  <span className="upcoming-project-summary-label">Delivery Style</span>
                  <strong className="upcoming-project-summary-value">Compact phases with measurable public benefit</strong>
                </div>
                <div className="upcoming-project-summary-card">
                  <span className="upcoming-project-summary-label">Why It Matters</span>
                  <strong className="upcoming-project-summary-value">Turns the product into a full growth command layer</strong>
                </div>
              </div>
            </div>
            <div className="upcoming-project-radar">
              <div className="upcoming-project-radar-head">
                <span className="upcoming-project-radar-chip">Expansion signal</span>
                <strong className="upcoming-project-radar-title">Program pipeline trajectory</strong>
              </div>
              <svg className="upcoming-project-radar-chart" viewBox="0 0 460 190" role="img" aria-label="Upcoming projects roadmap trajectory">
                <defs>
                  <linearGradient id="projectLineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#f1a54b" />
                    <stop offset="55%" stopColor="#74c0fc" />
                    <stop offset="100%" stopColor="#7b3f52" />
                  </linearGradient>
                  <linearGradient id="projectFillGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#f1a54b" stopOpacity="0.34" />
                    <stop offset="100%" stopColor="#f1a54b" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <path className="upcoming-project-radar-fill" d="M 32 154 C 72 154, 98 150, 132 144 C 170 136, 194 118, 232 96 C 264 78, 302 80, 332 84 C 364 88, 396 74, 432 58 L 432 178 L 32 178 Z" />
                <path className="upcoming-project-radar-line" d="M 32 154 C 72 154, 98 150, 132 144 C 170 136, 194 118, 232 96 C 264 78, 302 80, 332 84 C 364 88, 396 74, 432 58" />
                {roadmapDots.map((dot) => (
                  <g key={dot.key} className="upcoming-project-radar-dot-group">
                    <circle className="upcoming-project-radar-dot-halo" cx={dot.cx} cy={dot.cy} r="12" />
                    <circle className="upcoming-project-radar-dot-core" cx={dot.cx} cy={dot.cy} r="4.5" />
                    <text className="upcoming-project-radar-dot-label" x={dot.cx} y={String(Number(dot.cy) - 16)}>
                      {dot.label}
                    </text>
                  </g>
                ))}
              </svg>
              <div className="upcoming-project-roadmap-row">
                {roadmapLabels.map((label) => (
                  <span key={label} className="upcoming-project-roadmap-pill">
                    {label}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="upcoming-project-grid upcoming-project-editorial-list">
            {primaryProjects.map((project, index) => renderProjectCard(project, index))}

            {!showExtendedProjects && (
              <div className="upcoming-project-more-row">
                <button type="button" className="upcoming-project-more-button" onClick={() => setShowExtendedProjects(true)}>
                  <span className="upcoming-project-more-eyebrow">Next expansion view</span>
                  <strong className="upcoming-project-more-title">More Projects</strong>
                  <span className="upcoming-project-more-text">Open an interactive spotlight for AI farming and resilience planning</span>
                </button>
              </div>
            )}
          </div>

          {showExtendedProjects && activeExtendedProject && (
            <div className={`upcoming-project-spotlight-shell tone-${activeExtendedProject.tone}`}>
              <div className="upcoming-project-spotlight-head">
                <div className="upcoming-project-spotlight-intro">
                  <span className="upcoming-project-spotlight-eyebrow">Expanded Project Showcase</span>
                  <strong className="upcoming-project-spotlight-title">Interactive spotlight for the remaining strategic projects</strong>
                </div>
                <div className="upcoming-project-spotlight-controls">
                  <button
                    type="button"
                    className="upcoming-project-spotlight-arrow"
                    onClick={() => setActiveExtendedIndex((prev) => (prev === 0 ? extendedProjects.length - 1 : prev - 1))}
                    aria-label="Previous project"
                  >
                    ‹
                  </button>
                  <button
                    type="button"
                    className="upcoming-project-spotlight-arrow"
                    onClick={() => setActiveExtendedIndex((prev) => (prev === extendedProjects.length - 1 ? 0 : prev + 1))}
                    aria-label="Next project"
                  >
                    ›
                  </button>
                </div>
              </div>

              <div className="upcoming-project-spotlight-stage">
                <div className="upcoming-project-spotlight-copy">
                  <span className="upcoming-project-editorial-index">0{activeExtendedIndex + 5}</span>
                  <span className="upcoming-project-kicker">{activeExtendedProject.kicker}</span>
                  <h3 className="upcoming-project-spotlight-name">{activeExtendedProject.title}</h3>
                  <p className="upcoming-project-spotlight-text">{activeExtendedProject.description}</p>

                  <div className="upcoming-project-spotlight-metric-grid">
                    <div className="upcoming-project-spotlight-metric-card">
                      <span className="upcoming-project-detail-label">Scope</span>
                      <strong className="upcoming-project-detail-value">{activeExtendedProject.scope}</strong>
                    </div>
                    <div className="upcoming-project-spotlight-metric-card">
                      <span className="upcoming-project-detail-label">Impact</span>
                      <strong className="upcoming-project-detail-value">{activeExtendedProject.impact}</strong>
                    </div>
                  </div>

                  <div className="upcoming-project-editorial-points">
                    {activeExtendedProject.points.map((point) => (
                      <span key={point} className="upcoming-project-pill upcoming-project-editorial-pill">
                        {point}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="upcoming-project-spotlight-media-frame">
                  <div className="upcoming-project-spotlight-image-layer" style={{ backgroundImage: `linear-gradient(180deg, rgba(17, 38, 62, 0.14), rgba(17, 38, 62, 0.46)), url(${activeExtendedProject.image})` }} />
                  <div className="upcoming-project-spotlight-float-card float-left">{activeExtendedProject.heroChip}</div>
                  <div className="upcoming-project-spotlight-float-card float-right">{activeExtendedProject.heroMetric}</div>
                  <div className="upcoming-project-spotlight-overlay">
                    <span className="upcoming-project-editorial-signal">{activeExtendedProject.signal}</span>
                    <strong className="upcoming-project-spotlight-reach">{activeExtendedProject.reach}</strong>
                    <span className="upcoming-project-spotlight-headline">{activeExtendedProject.heroHeadline}</span>
                    <span className="upcoming-project-editorial-horizon">{activeExtendedProject.horizon}</span>
                  </div>
                </div>
              </div>

              <div className="upcoming-project-spotlight-dots">
                {extendedProjects.map((project, index) => (
                  <button
                    key={project.key}
                    type="button"
                    className={`upcoming-project-spotlight-dot ${index === activeExtendedIndex ? "is-active" : ""}`}
                    onClick={() => setActiveExtendedIndex(index)}
                    aria-label={`Show ${project.title}`}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default UpcomingProjectsSection;


