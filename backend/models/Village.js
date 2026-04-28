const mongoose = require("mongoose");

const villageSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    state: {
      type: String,
      required: true,
      trim: true
    },
    areaName: {
      type: String,
      required: true
    },
    sector: {
      type: String,
      default: "Integrated Rural Development"
    },
    description: {
      type: String,
      default: "Village profile under smart rural governance monitoring."
    },
    searchTags: [String],
    waterLevel: {
      type: Number,
      default: 65
    },
    soilType: {
      type: String,
      required: true
    },
    agricultureCrops: [String],
    irrigation: {
      type: String,
      default: "Canal and drip mix"
    },
    electricityStatus: {
      type: String,
      default: "Stable"
    },
    roadCondition: {
      type: String,
      default: "Improving"
    },
    healthFacilities: [String],
    educationFacilities: [String],
    industries: [String],
    technologyUsage: {
      type: String,
      default: "Medium adoption"
    },
    literacyRate: {
      type: Number,
      default: 76
    },
    growthIndex: {
      type: Number,
      default: 70
    },
    infrastructureScore: {
      type: Number,
      default: 68
    },
    renewableIndex: {
      type: Number,
      default: 52
    },
    cctvInstalled: {
      type: Number,
      default: 24
    },
    cctvWorking: {
      type: Number,
      default: 20
    },
    cctvOffline: {
      type: Number,
      default: 4
    },
    cctvLive: {
      type: Number,
      default: 16
    },
    irrigationCoverage: {
      type: Number,
      default: 58
    },
    healthAccessScore: {
      type: Number,
      default: 66
    },
    educationScore: {
      type: Number,
      default: 72
    },
    population: {
      type: Number,
      default: 5000
    },
    households: {
      type: Number,
      default: 980
    },
    rainfall: {
      type: Number,
      default: 920
    },
    weather: {
      condition: {
        type: String,
        default: "Sunny Intervals"
      },
      temperature: {
        type: Number,
        default: 29
      },
      humidity: {
        type: Number,
        default: 62
      },
      wind: {
        type: Number,
        default: 12
      }
    },
    status: {
      water: {
        type: String,
        default: "Progressing"
      },
      electricity: {
        type: String,
        default: "Reliable"
      },
      infrastructure: {
        type: String,
        default: "Upgrading"
      },
      literacy: {
        type: String,
        default: "Strong"
      }
    },
    highlights: [String],
    searchDashboardIntro: {
      type: String,
      default: ""
    },
    soilIntelligenceSource: {
      type: String,
      default: "Dashboard linked"
    },
    soilIntelligenceValue: {
      type: String,
      default: ""
    },
    soilIntelligenceDescription: {
      type: String,
      default: ""
    },
    waterSupplySource: {
      type: String,
      default: "Dashboard linked"
    },
    waterSupplyValue: {
      type: String,
      default: ""
    },
    waterSupplyDescription: {
      type: String,
      default: ""
    },
    wasteManagementSource: {
      type: String,
      default: "Admin feed pending"
    },
    wasteManagementValue: {
      type: String,
      default: ""
    },
    wasteManagementDescription: {
      type: String,
      default: ""
    },
    environmentalSensorsSource: {
      type: String,
      default: "Admin feed pending"
    },
    environmentalSensorsValue: {
      type: String,
      default: ""
    },
    environmentalSensorsDescription: {
      type: String,
      default: ""
    },
    smartDairySource: {
      type: String,
      default: "Admin feed pending"
    },
    smartDairyValue: {
      type: String,
      default: ""
    },
    smartDairyDescription: {
      type: String,
      default: ""
    },
    digitalClassroomsSource: {
      type: String,
      default: "Admin feed pending"
    },
    digitalClassroomsValue: {
      type: String,
      default: ""
    },
    digitalClassroomsDescription: {
      type: String,
      default: ""
    },
    interactiveMapsSource: {
      type: String,
      default: "Dashboard linked"
    },
    interactiveMapsValue: {
      type: String,
      default: ""
    },
    interactiveMapsDescription: {
      type: String,
      default: ""
    },
    interactiveMapsActionLabel: {
      type: String,
      default: "Open map"
    },
    interactiveMapsUrl: {
      type: String,
      default: ""
    },
    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Village", villageSchema);
