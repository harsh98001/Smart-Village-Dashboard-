const pageDescriptions = {
  landing:
    "You are on the Smart Village landing page where village cards, the agriculture carousel, and quick governance highlights are shown.",
  dashboard:
    "You are on the Home Dashboard where the platform summarises growth, literacy, water, and infrastructure metrics across villages.",
  analytics:
    "You are on the Analytics page where comparison charts, progress indicators, and district-wide performance patterns are available.",
  growth:
    "You are on the Growth page where development momentum, investment readiness, and village performance trends are presented.",
  agriculture:
    "You are on the Agriculture Management page where crop planning, irrigation coverage, soil quality, and seasonal readiness are tracked.",
  water:
    "You are on the Water Management page where storage levels, rainfall, and irrigation infrastructure are monitored.",
  electricity:
    "You are on the Electricity and Energy page where grid health, smart metering, and renewable energy readiness are reviewed.",
  infrastructure:
    "You are on the Road and Infrastructure page where roads, logistics, and construction readiness are summarised.",
  health:
    "You are on the Health Services page where clinic coverage, outreach support, and wellness infrastructure are detailed.",
  education:
    "You are on the Education System page where literacy, school facilities, and digital learning capacity are highlighted.",
  technology:
    "You are on the Technology page where digital service adoption, kiosks, and smart governance tooling are tracked.",
  industries:
    "You are on the Industries page where local enterprise, processing hubs, and employment drivers are analysed.",
  contact:
    "You are on the Contact page where stakeholders can send project queries, partnership requests, and field support messages."
};

const assistantQuery = async (req, res, next) => {
  try {
    const { routeKey, question, villages } = req.body;
    const normalizedQuestion = String(question || "").toLowerCase();
    const currentPage = pageDescriptions[routeKey] || pageDescriptions.dashboard;
    const villageCount = Array.isArray(villages) ? villages.length : 0;

    let answer = `${currentPage} `;

    if (!normalizedQuestion) {
      answer +=
        "Ask me about this page, how to navigate, or what the village analytics mean, and I will guide you.";
    } else if (normalizedQuestion.includes("what does this page")) {
      answer += "This page is designed to help users understand the most important indicators and take faster action.";
    } else if (
      normalizedQuestion.includes("view village") ||
      normalizedQuestion.includes("village data")
    ) {
      answer +=
        "You can open any village card or use the Search and Filter page to inspect a village profile, then view detailed analytics, services, and status badges.";
    } else if (normalizedQuestion.includes("analytics")) {
      answer +=
        "The platform currently surfaces growth, literacy, infrastructure, renewable energy, irrigation, and sector comparison analytics with cards, charts, and paginated tables.";
    } else if (normalizedQuestion.includes("admin")) {
      answer +=
        "Admin users can create or update villages, publish notifications, and maintain dashboard information from the admin entry and alerts areas.";
    } else if (normalizedQuestion.includes("how many villages")) {
      answer += `The dashboard is currently prepared with ${villageCount} seeded village profiles from different Indian states.`;
    } else {
      answer +=
        "I can help explain page sections, guide you to the right module, or summarise how village indicators such as water, literacy, and infrastructure are being used.";
    }

    res.json({
      success: true,
      answer
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  assistantQuery
};

