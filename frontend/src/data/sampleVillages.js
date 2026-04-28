const placeSeedIndex = [
  {
    name: "Amaravati",
    state: "Andhra Pradesh",
    areaName: "Amaravati Capital Region",
    type: "capital",
    focus: "capital planning, irrigation dashboards, and citizen service delivery",
    aliases: ["Vijayawada", "Guntur", "Andhra Pradesh capital"]
  },
  {
    name: "Itanagar",
    state: "Arunachal Pradesh",
    areaName: "Itanagar Capital Region",
    type: "capital",
    focus: "hill-area mobility, public health outreach, and renewable readiness",
    aliases: ["Naharlagun", "Arunachal Pradesh capital"]
  },
  {
    name: "Dispur",
    state: "Assam",
    areaName: "Dispur Administrative Belt",
    type: "capital",
    focus: "flood resilience planning, tea belt logistics, and service visibility",
    aliases: ["Guwahati", "Assam capital"]
  },
  {
    name: "Patna",
    state: "Bihar",
    areaName: "Patna Capital Region",
    type: "capital",
    focus: "river-linked infrastructure, education support, and health access",
    aliases: ["Patna City", "Bihta", "Bihar capital"]
  },
  {
    name: "Raipur",
    state: "Chhattisgarh",
    areaName: "Raipur Capital Region",
    type: "capital",
    focus: "rural enterprise corridors, health services, and power stability",
    aliases: ["Naya Raipur", "Atal Nagar", "Chhattisgarh capital"]
  },
  {
    name: "Panaji",
    state: "Goa",
    areaName: "Panaji Capital Region",
    type: "capital",
    focus: "tourism-linked services, coastal resilience, and civic infrastructure",
    aliases: ["Panjim", "Goa capital"]
  },
  {
    name: "Gandhinagar",
    state: "Gujarat",
    areaName: "Gandhinagar Capital Region",
    type: "capital",
    focus: "administrative efficiency, solar adoption, and water reuse systems",
    aliases: ["Ahmedabad corridor", "Gujarat capital"]
  },
  {
    name: "Chandigarh",
    state: "Haryana",
    areaName: "Chandigarh Administrative Link - Haryana",
    type: "capital",
    focus: "peri-urban mobility, public services, and agri-market connectivity",
    aliases: ["Panchkula", "Haryana capital"]
  },
  {
    name: "Shimla",
    state: "Himachal Pradesh",
    areaName: "Shimla Capital Region",
    type: "capital",
    focus: "mountain access roads, climate resilience, and tourism services",
    aliases: ["Himachal Pradesh capital", "Solan corridor"]
  },
  {
    name: "Ranchi",
    state: "Jharkhand",
    areaName: "Ranchi Capital Region",
    type: "capital",
    focus: "tribal development programmes, digital services, and logistics support",
    aliases: ["Namkum", "Jharkhand capital"]
  },
  {
    name: "Bengaluru",
    state: "Karnataka",
    areaName: "Bengaluru Capital Region",
    type: "capital",
    focus: "technology-enabled agriculture, mobility networks, and energy uptime",
    aliases: ["Bangalore", "Karnataka capital"]
  },
  {
    name: "Thiruvananthapuram",
    state: "Kerala",
    areaName: "Thiruvananthapuram Capital Region",
    type: "capital",
    focus: "public health services, literacy support, and water security",
    aliases: ["Trivandrum", "Kerala capital"]
  },
  {
    name: "Bhopal",
    state: "Madhya Pradesh",
    areaName: "Bhopal Capital Region",
    type: "capital",
    focus: "lake management, digital governance, and multimodal service delivery",
    aliases: ["MP capital", "Madhya Pradesh capital"]
  },
  {
    name: "Mumbai",
    state: "Maharashtra",
    areaName: "Mumbai Metropolitan Rural Interface",
    type: "capital",
    focus: "urban-rural logistics, coastal resilience, and service reliability",
    aliases: ["Bombay", "Maharashtra capital"]
  },
  {
    name: "Imphal",
    state: "Manipur",
    areaName: "Imphal Capital Region",
    type: "capital",
    focus: "border-area services, food systems, and digital outreach",
    aliases: ["Manipur capital", "Lamphel"]
  },
  {
    name: "Shillong",
    state: "Meghalaya",
    areaName: "Shillong Capital Region",
    type: "capital",
    focus: "rainfall management, tourism services, and public infrastructure",
    aliases: ["Meghalaya capital", "Mawlai"]
  },
  {
    name: "Aizawl",
    state: "Mizoram",
    areaName: "Aizawl Capital Region",
    type: "capital",
    focus: "hillside services, water retention, and citizen support systems",
    aliases: ["Mizoram capital", "Sairang corridor"]
  },
  {
    name: "Kohima",
    state: "Nagaland",
    areaName: "Kohima Capital Region",
    type: "capital",
    focus: "terrain-sensitive roads, public facilities, and local enterprise growth",
    aliases: ["Nagaland capital", "Dimapur link"]
  },
  {
    name: "Bhubaneswar",
    state: "Odisha",
    areaName: "Bhubaneswar Capital Region",
    type: "capital",
    focus: "disaster readiness, digital services, and civic infrastructure",
    aliases: ["Bhubaneshwar", "Odisha capital", "Cuttack"]
  },
  {
    name: "Chandigarh",
    state: "Punjab",
    areaName: "Chandigarh Administrative Link - Punjab",
    type: "capital",
    focus: "agri-procurement logistics, service reach, and regional connectivity",
    aliases: ["Mohali", "Punjab capital"]
  },
  {
    name: "Jaipur",
    state: "Rajasthan",
    areaName: "Jaipur Capital Region",
    type: "capital",
    focus: "water-smart planning, tourism corridors, and service digitisation",
    aliases: ["Rajasthan capital", "Amber belt"]
  },
  {
    name: "Gangtok",
    state: "Sikkim",
    areaName: "Gangtok Capital Region",
    type: "capital",
    focus: "mountain mobility, eco-tourism services, and green energy support",
    aliases: ["Sikkim capital", "Ranipool"]
  },
  {
    name: "Chennai",
    state: "Tamil Nadu",
    areaName: "Chennai Capital Region",
    type: "capital",
    focus: "coastal infrastructure, public health reach, and service uptime",
    aliases: ["Madras", "Tamil Nadu capital"]
  },
  {
    name: "Hyderabad",
    state: "Telangana",
    areaName: "Hyderabad Capital Region",
    type: "capital",
    focus: "technology-backed services, water grids, and urban-rural integration",
    aliases: ["Telangana capital", "Secunderabad"]
  },
  {
    name: "Agartala",
    state: "Tripura",
    areaName: "Agartala Capital Region",
    type: "capital",
    focus: "border trade services, mobility access, and digital governance",
    aliases: ["Tripura capital", "Udaipur Tripura"]
  },
  {
    name: "Dehradun",
    state: "Uttarakhand",
    areaName: "Dehradun Capital Region",
    type: "capital",
    focus: "hillside service access, emergency response, and learning infrastructure",
    aliases: ["Dehra Dun", "Uttarakhand capital"]
  },
  {
    name: "Lucknow",
    state: "Uttar Pradesh",
    areaName: "Lucknow Capital Region",
    type: "capital",
    focus: "large-scale public service coordination, irrigation, and health delivery",
    aliases: ["UP capital", "Uttar Pradesh capital"]
  },
  {
    name: "Kolkata",
    state: "West Bengal",
    areaName: "Kolkata Capital Region",
    type: "capital",
    focus: "riverfront governance, mobility systems, and utility performance",
    aliases: ["Calcutta", "West Bengal capital", "Howrah"]
  },
  {
    name: "Varanasi",
    state: "Uttar Pradesh",
    areaName: "Varanasi Cultural Growth Belt",
    type: "regional",
    focus: "heritage tourism, river-cleanup monitoring, and health services",
    aliases: ["Banaras", "Kashi"]
  },
  {
    name: "Mandi",
    state: "Himachal Pradesh",
    areaName: "Mandi Hill Services Belt",
    type: "regional",
    focus: "hill logistics, crop market access, and road monitoring",
    aliases: ["Sundernagar", "Kullu gateway"]
  },
  {
    name: "Mysuru",
    state: "Karnataka",
    areaName: "Mysuru Heritage Development Belt",
    type: "regional",
    focus: "tourism services, agri-processing, and water management",
    aliases: ["Mysore", "Mandya corridor"]
  },
  {
    name: "Nashik",
    state: "Maharashtra",
    areaName: "Nashik Vineyard Growth Belt",
    type: "regional",
    focus: "horticulture exports, irrigation coverage, and energy support",
    aliases: ["Nashik Road", "Trimbak belt"]
  },
  {
    name: "Surat",
    state: "Gujarat",
    areaName: "Surat Industrial Services Belt",
    type: "regional",
    focus: "industry-linked mobility, health support, and flood resilience",
    aliases: ["Hazira", "Diamond city"]
  },
  {
    name: "Gwalior",
    state: "Madhya Pradesh",
    areaName: "Gwalior Regional Growth Belt",
    type: "regional",
    focus: "education services, logistics access, and digital facilities",
    aliases: ["Morena corridor", "MP heritage belt"]
  },
  {
    name: "Jodhpur",
    state: "Rajasthan",
    areaName: "Jodhpur Desert Services Belt",
    type: "regional",
    focus: "desert water systems, solar readiness, and service outreach",
    aliases: ["Marwar", "Blue city"]
  },
  {
    name: "Kozhikode",
    state: "Kerala",
    areaName: "Kozhikode Coastal Services Belt",
    type: "regional",
    focus: "coastal health access, fisheries services, and logistics support",
    aliases: ["Calicut", "Malabar coast"]
  },
  {
    name: "Madurai",
    state: "Tamil Nadu",
    areaName: "Madurai Temple City Growth Belt",
    type: "regional",
    focus: "tourism services, public health access, and trade logistics",
    aliases: ["Temple city", "Dindigul corridor"]
  },
  {
    name: "Amritsar",
    state: "Punjab",
    areaName: "Amritsar Border Services Belt",
    type: "regional",
    focus: "border-linked trade, mobility support, and public service delivery",
    aliases: ["Golden Temple city", "Attari corridor"]
  },
  {
    name: "Puri",
    state: "Odisha",
    areaName: "Puri Coastal Pilgrimage Belt",
    type: "regional",
    focus: "tourism resilience, coastal services, and civic management",
    aliases: ["Jagannath Puri", "Konark belt"]
  },
  {
    name: "Jorhat",
    state: "Assam",
    areaName: "Jorhat Tea and Services Belt",
    type: "regional",
    focus: "tea economy logistics, education support, and regional health access",
    aliases: ["Tea belt", "Sivasagar link"]
  }
];

