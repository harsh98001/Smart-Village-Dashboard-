import React, { useEffect, useMemo, useState } from "react";
import SectionTitle from "../ui/SectionTitle";
import StatCard from "../ui/StatCard";
import { formatTime } from "../../utils/formatters";
import {
  liveAirQualityStations,
  fallbackAirQualityReadings
} from "../../data/liveAirQualityStations";

const resolveAqiStatus = (aqi) => {
  if (aqi <= 50) {
    return { label: "Good", tone: "good" };
  }

  if (aqi <= 100) {
    return { label: "Moderate", tone: "moderate" };
  }

  if (aqi <= 150) {
    return { label: "Sensitive", tone: "sensitive" };
  }

  if (aqi <= 200) {
    return { label: "Unhealthy", tone: "unhealthy" };
  }

  if (aqi <= 300) {
    return { label: "Very Unhealthy", tone: "very-unhealthy" };
  }

  return { label: "Hazardous", tone: "hazardous" };
};

const AirQualitySection = ({
  eyebrow = "Live AQI",
  title = "Real-time air quality snapshot for Indian monitoring cities",
  description = "The AQI values below are fetched live and can be reused across landing, analytics, and growth sections.",
  compact = false
}) => {
  const [readings, setReadings] = useState(fallbackAirQualityReadings);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    const loadAqi = async () => {
      try {
        const responses = await Promise.all(
          liveAirQualityStations.map(async (station) => {
            const url =
              `https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${station.latitude}` +
              `&longitude=${station.longitude}&current=us_aqi,pm2_5,pm10,ozone,nitrogen_dioxide&timezone=auto`;

            const response = await fetch(url, { signal: controller.signal });

            if (!response.ok) {
              throw new Error("AQI fetch failed");
            }

            const data = await response.json();

            return {
              ...station,
              current: data.current
            };
          })
        );

        if (!controller.signal.aborted) {
          setReadings(responses);
          setError("");
        }
      } catch (_error) {
        if (!controller.signal.aborted) {
          setReadings(fallbackAirQualityReadings);
          setError("Live AQI could not be refreshed, so fallback values are shown.");
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    loadAqi();

    return () => {
      controller.abort();
    };
  }, []);

  const summary = useMemo(() => {
    const averageAqi = Math.round(
      readings.reduce((sum, reading) => sum + (reading.current?.us_aqi || 0), 0) /
        Math.max(readings.length, 1)
    );

    const highest = readings.reduce(
      (leader, reading) =>
        !leader || (reading.current?.us_aqi || 0) > (leader.current?.us_aqi || 0)
          ? reading
          : leader,
      null
    );

    return {
      averageAqi,
      highest
    };
  }, [readings]);

  return <section className={`air-quality-section ${compact ? "compact" : ""}`.trim()}>
  <div key="container" className="container">
    <SectionTitle key="title" eyebrow={eyebrow} title={title} description={description} />
    <div key="summary" className="stats-grid compact-grid">
      <StatCard key="average" icon="🌫️" title="Average Live AQI" value={summary.averageAqi} description="Average current AQI across the selected monitoring cities." formatter={(value) => value} tone="maroon" />
      <StatCard key="leader" icon="📍" title="Highest AQI City" value={summary.highest?.current?.us_aqi || 0} description={summary.highest ? summary.highest.label : "Awaiting live feed"} formatter={(value) => value} tone="orange" />
    </div>
    <div key="grid" className="air-quality-grid">
      {readings.map((reading) => {
                const aqi = reading.current?.us_aqi || 0;
                const status = resolveAqiStatus(aqi);

                return <article key={reading.id} className={`aqi-card tone-${status.tone}`}>
        <div key="top" className="aqi-card-top">
          <div key="copy" className="aqi-card-copy">
            <strong key="city">
              {reading.label}
            </strong>
            <span key="subtitle" className="small-label">
              {reading.subtitle}
            </span>
          </div>
          <span key="status" className={`aqi-status aqi-${status.tone}`}>
            {status.label}
          </span>
        </div>
        <div key="score" className="aqi-score">
          {String(aqi)}
        </div>
        <div key="metrics" className="aqi-metrics">
          <span key="pm25">
            {`PM2.5 ${Math.round(reading.current?.pm2_5 || 0)}`}
          </span>
          <span key="pm10">
            {`PM10 ${Math.round(reading.current?.pm10 || 0)}`}
          </span>
          <span key="o3">
            {`Ozone ${Math.round(reading.current?.ozone || 0)}`}
          </span>
          <span key="no2">
            {`NO₂ ${Math.round(reading.current?.nitrogen_dioxide || 0)}`}
          </span>
        </div>
        <div key="footer" className="aqi-card-footer">
          {`Updated ${formatTime(reading.current?.time || new Date())}`}
        </div>
      </article>;
              })}
    </div>
    <p key="note" className="air-quality-note">
      {loading
                ? "Refreshing live AQI values..."
                : error || "Live air quality powered by the Open-Meteo Air Quality API."}
    </p>
  </div>
</section>;
};

export default AirQualitySection;
