const Village = require("../models/Village");
const Notification = require("../models/Notification");

const buildChartRows = (villages) => {
  const stateGroups = villages.reduce((accumulator, village) => {
    if (!accumulator[village.state]) {
      accumulator[village.state] = {
        state: village.state,
        growthIndex: 0,
        infrastructureScore: 0,
        count: 0
      };
    }

    accumulator[village.state].growthIndex += village.growthIndex;
    accumulator[village.state].infrastructureScore += village.infrastructureScore;
    accumulator[village.state].count += 1;
    return accumulator;
  }, {});

  return Object.values(stateGroups)
    .slice(0, 8)
    .map((item) => ({
      label: item.state,
      growth: Math.round(item.growthIndex / item.count),
      infrastructure: Math.round(item.infrastructureScore / item.count)
    }));
};

const getOverview = async (_req, res, next) => {
  try {
    const villages = await Village.find().lean();
    const notifications = await Notification.find().sort({ createdAt: -1 }).limit(5).lean();

    const totalVillages = villages.length;
    const totalPopulation = villages.reduce(
      (sum, village) => sum + (village.population || 0),
      0
    );
    const averageGrowth = Math.round(
      villages.reduce((sum, village) => sum + (village.growthIndex || 0), 0) /
        Math.max(totalVillages, 1)
    );
    const averageLiteracy = Math.round(
      villages.reduce((sum, village) => sum + (village.literacyRate || 0), 0) /
        Math.max(totalVillages, 1)
    );
    const renewableLeaderCount = villages.filter(
      (village) => village.renewableIndex >= 70
    ).length;

    const charts = buildChartRows(villages);

    res.json({
      success: true,
      overview: {
        totalVillages,
        totalPopulation,
        averageGrowth,
        averageLiteracy,
        renewableLeaderCount,
        topStates: charts,
        notifications
      }
    });
  } catch (error) {
    next(error);
  }
};

const getTrends = async (_req, res, next) => {
  try {
    const villages = await Village.find().lean();
    const timeline = ["Q1", "Q2", "Q3", "Q4"].map((quarter, index) => ({
      quarter,
      agriculture: 62 + index * 5,
      water: 56 + index * 6,
      electricity: 68 + index * 4,
      literacy: 70 + index * 3
    }));

    const sectorMix = [
      {
        label: "Agriculture",
        value: Math.round(
          villages.reduce((sum, village) => sum + village.irrigationCoverage, 0) /
            Math.max(villages.length, 1)
        )
      },
      {
        label: "Infrastructure",
        value: Math.round(
          villages.reduce((sum, village) => sum + village.infrastructureScore, 0) /
            Math.max(villages.length, 1)
        )
      },
      {
        label: "Health",
        value: Math.round(
          villages.reduce((sum, village) => sum + village.healthAccessScore, 0) /
            Math.max(villages.length, 1)
        )
      },
      {
        label: "Education",
        value: Math.round(
          villages.reduce((sum, village) => sum + village.educationScore, 0) /
            Math.max(villages.length, 1)
        )
      }
    ];

    res.json({
      success: true,
      trends: {
        timeline,
        sectorMix
      }
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getOverview,
  getTrends
};

