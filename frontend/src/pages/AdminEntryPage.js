import React, { useState } from "react";
import { h } from "../utils/h";
import { useAuth } from "../context/AuthContext";
import { useData } from "../context/DataContext";
import { useToast } from "../context/ToastContext";
import PageBanner from "../components/layout/PageBanner";
import DataTable from "../components/ui/DataTable";
import { getCctvSummary, getVillageCctvMetrics } from "../utils/villageMetrics";

const createEmptyVillageForm = () => ({
  name: "",
  state: "",
  areaName: "",
  sector: "",
  description: "",
  searchTags: "",
  soilType: "",
  agricultureCrops: "",
  irrigation: "",
  waterLevel: 60,
  irrigationCoverage: 58,
  electricityStatus: "",
  roadCondition: "",
  technologyUsage: "",
  renewableIndex: 54,
  healthFacilities: "",
  educationFacilities: "",
  industries: "",
  literacyRate: 75,
  growthIndex: 72,
  infrastructureScore: 68,
  healthAccessScore: 66,
  educationScore: 72,
  population: 5000,
  households: 980,
  rainfall: 920,
  weatherCondition: "Sunny Intervals",
  weatherTemperature: 29,
  weatherHumidity: 62,
  weatherWind: 12,
  statusWater: "Progressing",
  statusElectricity: "Reliable",
  statusInfrastructure: "Upgrading",
  statusLiteracy: "Strong",
  cctvInstalled: 24,
  cctvWorking: 20,
  cctvOffline: 4,
  cctvLive: 16,
  highlights: "",
  searchDashboardIntro: "",
  soilIntelligenceSource: "Dashboard linked",
  soilIntelligenceValue: "",
  soilIntelligenceDescription: "",
  waterSupplySource: "Dashboard linked",
  waterSupplyValue: "",
  waterSupplyDescription: "",
  wasteManagementSource: "Admin feed pending",
  wasteManagementValue: "",
  wasteManagementDescription: "",
  environmentalSensorsSource: "Admin feed pending",
  environmentalSensorsValue: "",
  environmentalSensorsDescription: "",
  smartDairySource: "Admin feed pending",
  smartDairyValue: "",
  smartDairyDescription: "",
  digitalClassroomsSource: "Admin feed pending",
  digitalClassroomsValue: "",
  digitalClassroomsDescription: "",
  interactiveMapsSource: "Dashboard linked",
  interactiveMapsValue: "",
  interactiveMapsDescription: "",
  interactiveMapsActionLabel: "Open map",
  interactiveMapsUrl: ""
});

