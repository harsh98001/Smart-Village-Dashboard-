const axios = require("axios");
const {
  indiaStateDirectory,
  catalogRecords,
  searchCatalogRecords,
  buildLiveLocationRecord
} = require("../data/indiaLocationCatalog");

const LIVE_SEARCH_TTL = 1000 * 60 * 30;
const liveSearchCache = new Map();

const dedupeRecords = (records) => {
  const seen = new Map();

  records.forEach((record) => {
    const key = `${String(record.name || "").toLowerCase()}::${String(record.state || "").toLowerCase()}`;
    if (!seen.has(key) || record.sourceLabel === "Live geocoding") {
      seen.set(key, record);
    }
  });

  return Array.from(seen.values());
};

const fetchLiveResults = async (query) => {
  const cacheKey = String(query || "").trim().toLowerCase();

  if (!cacheKey || cacheKey.length < 2) {
    return [];
  }

  const cached = liveSearchCache.get(cacheKey);
  if (cached && Date.now() - cached.timestamp < LIVE_SEARCH_TTL) {
    return cached.results;
  }

  const response = await axios.get("https://geocoding-api.open-meteo.com/v1/search", {
    params: {
      name: query,
      count: 15,
      language: "en",
      format: "json",
      countryCode: "IN"
    },
    timeout: 6000
  });

  const results = (response.data?.results || []).map((result) =>
    buildLiveLocationRecord(result, query)
  );

  liveSearchCache.set(cacheKey, {
    timestamp: Date.now(),
    results
  });

  return results;
};

const getLocationCatalog = async (_req, res, next) => {
  try {
    res.json({
      success: true,
      states: indiaStateDirectory.map((entry) => ({
        state: entry.state,
        capital: entry.capital
      })),
      types: ["State capital", "Featured city", "Live location"],
      records: catalogRecords
    });
  } catch (error) {
    next(error);
  }
};

const searchLocations = async (req, res, next) => {
  try {
    const query = String(req.query.q || "").trim();
    const state = String(req.query.state || "").trim();
    const type = String(req.query.type || "").trim();
    const limit = Math.min(Math.max(Number(req.query.limit || 40), 1), 100);

    const catalogMatches = searchCatalogRecords({ query, state, type });

    if (!query || query.length < 2) {
      res.json({
        success: true,
        usedLiveResults: false,
        source: "catalog",
        results: catalogMatches.slice(0, limit)
      });
      return;
    }

    try {
      const liveResults = await fetchLiveResults(query);
      const filteredLiveResults = liveResults.filter((record) => {
        const matchesState = !state || record.state === state;
        const matchesType = !type || record.type === type;
        return matchesState && matchesType;
      });

      const results = dedupeRecords(filteredLiveResults.concat(catalogMatches)).slice(0, limit);

      res.json({
        success: true,
        usedLiveResults: true,
        source: filteredLiveResults.length ? "live-and-catalog" : "catalog",
        results
      });
    } catch (_error) {
      res.json({
        success: true,
        usedLiveResults: false,
        source: "catalog-fallback",
        message: "Live location search is temporarily unavailable, so official directory results are shown.",
        results: catalogMatches.slice(0, limit)
      });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getLocationCatalog,
  searchLocations
};
