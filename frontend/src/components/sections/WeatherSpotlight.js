import React, { useEffect, useState } from "react";
const defaultRegion = {
  name: "Kapurthala",
  state: "Punjab",
  countryCode: "IN"
};

const buildFallbackDaily = () =>
  [0, 1, 2, 3, 4, 5].map((offset) => {
    const nextDate = new Date();
    nextDate.setDate(nextDate.getDate() + offset);

    return {
      time: nextDate.toISOString().slice(0, 10),
      weather_code: offset < 2 ? 1 : offset < 4 ? 2 : 61,
      temperature_2m_max: 39 - (offset % 2),
      temperature_2m_min: 24 + (offset % 3),
      precipitation_probability_max: offset > 3 ? 34 : 8 + offset * 6
    };
  });

const buildFallbackHourly = () =>
  [0, 1, 2, 3, 4, 5, 6, 7].map((offset) => {
    const nextDate = new Date();
    nextDate.setHours(nextDate.getHours() + offset * 3);

    return {
      time: nextDate.toISOString(),
      temperature_2m: 25 + Math.round(Math.sin(offset / 2) * 7) + (offset > 4 ? -2 : 0),
      weather_code: offset < 2 ? 1 : offset < 5 ? 2 : 3,
      precipitation_probability: offset > 5 ? 18 : offset * 3,
      wind_speed_10m: 6 + offset
    };
  });

const createFallbackState = (regionLabel) => ({
  loading: true,
  regionLabel,
  sourceLabel: "Standby weather profile",
  updatedLabel: "Refreshing",
  currentDateLabel: "Friday, 1:00 am",
  current: {
    temperature_2m: 25,
    relative_humidity_2m: 46,
    wind_speed_10m: 6,
    precipitation: 0,
    cloud_cover: 18,
    weather_code: 2,
    is_day: 1
  },
  daily: buildFallbackDaily(),
  hourly: buildFallbackHourly(),
  error: ""
});

const formatUpdatedTime = (value) => {
  if (!value) {
    return "Just now";
  }

  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit"
  }).format(new Date(value));
};

const formatCurrentDateLine = (value) =>
  new Intl.DateTimeFormat("en-IN", {
    weekday: "long",
    hour: "numeric",
    minute: "2-digit"
  }).format(new Date(value));

const formatDayLabel = (value) =>
  new Intl.DateTimeFormat("en-IN", { weekday: "short" }).format(new Date(value));

const formatHourLabel = (value) =>
  new Intl.DateTimeFormat("en-IN", { hour: "numeric" }).format(new Date(value));

const getWeatherVisual = (weatherCode, isDay) => {
  if ([95, 96, 99].includes(weatherCode)) {
    return {
      theme: "storm",
      label: "Thunderstorm"
    };
  }

  if ([51, 53, 55, 56, 57, 61, 63, 65, 66, 67, 80, 81, 82].includes(weatherCode)) {
    return {
      theme: "rain",
      label: "Rain"
    };
  }

  if ([45, 48].includes(weatherCode)) {
    return {
      theme: "mist",
      label: "Mist"
    };
  }

  if ([1, 2, 3].includes(weatherCode)) {
    return {
      theme: weatherCode === 1 && !isDay ? "night" : weatherCode === 1 ? "sunny" : "partly",
      label: weatherCode === 1 && !isDay ? "Clear night" : weatherCode === 1 ? "Sunny" : "Partly cloudy"
    };
  }

  if (weatherCode === 0) {
    return {
      theme: isDay ? "sunny" : "night",
      label: isDay ? "Clear sky" : "Clear night"
    };
  }

  return {
    theme: "cloud",
    label: "Cloudy"
  };
};

const buildTemperatureModel = (entries) => {
  const width = 640;
  const height = 120;
  const paddingX = 18;
  const topPadding = 14;
  const bottomY = 98;
  const values = entries.map((entry) => Number(entry.temperature_2m || 0));
  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = max - min || 1;
  const step = entries.length > 1 ? (width - paddingX * 2) / (entries.length - 1) : 0;
  const points = entries.map((entry, index) => {
    const value = Number(entry.temperature_2m || 0);
    const x = paddingX + step * index;
    const y = bottomY - ((value - min) / range) * (bottomY - topPadding);

    return {
      ...entry,
      value,
      x,
      y
    };
  });

  const linePath = points
    .map((point, index) => `${index === 0 ? "M" : "L"} ${point.x} ${point.y}`)
    .join(" ");
  const areaPath = `${linePath} L ${points[points.length - 1]?.x || paddingX} ${bottomY} L ${points[0]?.x || paddingX} ${bottomY} Z`;

  return {
    width,
    height,
    bottomY,
    points,
    linePath,
    areaPath
  };
};