const fieldLabels = {
  name: "Village / Place Name",
  state: "State",
  areaName: "Area Name",
  sector: "Sector",
  description: "Profile Description",
  searchTags: "Search Tags",
  soilType: "Soil Type",
  agricultureCrops: "Agriculture & Crops",
  irrigation: "Irrigation",
  waterLevel: "Water Level (%)",
  irrigationCoverage: "Irrigation Coverage (%)",
  electricityStatus: "Electricity Status",
  roadCondition: "Road Condition",
  technologyUsage: "Technology Usage",
  renewableIndex: "Renewable Index",
  healthFacilities: "Health Facilities",
  educationFacilities: "Education Facilities",
  industries: "Industries",
  literacyRate: "Literacy Rate (%)",
  growthIndex: "Growth Index",
  infrastructureScore: "Infrastructure Score",
  healthAccessScore: "Health Access Score",
  educationScore: "Education Score",
  population: "Population",
  households: "Households",
  rainfall: "Rainfall (mm)",
  weatherCondition: "Weather Condition",
  weatherTemperature: "Weather Temperature",
  weatherHumidity: "Weather Humidity",
  weatherWind: "Weather Wind",
  statusWater: "Water Badge",
  statusElectricity: "Electricity Badge",
  statusInfrastructure: "Infrastructure Badge",
  statusLiteracy: "Literacy Badge",
  cctvInstalled: "CCTV Installed",
  cctvWorking: "CCTV Working",
  cctvOffline: "CCTV Offline",
  cctvLive: "CCTV Live Running",
  highlights: "Highlights",
  searchDashboardIntro: "Selected Place Intro",
  soilIntelligenceSource: "Soil Card Source",
  soilIntelligenceValue: "Soil Card Value",
  soilIntelligenceDescription: "Soil Card Description",
  waterSupplySource: "Water Card Source",
  waterSupplyValue: "Water Card Value",
  waterSupplyDescription: "Water Card Description",
  wasteManagementSource: "Waste Card Source",
  wasteManagementValue: "Waste Card Value",
  wasteManagementDescription: "Waste Card Description",
  environmentalSensorsSource: "Sensors Card Source",
  environmentalSensorsValue: "Sensors Card Value",
  environmentalSensorsDescription: "Sensors Card Description",
  smartDairySource: "Smart Dairy Card Source",
  smartDairyValue: "Smart Dairy Card Value",
  smartDairyDescription: "Smart Dairy Card Description",
  digitalClassroomsSource: "Classrooms Card Source",
  digitalClassroomsValue: "Classrooms Card Value",
  digitalClassroomsDescription: "Classrooms Card Description",
  interactiveMapsSource: "Maps Card Source",
  interactiveMapsValue: "Maps Card Value",
  interactiveMapsDescription: "Maps Card Description",
  interactiveMapsActionLabel: "Maps Button Label",
  interactiveMapsUrl: "Maps URL"
};

const numericFields = new Set([
  "waterLevel",
  "irrigationCoverage",
  "renewableIndex",
  "literacyRate",
  "growthIndex",
  "infrastructureScore",
  "healthAccessScore",
  "educationScore",
  "population",
  "households",
  "rainfall",
  "weatherTemperature",
  "weatherHumidity",
  "weatherWind",
  "cctvInstalled",
  "cctvWorking",
  "cctvOffline",
  "cctvLive"
]);

const buildField = (name, overrides = {}) => ({
  name,
  label: fieldLabels[name],
  type: numericFields.has(name) ? "number" : "text",
  ...overrides
});