const soilTypes = [
  "Alluvial",
  "Black Cotton",
  "Red Loam",
  "Laterite",
  "Mountain Loam",
  "Coastal Sandy"
];

const cropSets = [
  ["Rice", "Vegetables", "Pulses"],
  ["Wheat", "Mustard", "Sugarcane"],
  ["Millets", "Groundnut", "Turmeric"],
  ["Tea", "Maize", "Horticulture"],
  ["Cotton", "Pulses", "Sesame"],
  ["Banana", "Spices", "Paddy"]
];

const irrigationTypes = [
  "Canal and drip mix",
  "Tank irrigation with solar pumps",
  "Lift irrigation and rainwater harvesting",
  "Micro-irrigation with sensor support"
];

const electricityStates = [
  "Stable with smart meters",
  "Solar-backed dependable supply",
  "24x7 feeder with seasonal variation",
  "Grid-modernisation in progress"
];

const roadStates = [
  "Four-season motorable roads",
  "Village streets resurfaced",
  "Rural roads expanding to farm clusters",
  "Drainage-linked road upgrades underway"
];

const techUsage = [
  "High adoption of digital payments and service kiosks",
  "Farmer advisory apps and sensor-based monitoring in use",
  "Village command center supports grievance tracking",
  "Schools and clinics rely on connected service dashboards"
];

