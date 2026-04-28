import React from "react";
import { h } from "../utils/h";
import { useData } from "../context/DataContext";
import { formatNumber } from "../utils/formatters";
import HeroCarousel from "../components/sections/HeroCarousel";
import VillageHighlights from "../components/sections/VillageHighlights";
import FullWidthBanner from "../components/sections/FullWidthBanner";
import WeatherSpotlight from "../components/sections/WeatherSpotlight";
import StatCard from "../components/ui/StatCard";
import CctvOperationsSection from "../components/sections/CctvOperationsSection";
import AirQualitySection from "../components/sections/AirQualitySection";
import UpcomingProjectsSection from "../components/sections/UpcomingProjectsSection";

const LandingPage = () => {
  const { villages, overview } = useData();
  const villageChunks = [
    villages.slice(0, 6),
    villages.slice(6, 12),
    villages.slice(12, 18),
    villages.slice(18, 24)
  ];

  return h("div", { className: "landing-page" }, [
    h(HeroCarousel, { key: "hero" }),
    h("section", { key: "stats", className: "landing-stat-strip" }, [
      h("div", { key: "container", className: "container" }, [
        h("div", { key: "grid", className: "stats-grid compact-grid" }, [
          h(StatCard, {
            key: "villages",
            icon: "🏘️",
            title: "Prepared Villages",
            value: overview.totalVillages,
            description: "Profiles from different Indian states.",
            formatter: formatNumber,
            tone: "sky"
          }),
          h(StatCard, {
            key: "population",
            icon: "👥",
            title: "Population Reach",
            value: overview.totalPopulation,
            description: "Citizens represented in the sample intelligence layer.",
            formatter: formatNumber,
            tone: "maroon"
          }),
          h(StatCard, {
            key: "growth",
            icon: "📈",
            title: "Growth Average",
            value: overview.averageGrowth,
            description: "A quick signal of overall development momentum.",
            formatter: (value) => `${value}%`,
            tone: "orange"
          }),
          h(StatCard, {
            key: "literacy",
            icon: "📚",
            title: "Literacy Average",
            value: overview.averageLiteracy,
            description: "Human development capacity across the network.",
            formatter: (value) => `${value}%`,
            tone: "green"
          })
        ])
      ])
    ]),
    h("section", { key: "image-banner", className: "landing-image-banner" }, [
      h("div", { key: "container", className: "container" }, [
        h("div", { key: "card", className: "image-banner-card premium-banner-card" }, [
          h("div", { key: "content", className: "image-banner-copy" }, [
            h("span", { key: "eyebrow", className: "section-eyebrow image-banner-eyebrow" }, "National-grade visual section"),
            h(
              "h2",
              { key: "title", className: "section-heading image-banner-title" },
              "A living mission wall for rural growth, resilience, and visible governance"
            ),
            h(
              "p",
              { key: "text", className: "section-description image-banner-description" },
              "Turn this space into a premium storytelling panel that feels ministry-ready: one confident visual block for agriculture progress, water intelligence, village services, and long-term transformation."
            ),
            h("div", { key: "pills", className: "image-banner-pill-list" }, [
              h("span", { key: "p1", className: "image-banner-pill" }, "30 villages in one command view"),
              h("span", { key: "p2", className: "image-banner-pill" }, "Growth, water, and AQI signals together"),
              h("span", { key: "p3", className: "image-banner-pill" }, "Built for reports, demos, and governance pitches")
            ]),
            h("div", { key: "stats", className: "image-banner-stats" }, [
              h("div", { key: "s1", className: "image-banner-stat" }, [
                h("strong", { key: "value" }, `${overview.totalVillages}`),
                h("span", { key: "label" }, "Villages mapped")
              ]),
              h("div", { key: "s2", className: "image-banner-stat" }, [
                h("strong", { key: "value" }, formatNumber(overview.totalPopulation)),
                h("span", { key: "label" }, "Citizens represented")
              ]),
              h("div", { key: "s3", className: "image-banner-stat" }, [
                h("strong", { key: "value" }, `${overview.averageGrowth}%`),
                h("span", { key: "label" }, "Average growth signal")
              ])
            ])
          ]),
          h("div", { key: "visual-shell", className: "image-banner-visual-shell" }, [
            h("div", { key: "placeholder", className: "image-banner-placeholder public-image-frame" }, [
              h("img", {
                key: "image",
                src: "public/images/data.png",
                alt: "Landing mission banner",
                className: "public-image image-banner-image",
                onError: (event) => {
                  event.currentTarget.parentElement?.classList.add("is-missing");
                }
              }),
              h(
                "span",
                { key: "note", className: "media-fallback" },
                "Add /images/landing/full-width-banner.jpg"
              )
            ]),
            h("div", { key: "chip-1", className: "image-banner-floating-chip chip-water" }, [
              h("strong", { key: "value" }, "58%"),
              h("span", { key: "label" }, "Water recovery")
            ]),
            h("div", { key: "chip-2", className: "image-banner-floating-chip chip-crop" }, [
              h("strong", { key: "value" }, "73%"),
              h("span", { key: "label" }, "Crop vitality")
            ]),
            h("div", { key: "chip-3", className: "image-banner-floating-chip chip-services" }, [
              h("strong", { key: "value" }, "36%"),
              h("span", { key: "label" }, "Digital services expanded")
            ]),
            h("div", { key: "glow", className: "image-banner-glow" })
          ])
        ])
      ])
    ]),
    h(VillageHighlights, {
      key: "villages-1",
      villages: villageChunks[0],
      title: "Priority villages in the first monitoring row",
      description:
        "The first six cards establish the core village network before the page expands into upcoming project tracks for the next phase of district growth."
    }),
    h(WeatherSpotlight, { key: "weather", regionName: "Kapurthala", regionState: "Punjab" }),
    h(AirQualitySection, {
      key: "aqi",
      eyebrow: "Live AQI Layer",
      title: "Real-time AQI snapshot for major Indian monitoring cities",
      description:
        "This live AQI section adds environmental context to the landing page and can also be reused in Analytics and Growth."
    }),
    h(VillageHighlights, {
      key: "villages-2",
      villages: villageChunks[1],
      eyebrow: "Field Expansion",
      title: "Additional villages with strong growth, water, and literacy signals",
      description:
        "This second group continues the village story without forcing the user through an uninterrupted long card wall."
    }),
    h(CctvOperationsSection, { key: "cctv", villages: villages.slice(0, 12) }),
    h(VillageHighlights, {
      key: "villages-3",
      villages: villageChunks[2],
      eyebrow: "Village Infrastructure Belt",
      title: "Priority villages under safety, road, and service monitoring",
      description:
        "This group highlights villages where CCTV readiness, road upgrades, and public service monitoring create the next layer of district-level visibility."
    }),
    h(UpcomingProjectsSection, { key: "upcoming-projects-bottom" }),
    h(VillageHighlights, {
      key: "villages-4",
      villages: villageChunks[3],
      eyebrow: "Extended Coverage",
      title: "Final village profiles before the closing mission note",
      description:
        "The last six cards keep the national sample visible without pushing the landing page into another oversized card wall."
    }),
    h(FullWidthBanner, { key: "banner" })
  ]);
};

export default LandingPage;
