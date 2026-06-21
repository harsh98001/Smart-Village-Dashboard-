const indiaStateDirectory = [
  {
    state: "Andhra Pradesh",
    capital: "Amaravati",
    aliases: ["Andhra"],
    featuredPlaces: [
      { name: "Visakhapatnam", aliases: ["Vizag"] },
      { name: "Vijayawada", aliases: [] }
    ]
  },
  {
    state: "Arunachal Pradesh",
    capital: "Itanagar",
    aliases: [],
    featuredPlaces: [{ name: "Tawang", aliases: [] }]
  },
  {
    state: "Assam",
    capital: "Dispur",
    aliases: [],
    featuredPlaces: [
      { name: "Guwahati", aliases: [] },
      { name: "Jorhat", aliases: [] }
    ]
  },
  {
    state: "Bihar",
    capital: "Patna",
    aliases: [],
    featuredPlaces: [{ name: "Gaya", aliases: [] }]
  },
  {
    state: "Chhattisgarh",
    capital: "Raipur",
    aliases: [],
    featuredPlaces: [{ name: "Bilaspur", aliases: [] }]
  },
  {
    state: "Goa",
    capital: "Panaji",
    aliases: [],
    featuredPlaces: [{ name: "Margao", aliases: [] }]
  },
  {
    state: "Gujarat",
    capital: "Gandhinagar",
    aliases: [],
    featuredPlaces: [
      { name: "Ahmedabad", aliases: [] },
      { name: "Surat", aliases: [] }
    ]
  },
  {
    state: "Haryana",
    capital: "Chandigarh",
    aliases: [],
    featuredPlaces: [{ name: "Gurugram", aliases: ["Gurgaon"] }]
  },
  {
    state: "Himachal Pradesh",
    capital: "Shimla",
    aliases: [],
    featuredPlaces: [
      { name: "Mandi", aliases: [] },
      { name: "Dharamshala", aliases: ["Dharamsala"] }
    ]
  },
  {
    state: "Jharkhand",
    capital: "Ranchi",
    aliases: [],
    featuredPlaces: [{ name: "Jamshedpur", aliases: [] }]
  },
  {
    state: "Karnataka",
    capital: "Bengaluru",
    aliases: ["Bangalore", "Karnataka"],
    featuredPlaces: [
      { name: "Mysuru", aliases: ["Mysore"] },
      { name: "Hubballi", aliases: ["Hubli"] }
    ]
  },
  {
    state: "Kerala",
    capital: "Thiruvananthapuram",
    aliases: ["Trivandrum"],
    featuredPlaces: [
      { name: "Kochi", aliases: ["Cochin"] },
      { name: "Kozhikode", aliases: ["Calicut"] }
    ]
  },
  {
    state: "Madhya Pradesh",
    capital: "Bhopal",
    aliases: [],
    featuredPlaces: [{ name: "Gwalior", aliases: [] }]
  },
  {
    state: "Maharashtra",
    capital: "Mumbai",
    aliases: ["Bombay"],
    featuredPlaces: [
      { name: "Nashik", aliases: ["Nasik"] },
      { name: "Pune", aliases: ["Poona"] }
    ]
  },
  {
    state: "Manipur",
    capital: "Imphal",
    aliases: [],
    featuredPlaces: [{ name: "Bishnupur", aliases: [] }]
  },
  {
    state: "Meghalaya",
    capital: "Shillong",
    aliases: [],
    featuredPlaces: [{ name: "Tura", aliases: [] }]
  },
  {
    state: "Mizoram",
    capital: "Aizawl",
    aliases: [],
    featuredPlaces: [{ name: "Lunglei", aliases: [] }]
  },
  {
    state: "Nagaland",
    capital: "Kohima",
    aliases: [],
    featuredPlaces: [{ name: "Dimapur", aliases: [] }]
  },
  {
    state: "Odisha",
    capital: "Bhubaneswar",
    aliases: ["Bhubaneshwar", "Orissa"],
    featuredPlaces: [{ name: "Puri", aliases: [] }]
  },
  {
    state: "Punjab",
    capital: "Chandigarh",
    aliases: [],
    featuredPlaces: [
      { name: "Amritsar", aliases: [] },
      { name: "Ludhiana", aliases: [] }
    ]
  },
  {
    state: "Rajasthan",
    capital: "Jaipur",
    aliases: [],
    featuredPlaces: [{ name: "Jodhpur", aliases: [] }]
  },
  {
    state: "Sikkim",
    capital: "Gangtok",
    aliases: [],
    featuredPlaces: [{ name: "Namchi", aliases: [] }]
  },
  {
    state: "Tamil Nadu",
    capital: "Chennai",
    aliases: ["Madras"],
    featuredPlaces: [
      { name: "Madurai", aliases: [] },
      { name: "Coimbatore", aliases: [] }
    ]
  },
  {
    state: "Telangana",
    capital: "Hyderabad",
    aliases: [],
    featuredPlaces: [{ name: "Warangal", aliases: [] }]
  },
  {
    state: "Tripura",
    capital: "Agartala",
    aliases: [],
    featuredPlaces: [{ name: "Udaipur", aliases: ["Tripura Udaipur"] }]
  },
  {
    state: "Uttarakhand",
    capital: "Dehradun",
    aliases: ["Uttaranchal"],
    featuredPlaces: [{ name: "Haridwar", aliases: [] }]
  },
  {
    state: "Uttar Pradesh",
    capital: "Lucknow",
    aliases: ["UP"],
    featuredPlaces: [
      { name: "Varanasi", aliases: ["Banaras", "Kashi"] },
      { name: "Noida", aliases: ["New Okhla Industrial Development Authority"] }
    ]
  },
  {
    state: "West Bengal",
    capital: "Kolkata",
    aliases: ["Calcutta"],
    featuredPlaces: [{ name: "Siliguri", aliases: [] }]
  }
];