const industryMix = [
  ["Food processing", "Handloom clusters"],
  ["Cold storage", "Agri-logistics"],
  ["Dairy cooperative", "Solar assembly"],
  ["Bamboo products", "Eco-tourism"],
  ["Fisheries", "Rural crafts"],
  ["Herbal processing", "Textiles"]
];

const healthMix = [
  ["Primary Health Centre", "Mobile health van", "Telemedicine hub"],
  ["Health sub-centre", "Maternal care unit", "Pharmacy kiosk"],
  ["Wellness clinic", "Diagnostic lab", "Ambulance bay"]
];

const educationMix = [
  ["Smart classroom school", "Skills lab", "Digital library"],
  ["Senior secondary school", "Girls hostel", "Community library"],
  ["Model primary school", "STEM club", "Vocational centre"]
];

const weatherConditions = [
  "Sunny Intervals",
  "Monsoon Watch",
  "Clear and Breezy",
  "Humid with Cloud Cover"
];

const wasteModes = [
  "82% door-to-door coverage",
  "Segregation drive in 24 wards",
  "Composting route fully mapped",
  "Collection vehicles GPS tracked"
];

const sensorModes = [
  "AQI and weather feed linked",
  "3 sensor nodes mapped",
  "Rainfall and dust sensors active",
  "Climate station synced to dashboard"
];

