import { sampleVillages, sampleNotifications } from "./sampleVillages";

export const buildOverviewFromVillages = (
  villages = sampleVillages,
  notifications = sampleNotifications
) => {
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

  const stateMap = villages.reduce((accumulator, village) => {
    if (!accumulator[village.state]) {
      accumulator[village.state] = {
        label: village.state,
        growth: 0,
        infrastructure: 0,
        count: 0
      };
    }

    accumulator[village.state].growth += village.growthIndex;
    accumulator[village.state].infrastructure += village.infrastructureScore;
    accumulator[village.state].count += 1;
    return accumulator;
  }, {});

  const topStates = Object.values(stateMap)
    .slice(0, 8)
    .map((item) => ({
      label: item.label,
      growth: Math.round(item.growth / item.count),
      infrastructure: Math.round(item.infrastructure / item.count)
    }));

  return {
    totalVillages,
    totalPopulation,
    averageGrowth,
    averageLiteracy,
    renewableLeaderCount: villages.filter((village) => village.renewableIndex >= 70).length,
    topStates,
    notifications: notifications.slice(0, 5)
  };
};

export const fallbackTrends = {
  timeline: ["Q1", "Q2", "Q3", "Q4"].map((quarter, index) => ({
    quarter,
    agriculture: 62 + index * 5,
    water: 56 + index * 6,
    electricity: 68 + index * 4,
    literacy: 70 + index * 3
  })),
  sectorMix: [
    { label: "Agriculture", value: 78 },
    { label: "Infrastructure", value: 71 },
    { label: "Health", value: 69 },
    { label: "Education", value: 75 }
  ]
};