const adminSections = [
  {
    id: "identity",
    tone: "milk",
    title: "Identity & Search Discovery",
    description: "Control how each village appears across search, detail pages, and governance storytelling.",
    fields: [
      buildField("name"),
      buildField("state"),
      buildField("areaName"),
      buildField("sector"),
      buildField("description", { type: "textarea", rows: 4, fullWidth: true }),
      buildField("searchTags", {
        type: "textarea",
        rows: 3,
        fullWidth: true,
        helper: "Use comma-separated aliases like Patna City, Bihta, Bihar capital."
      }),
      buildField("highlights", {
        type: "textarea",
        rows: 3,
        fullWidth: true,
        helper: "Use comma-separated highlights for spotlight cards and summaries."
      })
    ]
  },
  {
    id: "utilities",
    tone: "kesar",
    title: "Agriculture, Utilities & Economy",
    description: "Edit the core resource, road, power, and crop systems that drive the main dashboard.",
    fields: [
      buildField("soilType"),
      buildField("irrigation"),
      buildField("waterLevel"),
      buildField("irrigationCoverage"),
      buildField("electricityStatus"),
      buildField("roadCondition"),
      buildField("technologyUsage"),
      buildField("renewableIndex"),
      buildField("agricultureCrops", {
        type: "textarea",
        rows: 3,
        fullWidth: true,
        helper: "Use comma-separated crop names."
      }),
      buildField("industries", {
        type: "textarea",
        rows: 3,
        fullWidth: true,
        helper: "Use comma-separated industries or local value-chain signals."
      })
    ]
  },
  {
    id: "development",
    tone: "cream",
    title: "Human Development & Service Reach",
    description: "Manage health, education, population, and score-based indicators for the village profile.",
    fields: [
      buildField("healthFacilities", {
        type: "textarea",
        rows: 3,
        fullWidth: true
      }),
      buildField("educationFacilities", {
        type: "textarea",
        rows: 3,
        fullWidth: true
      }),
      buildField("literacyRate"),
      buildField("growthIndex"),
      buildField("infrastructureScore"),
      buildField("healthAccessScore"),
      buildField("educationScore"),
      buildField("population"),
      buildField("households"),
      buildField("rainfall")
    ]
  },
  {
    id: "ops",
    tone: "maroon",
    title: "Weather, Status Badges & CCTV",
    description: "Tune monitoring, village weather, badge labels, and CCTV operations from one section.",
    fields: [
      buildField("weatherCondition"),
      buildField("weatherTemperature"),
      buildField("weatherHumidity"),
      buildField("weatherWind"),
      buildField("statusWater"),
      buildField("statusElectricity"),
      buildField("statusInfrastructure"),
      buildField("statusLiteracy"),
      buildField("cctvInstalled"),
      buildField("cctvWorking"),
      buildField("cctvOffline"),
      buildField("cctvLive")
    ]
  },
  {
    id: "search-intro",
    tone: "sky",
    title: "Selected Place Intro",
    description: "This text appears at the top of the selected-place dashboard on the Search page.",
    fields: [
      buildField("searchDashboardIntro", {
        type: "textarea",
        rows: 4,
        fullWidth: true
      })
    ]
  },
  {
    id: "search-core",
    tone: "milk",
    title: "Search Dashboard Cards: Soil & Water",
    description: "These values power the first smart-governance cards shown after a place is selected.",
    fields: [
      buildField("soilIntelligenceSource"),
      buildField("soilIntelligenceValue"),
      buildField("soilIntelligenceDescription", {
        type: "textarea",
        rows: 3,
        fullWidth: true
      }),
      buildField("waterSupplySource"),
      buildField("waterSupplyValue"),
      buildField("waterSupplyDescription", {
        type: "textarea",
        rows: 3,
        fullWidth: true
      })
    ]
  },
  {
    id: "search-ops",
    tone: "kesar",
    title: "Search Dashboard Cards: Waste, Sensors & Dairy",
    description: "Use these fields to replace placeholder text with your own municipal and sector details.",
    fields: [
      buildField("wasteManagementSource"),
      buildField("wasteManagementValue"),
      buildField("wasteManagementDescription", {
        type: "textarea",
        rows: 3,
        fullWidth: true
      }),
      buildField("environmentalSensorsSource"),
      buildField("environmentalSensorsValue"),
      buildField("environmentalSensorsDescription", {
        type: "textarea",
        rows: 3,
        fullWidth: true
      }),
      buildField("smartDairySource"),
      buildField("smartDairyValue"),
      buildField("smartDairyDescription", {
        type: "textarea",
        rows: 3,
        fullWidth: true
      })
    ]
  },
  {
    id: "search-edu",
    tone: "cream",
    title: "Search Dashboard Cards: Classrooms & Maps",
    description: "Finalize the civic storytelling layer for the selected place dashboard and map actions.",
    fields: [
      buildField("digitalClassroomsSource"),
      buildField("digitalClassroomsValue"),
      buildField("digitalClassroomsDescription", {
        type: "textarea",
        rows: 3,
        fullWidth: true
      }),
      buildField("interactiveMapsSource"),
      buildField("interactiveMapsValue"),
      buildField("interactiveMapsActionLabel"),
      buildField("interactiveMapsUrl"),
      buildField("interactiveMapsDescription", {
        type: "textarea",
        rows: 3,
        fullWidth: true
      })
    ]
  }
];

const parseList = (value) =>
  String(value || "")
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);

const joinList = (value) => (Array.isArray(value) ? value.join(", ") : "");

const toNumber = (value, fallback = 0) => {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
};