const stateCapitalMap = new Map(
  indiaStateDirectory.map((entry) => [entry.state.toLowerCase(), entry.capital])
);

const normalizeText = (value) => String(value || "").trim().toLowerCase();
const splitTokens = (value) =>
  normalizeText(value)
    .split(/[\s,/()-]+/)
    .filter(Boolean);

const scoreField = (value, query) => {
  const normalizedValue = normalizeText(value);

  if (!normalizedValue || !query) {
    return -1;
  }

  if (normalizedValue === query) {
    return 120;
  }

  if (normalizedValue.startsWith(query)) {
    return 95;
  }

  const tokens = splitTokens(normalizedValue);
  if (tokens.includes(query)) {
    return 90;
  }

  if (tokens.some((token) => token.startsWith(query))) {
    return 78;
  }

  return -1;
};

const buildCatalogRecord = (entry, record, type) => {
  const isCapital = type === "State capital";

  return {
    id: `${type.toLowerCase().replace(/\s+/g, "-")}-${entry.state}-${record.name}`
      .toLowerCase()
      .replace(/[^a-z0-9-]/g, "-"),
    name: record.name,
    state: entry.state,
    capital: entry.capital,
    type,
    sourceLabel: "Official India directory",
    description: isCapital
      ? `Official capital for ${entry.state} in the India state directory.`
      : `Featured India search location in ${entry.state}.`,
    searchTags: [entry.state]
      .concat(isCapital ? [entry.capital] : [])
      .concat(entry.aliases || [])
      .concat(record.aliases || [])
  };
};

const catalogRecords = indiaStateDirectory
  .flatMap((entry) => {
    const capitalRecord = buildCatalogRecord(
      entry,
      { name: entry.capital, aliases: entry.aliases || [] },
      "State capital"
    );
    const featuredRecords = (entry.featuredPlaces || []).map((place) =>
      buildCatalogRecord(entry, place, "Featured city")
    );

    return [capitalRecord].concat(featuredRecords);
  })
  .sort((left, right) => {
    if (left.state === right.state) {
      return left.name.localeCompare(right.name);
    }

    return left.state.localeCompare(right.state);
  });

const searchCatalogRecords = ({ query = "", state = "", type = "" } = {}) => {
  const normalizedQuery = normalizeText(query);
  const normalizedState = normalizeText(state);
  const normalizedType = normalizeText(type);

  return catalogRecords
    .map((record) => {
      const matchesState =
        !normalizedState || normalizeText(record.state) === normalizedState;
      const matchesType =
        !normalizedType || normalizeText(record.type) === normalizedType;
      const score = !normalizedQuery
        ? 0
        : Math.max.apply(null, [
            scoreField(record.name, normalizedQuery),
            scoreField(record.state, normalizedQuery),
            scoreField(record.capital, normalizedQuery),
            scoreField(record.description, normalizedQuery)
          ].concat((record.searchTags || []).map((tag) => scoreField(tag, normalizedQuery))));

      return {
        record,
        matchesState,
        matchesType,
        matchesQuery: !normalizedQuery || score >= 0,
        score
      };
    })
    .filter((entry) => entry.matchesState && entry.matchesType && entry.matchesQuery)
    .sort((left, right) => {
      if (right.score !== left.score) {
        return right.score - left.score;
      }

      if (left.record.type !== right.record.type) {
        return left.record.type === "State capital" ? -1 : 1;
      }

      if (left.record.state === right.record.state) {
        return left.record.name.localeCompare(right.record.name);
      }

      return left.record.state.localeCompare(right.record.state);
    })
    .map((entry) => entry.record);
};

const buildLiveLocationRecord = (result, query) => {
  const state = result.admin1 || "";
  const officialCapital = stateCapitalMap.get(normalizeText(state));
  const isCapital =
    officialCapital && normalizeText(officialCapital) === normalizeText(result.name);

  return {
    id: `live-${result.id || `${result.name}-${result.latitude}-${result.longitude}`}`,
    name: result.name,
    state,
    capital: officialCapital || "",
    type: isCapital ? "State capital" : "Live location",
    sourceLabel: "Live geocoding",
    description: isCapital
      ? `Live verified capital match for ${state}.`
      : `Live India location match for "${query}".`,
    district: result.admin2 || result.admin3 || result.admin4 || "",
    latitude: result.latitude,
    longitude: result.longitude,
    population: result.population || 0,
    timezone: result.timezone || "",
    featureCode: result.feature_code || "",
    searchTags: [result.country, result.admin1, result.admin2, result.admin3, result.admin4].filter(Boolean)
  };
};

module.exports = {
  indiaStateDirectory,
  catalogRecords,
  searchCatalogRecords,
  buildLiveLocationRecord
};
