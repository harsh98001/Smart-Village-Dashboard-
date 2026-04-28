export const liveAirQualityStations = [
  {
    id: "new-delhi",
    label: "New Delhi",
    subtitle: "National command reference",
    latitude: 28.6139,
    longitude: 77.209
  },
  {
    id: "lucknow",
    label: "Lucknow",
    subtitle: "North growth corridor",
    latitude: 26.8467,
    longitude: 80.9462
  },
  {
    id: "jaipur",
    label: "Jaipur",
    subtitle: "Western development zone",
    latitude: 26.9124,
    longitude: 75.7873
  },
  {
    id: "bengaluru",
    label: "Bengaluru",
    subtitle: "Southern innovation cluster",
    latitude: 12.9716,
    longitude: 77.5946
  }
];

export const fallbackAirQualityReadings = [
  {
    id: "new-delhi",
    label: "New Delhi",
    subtitle: "National command reference",
    current: {
      time: new Date().toISOString(),
      us_aqi: 126,
      pm2_5: 52,
      pm10: 98,
      ozone: 68,
      nitrogen_dioxide: 42
    }
  },
  {
    id: "lucknow",
    label: "Lucknow",
    subtitle: "North growth corridor",
    current: {
      time: new Date().toISOString(),
      us_aqi: 112,
      pm2_5: 44,
      pm10: 84,
      ozone: 63,
      nitrogen_dioxide: 34
    }
  },
  {
    id: "jaipur",
    label: "Jaipur",
    subtitle: "Western development zone",
    current: {
      time: new Date().toISOString(),
      us_aqi: 88,
      pm2_5: 28,
      pm10: 62,
      ozone: 57,
      nitrogen_dioxide: 22
    }
  },
  {
    id: "bengaluru",
    label: "Bengaluru",
    subtitle: "Southern innovation cluster",
    current: {
      time: new Date().toISOString(),
      us_aqi: 71,
      pm2_5: 18,
      pm10: 40,
      ozone: 41,
      nitrogen_dioxide: 17
    }
  }
];

