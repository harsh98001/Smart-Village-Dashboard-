import React from "react";
import { h } from "../utils/h";
import { useData } from "../context/DataContext";
import PageBanner from "../components/layout/PageBanner";
import StatCard from "../components/ui/StatCard";
import ChartCard from "../components/ui/ChartCard";
import AirQualitySection from "../components/sections/AirQualitySection";
import InsightMarquee from "../components/ui/InsightMarquee";
import { formatNumber, formatPercent } from "../utils/formatters";
import {
  analyticsHeroSignals,
  analyticsPriceRecords,
  analyticsSchemeCards,
  analyticsServiceCards
} from "../data/intelligenceDecks";

const analyticsMarqueeItems = [
  "Mandi price intelligence",
  "PM-KISAN beneficiary map",
  "MGNREGA execution tracking",
  "PMKVY skill readiness",
  "Banking corridor coverage",
  "Solar institution rollout",
  "E-education command layer",
  "Blinkit and Zepto pilots",
  "Retail and supermarket access",
  "District commerce monitoring"
];

const formatCurrency = (value) => `₹${formatNumber(value)}`;

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

const renderAnalyticsSignal = (signal) =>
  h("div", { key: signal.label, className: "command-signal-card analytics-signal-card" }, [
    h("span", { key: "label", className: "command-signal-label" }, signal.label),
    h("strong", { key: "value", className: "command-signal-value" }, signal.value),
    h("p", { key: "note", className: "command-signal-note" }, signal.note)
  ]);

const renderVisualTile = (tile) =>
  h("div", { key: tile.label, className: "visual-metric-tile" }, [
    h("span", { key: "label", className: "visual-metric-label" }, tile.label),
    h("strong", { key: "value", className: "visual-metric-value" }, tile.value),
    h("span", { key: "note", className: "visual-metric-note" }, tile.note)
  ]);