const dairyModes = [
  "Dairy cooperative and chilling point",
  "Milk collection route dashboard",
  "Livestock service desk connected",
  "Dairy value chain monitored weekly"
];

const classroomModes = [
  "12 smart classrooms active",
  "Digital boards across cluster schools",
  "STEM lab and connected classrooms",
  "Hybrid learning rooms monitored"
];

export const sampleVillages = placeSeedIndex.map((place, index) => {
  const base = 58 + (index % 10) * 3 + (place.type === "capital" ? 6 : 0);
  const soilType = soilTypes[index % soilTypes.length];
  const crops = cropSets[index % cropSets.length];
  const waterLevel = 52 + (index % 9) * 4;
  const irrigationCoverage = 55 + (index % 8) * 4;
  const literacyRate = 69 + (index % 10) * 2;
  const educationScore = base + 4;
  const smartDairyValue = industryMix[index % industryMix.length].find((industry) =>
    /dairy/i.test(industry)
  ) || dairyModes[index % dairyModes.length];

  return {
    _id: `sample-${index + 1}`,
    name: place.name,
    state: place.state,
    areaName: place.areaName,
    sector:
      place.type === "capital"
        ? "Capital Governance Cluster"
        : "Regional Growth Corridor",
    description: `${place.name} in ${place.state} is tracked as a smart governance location focused on ${place.focus}.`,
    searchTags: [place.name, place.state, place.areaName, ...(place.aliases || [])],
    waterLevel,
    soilType,
    agricultureCrops: crops,
    irrigation: irrigationTypes[index % irrigationTypes.length],
    electricityStatus: electricityStates[index % electricityStates.length],
    roadCondition: roadStates[index % roadStates.length],
    healthFacilities: healthMix[index % healthMix.length],
    educationFacilities: educationMix[index % educationMix.length],
    industries: industryMix[index % industryMix.length],
    technologyUsage: techUsage[index % techUsage.length],
    literacyRate,
    growthIndex: base + 7,
    infrastructureScore: base + 2,
    renewableIndex: 46 + (index % 9) * 4,
    cctvInstalled: 20 + (index % 8) * 3,
    cctvWorking: 16 + (index % 8) * 3,
    cctvOffline: 4,
    cctvLive: 12 + (index % 7) * 2,
    irrigationCoverage,
    healthAccessScore: base + 1,
    educationScore,
    population: 4200 + index * 520,
    households: 880 + index * 42,
    rainfall: 760 + (index % 7) * 115,
    weather: {
      condition: weatherConditions[index % weatherConditions.length],
      temperature: 23 + (index % 8),
      humidity: 52 + (index % 9) * 4,
      wind: 8 + (index % 6)
    },
    status: {
      water: index % 3 === 0 ? "Strong" : "Improving",
      electricity: index % 2 === 0 ? "Reliable" : "Upgrade Active",
      infrastructure: index % 4 === 0 ? "High Priority" : "Advancing",
      literacy: base > 78 ? "Leader" : "Growing"
    },
    highlights: [
      `${place.name} dashboard tracks ${place.focus}.`,
      "Community dashboard reviews water, electricity, roads, and public service readiness weekly.",
      `Search coverage includes ${[place.name, ...(place.aliases || []).slice(0, 2)].join(", ")}.`
    ],
    searchDashboardIntro: `${place.name} is managed under ${place.areaName} with an admin-controlled service dashboard for rural operations, civic utilities, and sector intelligence.`,
    soilIntelligenceSource: "Dashboard linked",
    soilIntelligenceValue: soilType,
    soilIntelligenceDescription: `Crop suitability focuses on ${crops.join(", ")} with ${irrigationTypes[
      index % irrigationTypes.length
    ].toLowerCase()}.`,
    waterSupplySource: "Dashboard linked",
    waterSupplyValue: `${waterLevel}% monitored coverage`,
    waterSupplyDescription: `Irrigation coverage is ${irrigationCoverage}% with ${irrigationTypes[
      index % irrigationTypes.length
    ].toLowerCase()}.`,
    wasteManagementSource: "Dashboard linked",
    wasteManagementValue: wasteModes[index % wasteModes.length],
    wasteManagementDescription:
      "Segregation, route coverage, and disposal checkpoints are tracked by local operations teams and can be revised from the admin panel.",
    environmentalSensorsSource: "Dashboard linked",
    environmentalSensorsValue: sensorModes[index % sensorModes.length],
    environmentalSensorsDescription:
      "Weather, air-quality, and seasonal monitoring feeds are designed to sit alongside local service metrics for this place.",
    smartDairySource: "Dashboard linked",
    smartDairyValue,
    smartDairyDescription:
      "Milk collection, livestock support, and dairy value-chain updates can be managed directly from the admin area.",
    digitalClassroomsSource: "Dashboard linked",
    digitalClassroomsValue: classroomModes[index % classroomModes.length],
    digitalClassroomsDescription: `Education readiness is ${educationScore}% with literacy at ${literacyRate}% and facilities including ${educationMix[
      index % educationMix.length
    ].join(", ")}.`,
    interactiveMapsSource: "Dashboard linked",
    interactiveMapsValue: "Open verified map view",
    interactiveMapsDescription:
      "Use map overlays for utilities, roads, school clusters, health facilities, and future CCTV layers for this place.",
    interactiveMapsActionLabel: "Open map",
    interactiveMapsUrl: "",
    createdAt: new Date().toISOString()
  };
});

export const sampleNotifications = [
  {
    _id: "notice-1",
    title: "District Water Conservation Review",
    message:
      "All villages are requested to update pre-monsoon reservoir and pond desilting progress before Friday evening.",
    type: "alert",
    priority: "high",
    audience: "all",
    createdAt: new Date().toISOString()
  },
  {
    _id: "notice-2",
    title: "Solar Pump Expansion Approved",
    message:
      "Phase-two renewable pump deployment has been approved for irrigation-focused villages in the western cluster.",
    type: "update",
    priority: "medium",
    audience: "all",
    createdAt: new Date().toISOString()
  },
  {
    _id: "notice-3",
    title: "School Connectivity Benchmark Met",
    message:
      "Education services have crossed the 90 percent digital connectivity benchmark in high-priority pilot villages.",
    type: "update",
    priority: "low",
    audience: "users",
    createdAt: new Date().toISOString()
  }
];
