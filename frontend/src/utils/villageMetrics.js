export const getVillageCctvMetrics = (village, index = 0) => {
  const installed =
    village.cctvInstalled ?? Math.max(12, Math.round((village.population || 3600) / 340));
  const working =
    village.cctvWorking ?? Math.max(installed - ((index % 4) + 1), Math.round(installed * 0.7));
  const offline =
    village.cctvOffline ?? Math.max(installed - working, 0);
  const live =
    village.cctvLive ?? Math.max(working - (index % 3), Math.round(working * 0.72));

  return {
    installed,
    working,
    offline,
    live
  };
};

export const getCctvSummary = (villages = []) =>
  villages.reduce(
    (summary, village, index) => {
      const metrics = getVillageCctvMetrics(village, index);

      return {
        installed: summary.installed + metrics.installed,
        working: summary.working + metrics.working,
        offline: summary.offline + metrics.offline,
        live: summary.live + metrics.live
      };
    },
    {
      installed: 0,
      working: 0,
      offline: 0,
      live: 0
    }
  );