const normalizeVillagePayload = (formState) => {
  const {
    agricultureCrops,
    healthFacilities,
    educationFacilities,
    industries,
    searchTags,
    highlights,
    weatherCondition,
    weatherTemperature,
    weatherHumidity,
    weatherWind,
    statusWater,
    statusElectricity,
    statusInfrastructure,
    statusLiteracy,
    ...rest
  } = formState;

  const payload = {
    ...rest,
    agricultureCrops: parseList(agricultureCrops),
    healthFacilities: parseList(healthFacilities),
    educationFacilities: parseList(educationFacilities),
    industries: parseList(industries),
    searchTags: parseList(searchTags),
    highlights: parseList(highlights),
    weather: {
      condition: weatherCondition,
      temperature: toNumber(weatherTemperature, 29),
      humidity: toNumber(weatherHumidity, 62),
      wind: toNumber(weatherWind, 12)
    },
    status: {
      water: statusWater,
      electricity: statusElectricity,
      infrastructure: statusInfrastructure,
      literacy: statusLiteracy
    }
  };

  numericFields.forEach((field) => {
    payload[field] = toNumber(payload[field], createEmptyVillageForm()[field]);
  });

  return payload;
};

const denormalizeVillage = (village) => {
  const base = createEmptyVillageForm();
  const { weather = {}, status = {}, ...rest } = village;

  return {
    ...base,
    ...rest,
    agricultureCrops: joinList(village.agricultureCrops),
    healthFacilities: joinList(village.healthFacilities),
    educationFacilities: joinList(village.educationFacilities),
    industries: joinList(village.industries),
    searchTags: joinList(village.searchTags),
    highlights: joinList(village.highlights),
    weatherCondition: weather.condition ?? base.weatherCondition,
    weatherTemperature: weather.temperature ?? base.weatherTemperature,
    weatherHumidity: weather.humidity ?? base.weatherHumidity,
    weatherWind: weather.wind ?? base.weatherWind,
    statusWater: status.water ?? base.statusWater,
    statusElectricity: status.electricity ?? base.statusElectricity,
    statusInfrastructure: status.infrastructure ?? base.statusInfrastructure,
    statusLiteracy: status.literacy ?? base.statusLiteracy,
    ...getVillageCctvMetrics(village)
  };
};