const AnalyticsPage = () => {
  const { overview } = useData();

  const fruitRecords = analyticsPriceRecords.filter((record) => record.category === "Fruit");
  const vegetableRecords = analyticsPriceRecords.filter(
    (record) => record.category === "Vegetable"
  );
  const highestPriceRecord = analyticsPriceRecords.reduce((best, record) =>
    record.price > best.price ? record : best
  );
  const strongestTrendRecord = analyticsPriceRecords.reduce((best, record) =>
    record.trend > best.trend ? record : best
  );
  const averageBasketPrice = Math.round(
    analyticsPriceRecords.reduce((sum, record) => sum + record.price, 0) /
      analyticsPriceRecords.length
  );
  const schemeVolumes = analyticsSchemeCards.map((scheme) => parseIndianMagnitude(scheme.volume, 0));
  const schemeVolumeScores = buildRelativeScores(schemeVolumes);
  const serviceRawValues = analyticsServiceCards.map((service) =>
    service.id === "quick" ? 3 : firstNumberFromText(service.value, 0)
  );
  const serviceRelativeScores = buildRelativeScores(serviceRawValues);
  const averageSchemeCoverage = Math.round(
    analyticsSchemeCards.reduce((sum, scheme) => sum + scheme.coverage, 0) /
      analyticsSchemeCards.length
  );
  const highestCoverageScheme = analyticsSchemeCards.reduce((best, scheme) =>
    scheme.coverage > best.coverage ? scheme : best
  );
  const biggestScheme = analyticsSchemeCards[
    schemeVolumes.indexOf(Math.max(...schemeVolumes))
  ];
  const serviceTouchpoints = analyticsServiceCards.reduce(
    (sum, service) =>
      sum + (service.id === "quick" ? 3 : firstNumberFromText(service.value, 0)),
    0
  );

  const analyticsSummaryCards = [
    {
      key: "market",
      icon: "MKT",
      title: "Average mandi basket",
      value: averageBasketPrice,
      description: "Reference basket blended across fruit and vegetable arrivals.",
      formatter: formatCurrency,
      tone: "orange"
    },
    {
      key: "schemes",
      icon: "DBT",
      title: "Scheme reach average",
      value: averageSchemeCoverage,
      description: "Coverage across PM-KISAN, MGNREGA, PMKVY, PMAY-G, NRLM, and Ayushman.",
      formatter: (value) => `${value}%`,
      tone: "maroon"
    },
    {
      key: "services",
      icon: "FIN",
      title: "Service touchpoints",
      value: serviceTouchpoints,
      description: "Banking, solar, retail, tele-health, and digital access points in the deck.",
      formatter: formatNumber,
      tone: "green"
    },
    {
      key: "coverage",
      icon: "VLG",
      title: "Village records loaded",
      value: overview.totalVillages,
      description: "Live village records contributing to the analytics storytelling layer.",
      formatter: formatNumber,
      tone: "sky"
    }
  ];

  const marketTiles = [
    {
      label: "Basket average",
      value: formatCurrency(averageBasketPrice),
      note: "Blended fruit and vegetable reference rate"
    },
    {
      label: "Highest price",
      value: `${highestPriceRecord.item} ${formatCurrency(highestPriceRecord.price)}`,
      note: highestPriceRecord.market
    },
    {
      label: "Fastest mover",
      value: `${strongestTrendRecord.item} +${strongestTrendRecord.trend}%`,
      note: "Most active price swing in the basket"
    }
  ];

  const schemeTiles = [
    {
      label: "Average reach",
      value: formatPercent(averageSchemeCoverage),
      note: "Coverage across six tracked flagship schemes"
    },
    {
      label: "Largest volume",
      value: biggestScheme.name,
      note: biggestScheme.volume
    },
    {
      label: "Top coverage",
      value: `${highestCoverageScheme.name} ${formatPercent(highestCoverageScheme.coverage)}`,
      note: "Current strongest execution signal"
    }
  ];

  const serviceTiles = [
    {
      label: "Total service nodes",
      value: formatNumber(serviceTouchpoints),
      note: "Scaled across finance, solar, commerce, health, and delivery"
    },
    {
      label: "Strongest network",
      value: "Solar readiness",
      note: analyticsServiceCards[0].value
    },
    {
      label: "Digital access",
      value: "E-education + ONDC",
      note: "Classrooms, ecommerce, and citizen service layers"
    }
  ];

  const pricePulseConfig = {
    type: "bar",
    data: {
      labels: analyticsPriceRecords.map((record) => record.item),
      datasets: [
        {
          label: "Reference price",
          data: analyticsPriceRecords.map((record) => record.price),
          backgroundColor: analyticsPriceRecords.map((record) =>
            record.category === "Fruit" ? "rgba(241, 165, 75, 0.78)" : "rgba(79, 157, 105, 0.76)"
          ),
          borderRadius: 14
        }
      ]
    },
    options: buildLightChartOptions()
  };

  const categorySpreadConfig = {
    type: "doughnut",
    data: {
      labels: ["Fruit basket", "Vegetable basket"],
      datasets: [
        {
          data: [
            Math.round(
              fruitRecords.reduce((sum, record) => sum + record.price, 0) /
                fruitRecords.length
            ),
            Math.round(
              vegetableRecords.reduce((sum, record) => sum + record.price, 0) /
                vegetableRecords.length
            )
          ],
          backgroundColor: ["#f1a54b", "#4f9d69"],
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

  const schemeCoverageConfig = {
    type: "bar",
    data: {
      labels: analyticsSchemeCards.map((scheme) => scheme.name),
      datasets: [
        {
          label: "Coverage",
          data: analyticsSchemeCards.map((scheme) => scheme.coverage),
          backgroundColor: ["#7b3f52", "#a45a44", "#f1a54b", "#74c0fc", "#4f9d69", "#8a5a44"],
          borderRadius: 16
        }
      ]
    },
    options: buildLightChartOptions()
  };

  const serviceCoverageConfig = {
    type: "line",
    data: {
      labels: analyticsServiceCards.map((service) => service.title.replace(" and ", " & ")),
      datasets: [
        {
          label: "Coverage units",
          data: serviceRelativeScores,
          borderColor: "#4399df",
          backgroundColor: "rgba(67, 153, 223, 0.12)",
          pointBackgroundColor: "#7b3f52",
          pointRadius: 4,
          tension: 0.32,
          fill: true
        }
      ]
    },
    options: buildLightChartOptions()
  };

  const marketWaveConfig = {
    type: "line",
    data: {
      labels: analyticsPriceRecords.map((record) => record.item),
      datasets: [
        {
          label: "Price wave",
          data: analyticsPriceRecords.map((record) => record.price),
          borderColor: "#8f67f1",
          backgroundColor: "rgba(143, 103, 241, 0.12)",
          pointBackgroundColor: "#8f67f1",
          pointRadius: 3.5,
          tension: 0.4,
          fill: true
        }
      ]
    },
    options: buildLightChartOptions()
  };

  const priceTrendConfig = {
    type: "bar",
    data: {
      labels: analyticsPriceRecords.map((record) => record.item),
      datasets: [
        {
          label: "Trend shift",
          data: analyticsPriceRecords.map((record) => record.trend),
          backgroundColor: analyticsPriceRecords.map((record) =>
            record.trend >= 0 ? "rgba(89, 190, 148, 0.78)" : "rgba(255, 150, 180, 0.78)"
          ),
          borderRadius: 12
        }
      ]
    },
    options: buildLightChartOptions()
  };

  const schemeVolumeConfig = {
    type: "bar",
    data: {
      labels: analyticsSchemeCards.map((scheme) => scheme.name),
      datasets: [
        {
          label: "Scale score",
          data: schemeVolumeScores,
          backgroundColor: "rgba(104, 177, 240, 0.78)",
          borderRadius: 14
        }
      ]
    },
    options: buildLightChartOptions({
      indexAxis: "y"
    })
  };

  const schemeGapConfig = {
    type: "doughnut",
    data: {
      labels: ["Average coverage", "Uncovered gap"],
      datasets: [
        {
          data: [averageSchemeCoverage, 100 - averageSchemeCoverage],
          backgroundColor: ["#8f67f1", "rgba(143, 103, 241, 0.16)"],
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

  const serviceClusterConfig = {
    type: "bar",
    data: {
      labels: ["Solar", "Classrooms", "Banking", "ONDC", "Retail", "Citizen", "Health"],
      datasets: [
        {
          label: "Scaled access",
          data: serviceRelativeScores,
          backgroundColor: [
            "rgba(89, 190, 148, 0.78)",
            "rgba(143, 103, 241, 0.76)",
            "rgba(104, 177, 240, 0.78)",
            "rgba(255, 160, 185, 0.78)",
            "rgba(255, 183, 99, 0.78)",
            "rgba(120, 217, 204, 0.78)",
            "rgba(158, 173, 255, 0.78)"
          ],
          borderRadius: 12
        }
      ]
    },
    options: buildLightChartOptions()
  };

  const commerceSplitConfig = {
    type: "doughnut",
    data: {
      labels: ["Banking", "Education", "Retail", "Quick-commerce", "Citizen", "Health"],
      datasets: [
        {
          data: [
            serviceRelativeScores[2],
            serviceRelativeScores[1],
            serviceRelativeScores[5],
            serviceRelativeScores[4],
            serviceRelativeScores[6],
            serviceRelativeScores[7]
          ],
          backgroundColor: ["#8f67f1", "#8fd4ff", "#ff9cbc", "#ffb763", "#7bd6c7", "#a49cf4"],
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

  const deliveryMixConfig = {
    type: "line",
    data: {
      labels: ["Banking", "Solar", "Education", "Retail", "Citizen", "Health"],
      datasets: [
        {
          label: "Delivery intensity",
          data: [
            serviceRelativeScores[2],
            serviceRelativeScores[0],
            serviceRelativeScores[1],
            serviceRelativeScores[5],
            serviceRelativeScores[6],
            serviceRelativeScores[7]
          ],
          borderColor: "#ff8dac",
          backgroundColor: "rgba(255, 141, 172, 0.12)",
          pointBackgroundColor: "#ff8dac",
          pointRadius: 4,
          tension: 0.36,
          fill: true
        }
      ]
    },
    options: buildLightChartOptions()
  };

  const digitalReachConfig = {
    type: "bar",
    data: {
      labels: ["ONDC nodes", "Blinkit/Zomato/Zepto", "Classrooms", "Citizen desks"],
      datasets: [
        {
          label: "Digital reach score",
          data: [serviceRelativeScores[3], serviceRelativeScores[4], serviceRelativeScores[1], serviceRelativeScores[6]],
          backgroundColor: ["rgba(143, 103, 241, 0.76)", "rgba(255, 160, 185, 0.78)", "rgba(104, 177, 240, 0.78)", "rgba(120, 217, 204, 0.78)"],
          borderRadius: 14
        }
      ]
    },
    options: buildLightChartOptions()
  };

  return h("div", null, [
    h(PageBanner, {
      key: "banner",
      chips: [
        "Fruit and vegetable prices",
        "PM-KISAN, MGNREGA, PMKVY",
        "Solar and e-education",
        "Banks and ecommerce",
        "Blinkit, Zomato, Zepto",
        "Live AQI"
      ]
    }),
    h(InsightMarquee, {
      key: "marquee",
      eyebrow: "Analytics Priorities",
      items: analyticsMarqueeItems,
      speed: "slow"
    }),
    h("section", { key: "body", className: "analytics-page-section" }, [
      h("div", { key: "container", className: "container" }, [
        h("div", { key: "hero", className: "intelligence-command-board analytics-command-board" }, [
          h("div", { key: "copy", className: "command-copy" }, [
            h("span", { key: "eyebrow", className: "section-eyebrow" }, "District market intelligence"),
            h(
              "h2",
              { key: "title", className: "command-title" },
              "Analytics now tracks market prices, flagship schemes, solar readiness, digital services, and retail reach in one command board"
            ),
            h(
              "p",
              { key: "description", className: "command-description" },
              "The analytics layer now behaves like a district governance briefing deck. It links fruit and vegetable prices with PM-KISAN, MGNREGA, PMKVY, banking access, e-education, ecommerce, modern retail, and quick-commerce pilots so the page feels dense, useful, and interview-ready."
            ),
            h(
              "div",
              { key: "chips", className: "command-chip-row" },
              [
                "Mandi pulse",
                "Beneficiary reach",
                "Banking access",
                "Solar institutions",
                "E-education",
                "Retail and quick-commerce"
              ].map((chip) => h("span", { key: chip, className: "command-chip" }, chip))
            ),
            h(
              "div",
              { key: "signals", className: "command-signal-grid analytics-signal-grid" },
              analyticsHeroSignals.map(renderAnalyticsSignal)
            )
          ]),
          h("div", { key: "visual", className: "command-visual-shell" }, [
            h("div", { key: "frame", className: "command-visual-frame analytics-visual-frame" }, [
              h("img", {
                key: "image",
                src: "/images/analytics-reference.webp",
                alt: "Analytics reference board",
                className: "command-reference-image"
              }),
              h("div", { key: "panel1", className: "command-overlay-card overlay-top" }, [
                h("span", { key: "label", className: "command-overlay-label" }, "Kapurthala mandi basket"),
                h("strong", { key: "value", className: "command-overlay-value" }, formatCurrency(averageBasketPrice)),
                h("p", { key: "text", className: "command-overlay-note" }, "Weighted reference basket across fruit and vegetable arrivals")
              ]),
              h("div", { key: "panel2", className: "command-overlay-card overlay-bottom-left" }, [
                h("span", { key: "label", className: "command-overlay-label" }, "Scheme execution pulse"),
                h("strong", { key: "value", className: "command-overlay-value" }, `${averageSchemeCoverage}%`),
                h("p", { key: "text", className: "command-overlay-note" }, "Average active scheme reach across six flagship programmes")
              ]),
              h("div", { key: "panel3", className: "command-overlay-card overlay-bottom-right" }, [
                h("span", { key: "label", className: "command-overlay-label" }, "Digital service stack"),
                h("strong", { key: "value", className: "command-overlay-value" }, "Banks + ONDC + retail"),
                h("p", { key: "text", className: "command-overlay-note" }, "Public delivery and private commerce signals in one layer")
              ])
            ])
          ])
        ]),
        h(
          "div",
          { key: "stats", className: "stats-grid compact-grid intelligence-kpi-strip" },
          analyticsSummaryCards.map((card) =>
            h(StatCard, {
              key: card.key,
              icon: card.icon,
              title: card.title,
              value: card.value,
              description: card.description,
              formatter: card.formatter,
              tone: card.tone
            })
          )
        ),
        h("div", { key: "charts", className: "intelligence-chart-grid" }, [
          h(ChartCard, {
            key: "pricePulse",
            title: "Fruit and vegetable price pulse",
            subtitle: "Reference prices across the monitored mandi basket",
            config: pricePulseConfig
          }),
          h(ChartCard, {
            key: "categorySpread",
            title: "Basket composition",
            subtitle: "Fruit basket versus vegetable basket average",
            config: categorySpreadConfig
          }),
          h(ChartCard, {
            key: "schemeCoverage",
            title: "Flagship scheme coverage",
            subtitle: "PM-KISAN, MGNREGA, PMKVY, PMAY-G, NRLM, Ayushman",
            config: schemeCoverageConfig
          }),
          h(ChartCard, {
            key: "serviceCoverage",
            title: "Service access footprint",
            subtitle: "Solar, education, banking, ecommerce, quick-commerce, and tele-health",
            config: serviceCoverageConfig
          })
        ]),
        h("div", { key: "visualBoards", className: "intelligence-double-grid visual-board-double-grid" }, [
          h("section", { key: "marketBoard", className: "visual-graph-board" }, [
            h("div", { key: "head", className: "intelligence-section-head" }, [
              h("span", { key: "eyebrow", className: "section-eyebrow" }, "Market records"),
              h("h3", { key: "title", className: "table-title" }, "Fruit and vegetable reference rates"),
              h(
                "p",
                { key: "desc", className: "command-muted" },
                "This area now reads like a chart board instead of a long table."
              )
            ]),
            h("div", { key: "tiles", className: "visual-metric-row" }, marketTiles.map(renderVisualTile)),
            h("div", { key: "graphs", className: "mini-graph-grid two-up" }, [
              h(ChartCard, {
                key: "marketWave",
                title: "Basket wave",
                subtitle: "Price motion across tracked items",
                config: marketWaveConfig,
                className: "compact-graph-card",
                canvasHeight: 170
              }),
              h(ChartCard, {
                key: "trendShift",
                title: "Trend shift",
                subtitle: "Upside and downside movement",
                config: priceTrendConfig,
                className: "compact-graph-card",
                canvasHeight: 170
              })
            ])
          ]),
          h("section", { key: "schemeBoard", className: "visual-graph-board" }, [
            h("div", { key: "head", className: "intelligence-section-head" }, [
              h("span", { key: "eyebrow", className: "section-eyebrow" }, "Welfare and livelihoods"),
              h("h3", { key: "title", className: "table-title" }, "Government scheme execution cards"),
              h(
                "p",
                { key: "desc", className: "command-muted" },
                "Coverage and scale now show up as briefing graphs instead of long card paragraphs."
              )
            ]),
            h("div", { key: "tiles", className: "visual-metric-row" }, schemeTiles.map(renderVisualTile)),
            h("div", { key: "graphs", className: "mini-graph-grid two-up" }, [
              h(ChartCard, {
                key: "schemeScale",
                title: "Programme scale",
                subtitle: "Relative execution volume by scheme",
                config: schemeVolumeConfig,
                className: "compact-graph-card",
                canvasHeight: 170
              }),
              h(ChartCard, {
                key: "schemeGap",
                title: "Coverage vs gap",
                subtitle: "Average coverage ring",
                config: schemeGapConfig,
                className: "compact-graph-card",
                canvasHeight: 170
              })
            ])
          ])
        ]),
        h("section", { key: "services", className: "intelligence-service-shell graph-service-shell" }, [
          h("div", { key: "head", className: "intelligence-section-head" }, [
            h("span", { key: "eyebrow", className: "section-eyebrow" }, "Commerce and service access"),
            h("h3", { key: "title", className: "table-title" }, "Solar, e-education, banks, ecommerce, delivery, retail, and citizen services"),
            h(
              "p",
              { key: "desc", className: "command-muted" },
              "This section is now graph-led, so the service layer looks closer to a real dashboard screen."
            )
          ]),
          h("div", { key: "tiles", className: "visual-metric-row service-tile-row" }, serviceTiles.map(renderVisualTile)),
          h("div", { key: "graphs", className: "mini-graph-grid service-graph-grid" }, [
            h(ChartCard, {
              key: "serviceCluster",
              title: "Service cluster intensity",
              subtitle: "Scaled reach across major delivery channels",
              config: serviceClusterConfig,
              className: "compact-graph-card",
              canvasHeight: 180
            }),
            h(ChartCard, {
              key: "commerceSplit",
              title: "Commerce split",
              subtitle: "Finance, education, retail, and service mix",
              config: commerceSplitConfig,
              className: "compact-graph-card",
              canvasHeight: 180
            }),
            h(ChartCard, {
              key: "deliveryMix",
              title: "Citizen delivery intensity",
              subtitle: "How service access holds across the visible stack",
              config: deliveryMixConfig,
              className: "compact-graph-card",
              canvasHeight: 180
            }),
            h(ChartCard, {
              key: "digitalReach",
              title: "Digital access buildout",
              subtitle: "ONDC, quick-commerce, classrooms, and public desks",
              config: digitalReachConfig,
              className: "compact-graph-card",
              canvasHeight: 180
            })
          ])
        ]),
        h(AirQualitySection, {
          key: "aqi",
          compact: true,
          eyebrow: "Analytics AQI",
          title: "Live AQI comparison now sits beside prices, schemes, and services for a fuller district analytics narrative",
          description:
            "Air-quality visibility keeps the analytics layer grounded in real environmental context while the rest of the page focuses on markets, benefits, and service readiness."
        })
      ])
    ])
  ]);
};

export default AnalyticsPage;