const WeatherIcon = ({ theme, compact = false }) =>
  <div className={`weather-mini-icon weather-mini-icon-${theme}${compact ? " compact" : ""}`}>
  <span key="sun" className="weather-mini-sun" />
  <span key="moon" className="weather-mini-moon" />
  <span key="cloud1" className="weather-mini-cloud cloud-a" />
  <span key="cloud2" className="weather-mini-cloud cloud-b" />
  <span key="rain1" className="weather-mini-rain drop-a" />
  <span key="rain2" className="weather-mini-rain drop-b" />
  <span key="rain3" className="weather-mini-rain drop-c" />
  <span key="bolt" className="weather-mini-bolt" />
  <span key="mist1" className="weather-mini-mist mist-a" />
  <span key="mist2" className="weather-mini-mist mist-b" />
</div>;

const WeatherSpotlight = ({
  regionName = defaultRegion.name,
  regionState = defaultRegion.state,
  countryCode = defaultRegion.countryCode
}) => {
  const regionLabel = `${regionName}, ${regionState}`;
  const [weatherState, setWeatherState] = useState(createFallbackState(regionLabel));

  useEffect(() => {
    let ignore = false;

    const loadWeather = async () => {
      try {
        const geocodingResponse = await fetch(
          `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
            regionName
          )}&count=8&language=en&format=json&countryCode=${countryCode}`
        );

        if (!geocodingResponse.ok) {
          throw new Error("Unable to locate the weather region.");
        }

        const geocodingData = await geocodingResponse.json();
        const locationMatch =
          (geocodingData.results || []).find(
            (item) => String(item.admin1 || "").toLowerCase() === regionState.toLowerCase()
          ) ||
          geocodingData.results?.[0];

        if (!locationMatch) {
          throw new Error("No matching weather location found.");
        }

        const forecastResponse = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${locationMatch.latitude}&longitude=${locationMatch.longitude}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code,is_day,precipitation,cloud_cover&hourly=temperature_2m,weather_code,precipitation_probability,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max&forecast_days=6&timezone=auto`
        );

        if (!forecastResponse.ok) {
          throw new Error("Weather forecast could not be refreshed.");
        }

        const forecastData = await forecastResponse.json();
        const nextDaily = (forecastData.daily?.time || []).map((time, index) => ({
          time,
          weather_code: forecastData.daily.weather_code?.[index],
          temperature_2m_max: forecastData.daily.temperature_2m_max?.[index],
          temperature_2m_min: forecastData.daily.temperature_2m_min?.[index],
          precipitation_probability_max:
            forecastData.daily.precipitation_probability_max?.[index]
        }));
        const hourlyTimes = forecastData.hourly?.time || [];
        const currentTime = forecastData.current?.time;
        const currentHourIndex = Math.max(
          0,
          hourlyTimes.findIndex((entry) => entry >= currentTime)
        );
        const nextHourly = hourlyTimes
          .slice(currentHourIndex, currentHourIndex + 8)
          .map((time, index) => ({
            time,
            temperature_2m: forecastData.hourly.temperature_2m?.[currentHourIndex + index],
            weather_code: forecastData.hourly.weather_code?.[currentHourIndex + index],
            precipitation_probability:
              forecastData.hourly.precipitation_probability?.[currentHourIndex + index],
            wind_speed_10m: forecastData.hourly.wind_speed_10m?.[currentHourIndex + index]
          }));

        if (!ignore) {
          setWeatherState({
            loading: false,
            regionLabel: `${locationMatch.name}, ${locationMatch.admin1 || regionState} ${locationMatch.postcode || ""}`.trim(),
            sourceLabel: "Live Open-Meteo feed",
            updatedLabel: formatUpdatedTime(forecastData.current?.time),
            currentDateLabel: formatCurrentDateLine(forecastData.current?.time),
            current: forecastData.current,
            daily: nextDaily.length ? nextDaily : buildFallbackDaily(),
            hourly: nextHourly.length ? nextHourly : buildFallbackHourly(),
            error: ""
          });
        }
      } catch (_error) {
        if (!ignore) {
          setWeatherState((current) => ({
            ...current,
            loading: false,
            sourceLabel: "Standby Punjab profile",
            updatedLabel: "Feed retry pending",
            error: "Live feed unavailable for a moment."
          }));
        }
      }
    };

    loadWeather();

    return () => {
      ignore = true;
    };
  }, [countryCode, regionName, regionState]);

  const currentWeather = weatherState.current;
  const currentVisual = getWeatherVisual(currentWeather.weather_code, currentWeather.is_day);
  const chartModel = buildTemperatureModel(weatherState.hourly);

  return <section className="weather-spotlight-section weather-compact-section">
  <div key="container" className="container">
    <div key="card" className="weather-card premium-card weather-compact-card">
      <div key="top" className="weather-compact-topbar">
        <div key="location" className="weather-compact-location">
          <span key="dot" className="weather-location-dot" />
          <strong key="name">
            {weatherState.regionLabel}
          </strong>
          <span key="update" className="weather-update-pill">
            {weatherState.loading ? "Updating" : `Updated ${weatherState.updatedLabel}`}
          </span>
        </div>
        <span key="source" className="weather-source-label">
          {weatherState.sourceLabel}
        </span>
      </div>
      <div key="main" className="weather-compact-main">
        <div key="left" className="weather-compact-current">
          <WeatherIcon key="icon" theme={currentVisual.theme} />
          <div key="tempWrap" className="weather-current-temp-wrap">
            <strong key="temp" className="weather-current-temp">
              {`${Math.round(currentWeather.temperature_2m)}°`}
            </strong>
            <span key="unit" className="weather-current-unit">C</span>
          </div>
          <div key="metrics" className="weather-current-metrics">
            <div key="precip">
              {`Precipitation: ${Math.round(weatherState.daily[0]?.precipitation_probability_max || 0)}%`}
            </div>
            <div key="humidity">
              {`Humidity: ${Math.round(currentWeather.relative_humidity_2m)}%`}
            </div>
            <div key="wind">
              {`Wind: ${Math.round(currentWeather.wind_speed_10m)} km/h`}
            </div>
          </div>
        </div>
        <div key="summary" className="weather-compact-summary">
          <strong key="title" className="weather-summary-title">Weather</strong>
          <span key="time" className="weather-summary-time">
            {weatherState.currentDateLabel}
          </span>
          <span key="condition" className="weather-summary-condition">
            {currentVisual.label}
          </span>
          {weatherState.error
                        ? <span key="error" className="weather-summary-note">
            {weatherState.error}
          </span>
                        : null}
        </div>
      </div>
      <div key="tabs" className="weather-compact-tabs">
        <span key="temp" className="weather-tab active">Temperature</span>
        <span key="precip" className="weather-tab">Precipitation</span>
        <span key="wind" className="weather-tab">Wind</span>
      </div>
      <div key="chart" className="weather-mini-chart-card">
        <svg key="svg" className="weather-mini-chart-svg" viewBox={`0 0 ${chartModel.width} ${chartModel.height}`} preserveAspectRatio="none">
          {[
                        <defs key="defs">
            <linearGradient key="fill" id="weatherChartFill" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop key="s1" offset="0%" stopColor="#f7c448" stopOpacity="0.34" />
              <stop key="s2" offset="100%" stopColor="#f7c448" stopOpacity="0.06" />
            </linearGradient>
          </defs>,
                        <path key="area" d={chartModel.areaPath} fill="url(#weatherChartFill)" />,
                        <path key="line" d={chartModel.linePath} fill="none" stroke="#f5b301" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
                      ].concat(
                        chartModel.points.flatMap((point, index) => [
                          <circle key={`point-${index}`} cx={point.x} cy={point.y} r="3.6" fill="#f5b301" />,
                          <text key={`temp-label-${index}`} x={point.x} y={point.y - 10} textAnchor="middle" className="weather-chart-temp-label">
            {String(Math.round(point.value))}
          </text>
                        ])
                      )}
        </svg>
        <div key="labels" className="weather-chart-time-row">
          {weatherState.hourly.map((entry, index) =>
                        <span key={`${entry.time}-${index}`} className="weather-chart-time-label">
            {formatHourLabel(entry.time)}
          </span>
                      )}
        </div>
      </div>
      <div key="days" className="weather-compact-days">
        {weatherState.daily.slice(0, 6).map((entry, index) => {
                    const visual = getWeatherVisual(entry.weather_code, 1);

                    return <div key={`${entry.time}-${index}`} className="weather-day-card">
          <span key="day" className="weather-day-label">
            {formatDayLabel(entry.time)}
          </span>
          <WeatherIcon key="icon" theme={visual.theme} compact />
          <strong key="temp" className="weather-day-temp">
            {`${Math.round(entry.temperature_2m_max)}° ${Math.round(entry.temperature_2m_min)}°`}
          </strong>
          <span key="condition" className="weather-day-condition">
            {visual.label}
          </span>
        </div>;
                  })}
      </div>
    </div>
  </div>
</section>;
};

export default WeatherSpotlight;
