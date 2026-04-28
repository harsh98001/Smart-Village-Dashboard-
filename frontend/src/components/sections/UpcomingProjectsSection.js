import React from "react";
import { h } from "../../utils/h";
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
  h("section", { className: "upcoming-projects-section" }, [
    h("div", { key: "container", className: "container" }, [
      h("div", { key: "shell", className: "upcoming-projects-shell" }, [
        h("div", { key: "top", className: "upcoming-projects-top" }, [
          h("div", { key: "copy", className: "upcoming-projects-copy" }, [
            h(SectionTitle, {
              key: "title",
              eyebrow: "Upcoming Projects",
              title: "A bigger district roadmap starts immediately after the first six flagship village profiles",
              description:
                "This block expands the dashboard from village monitoring into finance, transport, enterprise, farming, and resilience infrastructure that can shape the next phase of the product."
            }),
            h("div", { key: "tags", className: "upcoming-project-tag-row" }, [
              h("span", { key: "tag-1", className: "upcoming-project-tag" }, "6 expansion tracks"),
              h("span", { key: "tag-2", className: "upcoming-project-tag" }, "2026 to 2030 pipeline"),
              h("span", { key: "tag-3", className: "upcoming-project-tag" }, "District-ready scope")
            ]),
            h("div", { key: "summary", className: "upcoming-project-summary-grid" }, [
              h("div", { key: "s1", className: "upcoming-project-summary-card" }, [
                h("span", { key: "label", className: "upcoming-project-summary-label" }, "Investment Focus"),
                h("strong", { key: "value", className: "upcoming-project-summary-value" }, "Finance, mobility, AI, resilience")
              ]),
              h("div", { key: "s2", className: "upcoming-project-summary-card" }, [
                h("span", { key: "label", className: "upcoming-project-summary-label" }, "Delivery Style"),
                h("strong", { key: "value", className: "upcoming-project-summary-value" }, "Compact phases with measurable public benefit")
              ]),
              h("div", { key: "s3", className: "upcoming-project-summary-card" }, [
                h("span", { key: "label", className: "upcoming-project-summary-label" }, "Why It Matters"),
                h("strong", { key: "value", className: "upcoming-project-summary-value" }, "Turns the product into a full growth command layer")
              ])
            ])
          ]),
          h("div", { key: "visual", className: "upcoming-project-radar" }, [
            h("div", { key: "radar-head", className: "upcoming-project-radar-head" }, [
              h("span", { key: "eyebrow", className: "upcoming-project-radar-chip" }, "Expansion signal"),
              h("strong", { key: "value", className: "upcoming-project-radar-title" }, "Program pipeline trajectory")
            ]),
            h(
              "svg",
              {
                key: "chart",
                className: "upcoming-project-radar-chart",
                viewBox: "0 0 460 190",
                role: "img",
                "aria-label": "Upcoming projects roadmap trajectory"
              },
              [
                h("defs", { key: "defs" }, [
                  h("linearGradient", { key: "line-gradient", id: "projectLineGradient", x1: "0%", y1: "0%", x2: "100%", y2: "0%" }, [
                    h("stop", { key: "stop-1", offset: "0%", stopColor: "#f1a54b" }),
                    h("stop", { key: "stop-2", offset: "55%", stopColor: "#74c0fc" }),
                    h("stop", { key: "stop-3", offset: "100%", stopColor: "#7b3f52" })
                  ]),
                  h("linearGradient", { key: "fill-gradient", id: "projectFillGradient", x1: "0%", y1: "0%", x2: "0%", y2: "100%" }, [
                    h("stop", { key: "fill-stop-1", offset: "0%", stopColor: "#f1a54b", stopOpacity: "0.34" }),
                    h("stop", { key: "fill-stop-2", offset: "100%", stopColor: "#f1a54b", stopOpacity: "0" })
                  ])
                ]),
                h("path", {
                  key: "fill",
                  className: "upcoming-project-radar-fill",
                  d: "M 32 154 C 72 154, 98 150, 132 144 C 170 136, 194 118, 232 96 C 264 78, 302 80, 332 84 C 364 88, 396 74, 432 58 L 432 178 L 32 178 Z"
                }),
                h("path", {
                  key: "line",
                  className: "upcoming-project-radar-line",
                  d: "M 32 154 C 72 154, 98 150, 132 144 C 170 136, 194 118, 232 96 C 264 78, 302 80, 332 84 C 364 88, 396 74, 432 58"
                }),
                roadmapDots.map((dot) =>
                  h("g", { key: dot.key, className: "upcoming-project-radar-dot-group" }, [
                    h("circle", {
                      key: `${dot.key}-halo`,
                      className: "upcoming-project-radar-dot-halo",
                      cx: dot.cx,
                      cy: dot.cy,
                      r: "12"
                    }),
                    h("circle", {
                      key: `${dot.key}-core`,
                      className: "upcoming-project-radar-dot-core",
                      cx: dot.cx,
                      cy: dot.cy,
                      r: "4.5"
                    }),
                    h(
                      "text",
                      {
                        key: `${dot.key}-label`,
                        className: "upcoming-project-radar-dot-label",
                        x: dot.cx,
                        y: String(Number(dot.cy) - 16)
                      },
                      dot.label
                    )
                  ])
                )
              ]
            ),
            h(
              "div",
              { key: "timeline", className: "upcoming-project-roadmap-row" },
              roadmapLabels.map((label) =>
                h("span", { key: label, className: "upcoming-project-roadmap-pill" }, label)
              )
            )
          ])
        ]),
        h(
          "div",
          { key: "grid", className: "upcoming-project-grid" },
          projectTracks.map((project) =>
            h("article", { key: project.key, className: `upcoming-project-card tone-${project.tone}` }, [
              h("div", { key: "top", className: "upcoming-project-card-top" }, [
                h("span", { key: "icon", className: "upcoming-project-icon" }, project.icon),
                h("div", { key: "heading", className: "upcoming-project-heading" }, [
                  h("span", { key: "kicker", className: "upcoming-project-kicker" }, project.kicker),
                  h("h3", { key: "title", className: "upcoming-project-title" }, project.title)
                ])
              ]),
              h("p", { key: "text", className: "upcoming-project-text" }, project.description),
              h("div", { key: "pulse", className: "upcoming-project-pulse-row" }, [
                h("span", { key: "pulse-1", className: "upcoming-project-pulse pulse-1" }),
                h("span", { key: "pulse-2", className: "upcoming-project-pulse pulse-2" }),
                h("span", { key: "pulse-3", className: "upcoming-project-pulse pulse-3" }),
                h("span", { key: "pulse-4", className: "upcoming-project-pulse pulse-4" }),
                h("span", { key: "pulse-5", className: "upcoming-project-pulse pulse-5" })
              ]),
              h("div", { key: "details", className: "upcoming-project-detail-stack" }, [
                h("div", { key: "scope", className: "upcoming-project-detail-line" }, [
                  h("span", { key: "scope-label", className: "upcoming-project-detail-label" }, "Scope"),
                  h("strong", { key: "scope-value", className: "upcoming-project-detail-value" }, project.scope)
                ]),
                h("div", { key: "impact", className: "upcoming-project-detail-line" }, [
                  h("span", { key: "impact-label", className: "upcoming-project-detail-label" }, "Impact"),
                  h("strong", { key: "impact-value", className: "upcoming-project-detail-value" }, project.impact)
                ])
              ]),
              h(
                "div",
                { key: "pills", className: "upcoming-project-pill-row" },
                project.points.map((point) =>
                  h("span", { key: point, className: "upcoming-project-pill" }, point)
                )
              )
            ])
          )
        )
      ])
    ])
  ]);

export default UpcomingProjectsSection;