const AdminEntryPage = () => {
  const { user, isAdmin } = useAuth();
  const { villages, saveVillage, removeVillage } = useData();
  const { pushToast } = useToast();
  const [formState, setFormState] = useState(createEmptyVillageForm());
  const [editingVillage, setEditingVillage] = useState(null);
  const [selectedVillageId, setSelectedVillageId] = useState("");

  const sortedVillages = [...villages].sort((left, right) => {
    if (left.state === right.state) {
      return left.name.localeCompare(right.name);
    }

    return left.state.localeCompare(right.state);
  });

  const cctvSummary = getCctvSummary(villages);
  const totalVillages = villages.length;
  const averageGrowth = totalVillages
    ? Math.round(villages.reduce((sum, village) => sum + (village.growthIndex || 0), 0) / totalVillages)
    : 0;
  const averageWater = totalVillages
    ? Math.round(villages.reduce((sum, village) => sum + (village.waterLevel || 0), 0) / totalVillages)
    : 0;
  const previewModules = [
    {
      key: "soil",
      title: "Soil",
      value: formState.soilIntelligenceValue || formState.soilType || "Pending",
      source: formState.soilIntelligenceSource || "Dashboard linked"
    },
    {
      key: "water",
      title: "Water",
      value: formState.waterSupplyValue || `${formState.waterLevel || 0}% coverage`,
      source: formState.waterSupplySource || "Dashboard linked"
    },
    {
      key: "waste",
      title: "Waste",
      value: formState.wasteManagementValue || "Pending",
      source: formState.wasteManagementSource || "Admin feed pending"
    },
    {
      key: "dairy",
      title: "Dairy",
      value: formState.smartDairyValue || "Pending",
      source: formState.smartDairySource || "Admin feed pending"
    }
  ];
  const publishSurfaces = [
    {
      key: "landing",
      title: "Landing + cards",
      note: formState.highlights ? "Highlights and summary cards ready" : "Add highlights for richer landing cards",
      status: formState.description ? "Synced" : "Needs copy"
    },
    {
      key: "search",
      title: "Search dashboard",
      note: formState.searchDashboardIntro || "Add selected-place intro and module values",
      status: formState.searchDashboardIntro ? "Live after save" : "Draft intro"
    },
    {
      key: "analytics",
      title: "Analytics + growth",
      note: `${formState.growthIndex || 0}% growth and ${formState.waterLevel || 0}% water are already connected`,
      status: "Metric ready"
    },
    {
      key: "detail",
      title: "Village detail view",
      note: formState.areaName || "Area name pending",
      status: formState.areaName ? "Profile linked" : "Needs area"
    }
  ];

  const resetForm = () => {
    setEditingVillage(null);
    setSelectedVillageId("");
    setFormState(createEmptyVillageForm());
  };

  const startEdit = (village) => {
    setEditingVillage(village);
    setSelectedVillageId(String(village._id));
    setFormState(denormalizeVillage(village));
  };

  const handleFieldChange = (field, value) => {
    setFormState({
      ...formState,
      [field]: value
    });
  };

  const handleVillageSelect = (value) => {
    setSelectedVillageId(value);

    if (!value) {
      resetForm();
      return;
    }

    const village = villages.find((item) => String(item._id) === String(value));
    if (village) {
      startEdit(village);
    }
  };

  const submitVillage = async (event) => {
    event.preventDefault();

    try {
      const savedVillage = await saveVillage(normalizeVillagePayload(formState));
      startEdit(savedVillage);
      pushToast({
        title: editingVillage ? "Village updated" : "Village created",
        message: "Admin governance data refreshed instantly.",
        variant: "success"
      });
    } catch (error) {
      pushToast({
        title: "Save failed",
        message: error.response?.data?.message || "Unable to save village data.",
        variant: "danger"
      });
    }
  };

  const handleDelete = async (id) => {
    try {
      await removeVillage(id);

      if (String(editingVillage?._id) === String(id)) {
        resetForm();
      }

      pushToast({
        title: "Village removed",
        message: "The record was deleted successfully.",
        variant: "success"
      });
    } catch (error) {
      pushToast({
        title: "Delete failed",
        message: error.response?.data?.message || "Unable to remove the village.",
        variant: "danger"
      });
    }
  };

  const renderFieldControl = (field) => {
    const commonProps = {
      className: `form-control admin-form-field${field.type === "textarea" ? " admin-form-textarea" : ""}`,
      placeholder: field.label,
      value: formState[field.name] ?? "",
      onChange: (event) => handleFieldChange(field.name, event.target.value)
    };

    if (field.type === "textarea") {
      return h("textarea", {
        ...commonProps,
        rows: field.rows || 3
      });
    }

    return h("input", {
      ...commonProps,
      type: field.type || "text"
    });
  };

  if (!isAdmin) {
    return h("div", null, [
      h(PageBanner, { key: "banner", chips: ["Admin only"] }),
      h("div", { key: "container", className: "container py-5" }, [
        h("div", { key: "card", className: "premium-card access-card" }, [
          h("h2", { key: "title", className: "section-heading" }, "Administrator access required"),
          h(
            "p",
            { key: "text", className: "section-description" },
            "Only admins can add or edit village records, publish alerts, and manage core dashboard intelligence."
          )
        ])
      ])
    ]);
  }

  return h("div", null, [
    h(PageBanner, {
      key: "banner",
      chips: ["Admin governance studio", "Full data editing", "Keshar milkshake console"]
    }),
    h("section", { key: "body", className: "admin-page-section" }, [
      h("div", { key: "container", className: "container admin-grid" }, [
        h("div", { key: "formCard", className: "premium-card admin-form-card admin-kesar-shell" }, [
          h("div", { key: "top", className: "admin-console-top" }, [
            h("div", { key: "copy", className: "admin-console-copy" }, [
              h("span", { key: "eyebrow", className: "section-eyebrow" }, "Admin Governance Studio"),
              h("h3", { key: "title", className: "section-heading" }, "Full village intelligence editor"),
              h(
                "p",
                { key: "description", className: "section-description" },
                "Every major village, monitoring, and search-dashboard field can now be edited from this single admin page. Update the record, save it, and the Search dashboard will reflect the new copy instantly."
              )
            ]),
            h("div", { key: "controls", className: "admin-console-controls" }, [
              h("div", { key: "picker", className: "admin-record-picker" }, [
                h("label", { key: "label", className: "admin-input-label" }, "Load existing village"),
                h(
                  "select",
                  {
                    key: "select",
                    className: "form-select admin-record-select",
                    value: selectedVillageId,
                    onChange: (event) => handleVillageSelect(event.target.value)
                  },
                  [h("option", { key: "new", value: "" }, "Create new record")].concat(
                    sortedVillages.map((village) =>
                      h(
                        "option",
                        {
                          key: village._id,
                          value: village._id
                        },
                        `${village.name} - ${village.state}`
                      )
                    )
                  )
                )
              ]),
              h("div", { key: "actions", className: "admin-console-actions" }, [
                h(
                  "button",
                  {
                    key: "new",
                    type: "button",
                    className: "btn btn-outline-smart admin-reset-button",
                    onClick: resetForm
                  },
                  editingVillage ? "Start New Record" : "Clear Form"
                ),
                editingVillage
                  ? h(
                      "span",
                      {
                        key: "editing",
                        className: "admin-editing-pill"
                      },
                      `Editing ${editingVillage.name}`
                    )
                  : null
              ])
            ])
          ]),
          h("div", { key: "overview", className: "admin-overview-strip" }, [
            h("div", { key: "villageCount", className: "admin-overview-card" }, [
              h("span", { key: "label", className: "admin-overview-label" }, "Managed villages"),
              h("strong", { key: "value" }, String(totalVillages))
            ]),
            h("div", { key: "growth", className: "admin-overview-card" }, [
              h("span", { key: "label", className: "admin-overview-label" }, "Average growth"),
              h("strong", { key: "value" }, `${averageGrowth}%`)
            ]),
            h("div", { key: "water", className: "admin-overview-card" }, [
              h("span", { key: "label", className: "admin-overview-label" }, "Average water"),
              h("strong", { key: "value" }, `${averageWater}%`)
            ]),
            h("div", { key: "cctv", className: "admin-overview-card" }, [
              h("span", { key: "label", className: "admin-overview-label" }, "Live CCTV"),
              h("strong", { key: "value" }, String(cctvSummary.live))
            ])
          ]),
          h(
            "form",
            {
              key: "form",
              className: "admin-form-grid",
              onSubmit: submitVillage
            },
            adminSections
              .map((section) =>
                h(
                  "section",
                  {
                    key: section.id,
                    className: `admin-section-card tone-${section.tone}`
                  },
                  [
                    h("div", { key: "head", className: "admin-section-header" }, [
                      h("div", { key: "copy", className: "admin-section-copy" }, [
                        h("span", { key: "kicker", className: "admin-section-kicker" }, section.title),
                        h("h4", { key: "title", className: "admin-field-group-title" }, section.title),
                        h("p", { key: "desc", className: "admin-section-description" }, section.description)
                      ])
                    ]),
                    h(
                      "div",
                      { key: "grid", className: "admin-form-section-grid" },
                      section.fields.map((field) =>
                        h(
                          "div",
                          {
                            key: field.name,
                            className: `admin-input-wrap${field.fullWidth ? " span-2" : ""}`
                          },
                          [
                            h("label", { key: "label", className: "admin-input-label" }, field.label),
                            renderFieldControl(field),
                            field.helper
                              ? h("span", { key: "helper", className: "admin-input-helper" }, field.helper)
                              : null
                          ]
                        )
                      )
                    )
                  ]
                )
              )
              .concat([
                h(
                  "div",
                  {
                    key: "actions",
                    className: "admin-form-actions admin-submit-row"
                  },
                  [
                    h(
                      "button",
                      {
                        key: "submit",
                        type: "submit",
                        className: "btn btn-smart-primary"
                      },
                      editingVillage ? "Save Village Changes" : "Create Village Record"
                    ),
                    h(
                      "button",
                      {
                        key: "reset",
                        type: "button",
                        className: "btn btn-outline-smart",
                        onClick: resetForm
                      },
                      editingVillage ? "Cancel Edit" : "Reset"
                    )
                  ]
                )
              ])
          )
        ]),
        h("div", { key: "side", className: "admin-side-stack" }, [
          h("div", { key: "profile", className: "premium-card admin-side-card admin-profile-card" }, [
            h("span", { key: "eyebrow", className: "section-eyebrow" }, "District Admin Profile"),
            h("div", { key: "head", className: "admin-profile-head" }, [
              h("div", { key: "avatar", className: "admin-profile-avatar" }, [
                h("span", { key: "initials" }, (user?.name || "DA").split(" ").map((part) => part[0]).join("").slice(0, 2).toUpperCase())
              ]),
              h("div", { key: "copy", className: "admin-profile-copy" }, [
                h("h3", { key: "name", className: "table-title" }, user?.name || "District Admin"),
                h("p", { key: "role", className: "section-description" }, user?.designation || "Smart Governance Officer")
              ])
            ]),
            h("div", { key: "chips", className: "page-banner-chips admin-profile-chips" }, [
              h("span", { key: "role", className: "page-chip" }, user?.role === "admin" ? "Administrator" : "User"),
              h("span", { key: "state", className: "page-chip" }, user?.state || "India"),
              h("span", { key: "scope", className: "page-chip" }, "Full site publishing")
            ]),
            h("div", { key: "authority", className: "admin-profile-grid" }, [
              h("div", { key: "email", className: "admin-profile-metric" }, [
                h("span", { key: "label", className: "admin-profile-label" }, "Email"),
                h("strong", { key: "value" }, user?.email || "admin@smartvillage.in")
              ]),
              h("div", { key: "villages", className: "admin-profile-metric" }, [
                h("span", { key: "label", className: "admin-profile-label" }, "Editable villages"),
                h("strong", { key: "value" }, String(totalVillages))
              ]),
              h("div", { key: "site", className: "admin-profile-metric" }, [
                h("span", { key: "label", className: "admin-profile-label" }, "Search sync"),
                h("strong", { key: "value" }, "Live after save")
              ]),
              h("div", { key: "records", className: "admin-profile-metric" }, [
                h("span", { key: "label", className: "admin-profile-label" }, "Current record"),
                h("strong", { key: "value" }, editingVillage?.name || "New village draft")
              ])
            ])
          ]),
          h("div", { key: "brief", className: "premium-card admin-side-card admin-brief-card" }, [
            h("span", { key: "eyebrow", className: "section-eyebrow" }, "What This Page Controls"),
            h("h3", { key: "title", className: "table-title" }, "Admin impact map"),
            h("div", { key: "items", className: "admin-note-list" }, [
              h("div", { key: "n1", className: "admin-note-item" }, "Landing, detail, analytics, and growth modules consume these saved village values."),
              h("div", { key: "n2", className: "admin-note-item" }, "Search dashboard intro, soil, water, waste, sensors, dairy, classrooms, and maps are now admin-managed."),
              h("div", { key: "n3", className: "admin-note-item" }, "Use search tags and highlights to improve discoverability and presentation quality.")
            ])
          ]),
          h("div", { key: "surfaces", className: "premium-card admin-side-card admin-surface-card" }, [
            h("span", { key: "eyebrow", className: "section-eyebrow" }, "Whole Site Publishing"),
            h("h3", { key: "title", className: "table-title" }, "Where this record will appear"),
            h(
              "p",
              { key: "text", className: "section-description" },
              "Save once here and the same record can power Search, landing cards, analytics, growth, and village detail views."
            ),
            h(
              "div",
              { key: "list", className: "admin-surface-list" },
              publishSurfaces.map((surface) =>
                h("div", { key: surface.key, className: "admin-surface-item" }, [
                  h("div", { key: "copy", className: "admin-surface-copy" }, [
                    h("strong", { key: "title" }, surface.title),
                    h("span", { key: "note", className: "admin-surface-note" }, surface.note)
                  ]),
                  h("span", { key: "status", className: "admin-surface-state" }, surface.status)
                ])
              )
            )
          ]),
          h("div", { key: "preview", className: "premium-card admin-side-card admin-preview-card" }, [
            h("span", { key: "eyebrow", className: "section-eyebrow" }, "Live Site Preview"),
            h("h3", { key: "title", className: "table-title" }, `${formState.name || "Selected Place"} preview`),
            h(
              "p",
              { key: "text", className: "section-description" },
              "These values are the same ones the Search selected-place dashboard will show after you save this record."
            ),
            h("div", { key: "intro", className: "admin-preview-intro" }, formState.searchDashboardIntro || formState.description || "Add a search dashboard intro from the form to preview it here."),
            h(
              "div",
              { key: "moduleGrid", className: "admin-preview-module-grid" },
              previewModules.map((module) =>
                h("div", { key: module.key, className: "admin-preview-module" }, [
                  h("span", { key: "source", className: "admin-preview-source" }, module.source),
                  h("strong", { key: "title" }, module.title),
                  h("span", { key: "value", className: "admin-preview-value" }, module.value)
                ])
              )
            ),
            h("div", { key: "cta", className: "admin-preview-footer" }, [
              h("span", { key: "note", className: "small-label" }, "Example: edit Patna here, save it, then search Patna to see the updated dashboard.")
            ])
          ]),
          h("div", { key: "visualCard", className: "premium-card admin-side-card" }, [
            h("h3", { key: "title", className: "table-title" }, "Admin visual slot"),
            h("div", { key: "image", className: "admin-image-slot public-image-frame" }, [
              h("img", {
                key: "visual",
                src: "/images/admin/admin-monitoring.jpg",
                alt: "Admin monitoring visual",
                className: "public-image",
                onError: (event) => {
                  event.currentTarget.parentElement?.classList.add("is-missing");
                }
              }),
              h(
                "span",
                { key: "note", className: "media-fallback" },
                "Add /images/admin/admin-monitoring.jpg"
              )
            ])
          ]),
          h("div", { key: "tableCard", className: "premium-card section-table-card admin-table-card" }, [
            h("h3", { key: "title", className: "table-title" }, "Managed villages"),
            h(DataTable, {
              key: "table",
              records: sortedVillages,
              columns: [
                { key: "name", label: "Village" },
                { key: "state", label: "State" },
                { key: "areaName", label: "Area" },
                {
                  key: "growthIndex",
                  label: "Growth",
                  render: (record) => `${record.growthIndex}%`
                },
                {
                  key: "cctvLive",
                  label: "Live CCTV",
                  render: (record) => getVillageCctvMetrics(record).live
                },
                {
                  key: "actions",
                  label: "Actions",
                  render: (record) =>
                    h("div", { className: "table-actions" }, [
                      h(
                        "button",
                        {
                          key: "edit",
                          type: "button",
                          className: "btn btn-sm btn-light",
                          onClick: () => startEdit(record)
                        },
                        "Edit"
                      ),
                      h(
                        "button",
                        {
                          key: "delete",
                          type: "button",
                          className: "btn btn-sm btn-outline-danger",
                          onClick: () => handleDelete(record._id)
                        },
                        "Delete"
                      )
                    ])
                }
              ]
            })
          ])
        ])
      ])
    ])
  ]);
};

export default AdminEntryPage;
