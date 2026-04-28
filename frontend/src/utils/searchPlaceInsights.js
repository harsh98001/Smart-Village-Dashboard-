export const normalizePlaceText = (value) => String(value || "").trim().toLowerCase();

export const findDashboardProfile = (location, villages = []) => {
  if (!location) {
    return null;
  }

  const normalizedName = normalizePlaceText(location.name);
  const normalizedState = normalizePlaceText(location.state);

  return (
    villages.find(
      (village) =>
        normalizePlaceText(village.name) === normalizedName &&
        normalizePlaceText(village.state) === normalizedState
    ) ||
    villages.find((village) => {
      if (normalizePlaceText(village.state) !== normalizedState) {
        return false;
      }

      return (village.searchTags || []).some(
        (tag) => normalizePlaceText(tag) === normalizedName
      );
    }) ||
    null
  );
};

const mapQuery = (location) =>
  encodeURIComponent([location?.name, location?.state, "India"].filter(Boolean).join(", "));

const pickConfiguredValue = (primaryValue, fallbackValue) =>
  String(primaryValue || "").trim() || fallbackValue;

export const buildSearchModules = ({ location, profile, environment }) => {
  const crops = profile?.agricultureCrops?.join(", ");
  const educationStack = profile?.educationFacilities?.join(", ");
  const dairySignal = profile?.industries?.find((industry) => /dairy|milk/i.test(industry));
  const aqiValue = environment?.aqi?.current?.us_aqi;
  const pm25 = environment?.aqi?.current?.pm2_5;
  const weatherTemperature = environment?.weather?.current?.temperature_2m;
  const weatherHumidity = environment?.weather?.current?.relative_humidity_2m;

  return [
    {
      key: "soil",
      title: "Soil Intelligence",
      tone: "earth",
      source: pickConfiguredValue(
        profile?.soilIntelligenceSource,
        profile ? "Dashboard linked" : "Admin feed pending"
      ),
      value: pickConfiguredValue(
        profile?.soilIntelligenceValue,
        profile?.soilType || "Local soil profile not linked yet"
      ),
      description: pickConfiguredValue(
        profile?.soilIntelligenceDescription,
        profile
          ? `Crop suitability focuses on ${crops || "field crops"} with ${profile.irrigation.toLowerCase()}.`
          : "Link district soil survey or admin village data to surface verified soil type and crop suitability here."
      )
    },
    {
      key: "water",
      title: "Water Supply",
      tone: "water",
      source: pickConfiguredValue(
        profile?.waterSupplySource,
        profile ? "Dashboard linked" : "Admin feed pending"
      ),
      value: pickConfiguredValue(
        profile?.waterSupplyValue,
        profile ? `${profile.waterLevel}% monitored coverage` : "Coverage feed not linked yet"
      ),
      description: pickConfiguredValue(
        profile?.waterSupplyDescription,
        profile
          ? `Irrigation coverage is ${profile.irrigationCoverage}% with ${profile.irrigation.toLowerCase()}.`
          : "This block is ready for piped water coverage, irrigation status, tanker dependence, and storage updates."
      )
    },
    {
      key: "waste",
      title: "Waste Management",
      tone: "maroon",
      source: pickConfiguredValue(profile?.wasteManagementSource, "Admin feed pending"),
      value: pickConfiguredValue(
        profile?.wasteManagementValue,
        "Route and collection feed required"
      ),
      description: pickConfiguredValue(
        profile?.wasteManagementDescription,
        "This place is not yet connected to a verified sanitation feed. Add segregation, route coverage, and collection uptime from the admin panel to populate this module."
      )
    },
    {
      key: "sensors",
      title: "Environmental Sensors",
      tone: "green",
      source: pickConfiguredValue(
        profile?.environmentalSensorsSource,
        environment?.aqi || environment?.weather ? "Live sensors" : "Live feed pending"
      ),
      value: pickConfiguredValue(
        profile?.environmentalSensorsValue,
        aqiValue || aqiValue === 0
          ? `AQI ${Math.round(aqiValue)}`
          : environment?.loading
            ? "Refreshing live sensor feed"
            : "Search a place result with live coordinates"
      ),
      description: pickConfiguredValue(
        profile?.environmentalSensorsDescription,
        aqiValue || weatherTemperature || weatherTemperature === 0
          ? `PM2.5 ${Math.round(pm25 || 0)} ug/m3, temperature ${Math.round(
              weatherTemperature || 0
            )} deg C, humidity ${Math.round(weatherHumidity || 0)}%.`
          : "Live weather and air-quality signals appear here when the selected result carries a live geocoding match."
      )
    },
    {
      key: "dairy",
      title: "Smart Dairy",
      tone: "orange",
      source: pickConfiguredValue(
        profile?.smartDairySource,
        dairySignal ? "Dashboard linked" : "Admin feed pending"
      ),
      value: pickConfiguredValue(
        profile?.smartDairyValue,
        dairySignal || "No dairy programme linked yet"
      ),
      description: pickConfiguredValue(
        profile?.smartDairyDescription,
        dairySignal
          ? `Industrial mix also includes ${(profile.industries || [])
              .filter((industry) => industry !== dairySignal)
              .slice(0, 2)
              .join(", ") || "support services"}.`
          : "Use this block for milk procurement, chilling units, cooperative output, and animal health tracking."
      )
    },
    {
      key: "classrooms",
      title: "Digital Classrooms",
      tone: "sky",
      source: pickConfiguredValue(
        profile?.digitalClassroomsSource,
        profile ? "Dashboard linked" : "Admin feed pending"
      ),
      value: pickConfiguredValue(
        profile?.digitalClassroomsValue,
        profile ? `${profile.educationScore}% readiness score` : "Learning tech feed not linked yet"
      ),
      description: pickConfiguredValue(
        profile?.digitalClassroomsDescription,
        profile
          ? `Education stack includes ${educationStack || "connected classrooms"} with literacy at ${profile.literacyRate}%.`
          : "This section is ready for smart classroom count, digital board deployment, and school connectivity status."
      )
    },
    {
      key: "maps",
      title: "Interactive Maps",
      tone: "coffee",
      source: pickConfiguredValue(profile?.interactiveMapsSource, "Live location"),
      value: pickConfiguredValue(profile?.interactiveMapsValue, "Open verified map view"),
      description: pickConfiguredValue(
        profile?.interactiveMapsDescription,
        "Use the live map action to inspect this place on a real map and connect future CCTV, utility, and ward overlays."
      ),
      actionLabel: pickConfiguredValue(profile?.interactiveMapsActionLabel, "Open map"),
      actionHref: pickConfiguredValue(
        profile?.interactiveMapsUrl,
        `https://www.google.com/maps/search/?api=1&query=${mapQuery(location)}`
      )
    }
  ];
};
