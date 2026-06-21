const defaultKeywords = [
  "smart village dashboard",
  "rural governance platform",
  "village development analytics",
  "digital India rural dashboard",
  "panchayat data management",
  "citizen grievance system",
  "real time village data"
];

const pageMetaMap = {
  "/": {
    key: "landing",
    title: "Smart Village Intelligence Network",
    eyebrow: "National Rural Governance Platform",
    description:
      "A premium, data-rich command center for village analytics, sector health, and long-term smart growth planning.",
    seoDescription:
      "Smart Village Dashboard for rural governance, village analytics, citizen grievance tracking, live AQI, water, agriculture, health, education, and infrastructure insights.",
    keywords: [
      "smart village dashboard",
      "rural governance dashboard",
      "village analytics platform",
      "smart village project",
      "digital village monitoring"
    ]
  },
  "/dashboard": {
    key: "dashboard",
    title: "Home Dashboard",
    eyebrow: "Unified Command Center",
    description:
      "Monitor national-level development signals, compare villages, and follow live governance updates.",
    keywords: ["village dashboard", "governance command center", "rural development data"]
  },
  "/analytics": {
    key: "analytics",
    title: "Analytics",
    eyebrow: "Evidence-Based Decision Support",
    description:
      "Cross-sector charts and performance views for growth, literacy, water, infrastructure, and services.",
    keywords: ["rural analytics", "village performance charts", "development indicators"]
  },
  "/growth": {
    key: "growth",
    title: "Growth",
    eyebrow: "Progress Acceleration",
    description:
      "Review progress drivers, sustainability indicators, and village readiness for the next phase of development.",
    keywords: ["village growth", "rural development trends", "sustainable village planning"]
  },
  "/soil": {
    key: "soil",
    title: "Soil Management",
    eyebrow: "Land Intelligence",
    description:
      "Track soil conditions, crop compatibility, and resilience planning for long-term agricultural stability."
  },
  "/water": {
    key: "water",
    title: "Water Management",
    eyebrow: "Resource Stewardship",
    description:
      "Assess water storage, irrigation reach, rainfall dynamics, and distribution readiness."
  },
  "/electricity": {
    key: "electricity",
    title: "Electricity & Energy",
    eyebrow: "Power Assurance",
    description:
      "Follow grid reliability, renewable adoption, and village-level energy resilience."
  },
  "/agriculture": {
    key: "agriculture",
    title: "Agriculture Management",
    eyebrow: "Farm Productivity Systems",
    description:
      "Analyze crop profiles, irrigation strategies, soil health, and agriculture-led growth performance."
  },
  "/infrastructure": {
    key: "infrastructure",
    title: "Road & Infrastructure",
    eyebrow: "Mobility and Build Quality",
    description:
      "Review roads, mobility corridors, public works, and infrastructure execution quality."
  },
  "/health": {
    key: "health",
    title: "Health Services",
    eyebrow: "Citizen Wellbeing",
    description:
      "Track health access, telemedicine readiness, and local wellness support systems."
  },
  "/education": {
    key: "education",
    title: "Education System",
    eyebrow: "Learning Transformation",
    description:
      "Measure literacy, classroom quality, digital learning capacity, and community education assets."
  },
  "/technology": {
    key: "technology",
    title: "Technology",
    eyebrow: "Digital Public Infrastructure",
    description:
      "Observe smart service adoption, connected governance tools, and digital access across villages."
  },
  "/industries": {
    key: "industries",
    title: "Industries",
    eyebrow: "Rural Enterprise Engine",
    description:
      "Understand local industries, processing hubs, logistics value, and employment potential."
  },
  "/more-sectors": {
    key: "more",
    title: "More Sectors",
    eyebrow: "Integrated Public Services",
    description:
      "Explore sanitation, resilience, livelihoods, and civic service readiness beyond the core modules."
  },
  "/admin-entry": {
    key: "admin",
    title: "User Data Entry",
    eyebrow: "Admin Operations",
    description:
      "Create, edit, and maintain village intelligence records through secure administrator workflows."
  },
  "/reports": {
    key: "reports",
    title: "Reports",
    eyebrow: "Decision Briefing Pack",
    description:
      "Convert live dashboard signals into executive-ready reports and operational insights."
  },
  "/notifications": {
    key: "notifications",
    title: "Notifications & Alerts",
    eyebrow: "Live Governance Broadcasts",
    description:
      "Read urgent notices, publish updates, and monitor platform-wide alerts."
  },
  "/profile": {
    key: "profile",
    title: "Profile",
    eyebrow: "Account Overview",
    description:
      "Review user access, role details, and contribution context within the Smart Village platform."
  },
  "/settings": {
    key: "settings",
    title: "Settings",
    eyebrow: "Experience Controls",
    description:
      "Adjust theme preferences, assistant behaviour, and interface comfort settings."
  },
  "/search": {
    key: "search",
    title: "Search & Filter",
    eyebrow: "Explore Village Data",
    description:
      "Search, filter, and compare village records through responsive tables and drill-down views.",
    seoDescription:
      "Search Indian states, capitals, villages, and featured places with smart village records, live map access, environmental signals, and governance modules.",
    keywords: [
      "search village data",
      "Indian state capital data",
      "village search platform",
      "real time place search",
      "smart village records"
    ]
  },
  "/contact": {
    key: "contact",
    title: "Contact",
    eyebrow: "Engage the Team",
    description:
      "Connect with the Smart Village programme office for support, coordination, and partnerships.",
    seoDescription:
      "Contact the Smart Village programme office and file citizen grievances for public issues such as water, roads, drainage, street lights, and civic services.",
    keywords: [
      "citizen grievance system",
      "village complaint portal",
      "rural support desk",
      "public issue reporting"
    ]
  },
  "/login": {
    key: "login",
    title: "Login",
    eyebrow: "Secure Access",
    description: "Sign in to continue into the smart governance command center."
  },
  "/signup": {
    key: "signup",
    title: "Signup",
    eyebrow: "Create Access",
    description: "Register as an administrator or citizen observer to enter the platform."
  }
};

export const getPageMeta = (pathname) => {
  if (pathname.startsWith("/villages/")) {
    return {
      key: "village-detail",
      title: "Village Detail",
      eyebrow: "Village Intelligence Record",
      description:
        "A detailed village view with full analytics, infrastructure data, and growth indicators.",
      keywords: defaultKeywords.concat([
        "village profile",
        "village infrastructure data",
        "rural service indicators"
      ])
    };
  }

  const meta = pageMetaMap[pathname] || pageMetaMap["/dashboard"];

  return {
    ...meta,
    keywords: defaultKeywords.concat(meta.keywords || [])
  };
};
