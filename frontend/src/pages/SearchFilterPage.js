import React, { useEffect, useState } from "react";
import apiClient from "../api/client";
import { useData } from "../context/DataContext";
import PageBanner from "../components/layout/PageBanner";
import SearchToolbar from "../components/ui/SearchToolbar";
import {
  buildSearchModules,
  findDashboardProfile,
  normalizePlaceText
} from "../utils/searchPlaceInsights";

const SearchFilterPage = () => {
  const { villages } = useData();
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({
    state: "All states",
    resultType: "All results"
  });
  const [states, setStates] = useState([]);
  const [types, setTypes] = useState([]);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [meta, setMeta] = useState({
    usedLiveResults: false,
    message: "Official India location directory is loading."
  });
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [environment, setEnvironment] = useState({
    loading: false,
    weather: null,
    aqi: null,
    error: ""
  });

  useEffect(() => {
    const loadCatalog = async () => {
      try {
        const response = await apiClient.get("/locations/catalog");
        const nextStates = (response.data?.states || [])
          .map((entry) => entry.state)
          .sort((left, right) => left.localeCompare(right));

        setStates(nextStates);
        setTypes(response.data?.types || []);
      } catch (_error) {
        setMeta({
          usedLiveResults: false,
          message: "Location directory could not be refreshed right now."
        });
      }
    };

    loadCatalog();
  }, []);

  useEffect(() => {
    const controller = new AbortController();

    const timeoutId = setTimeout(async () => {
      setLoading(true);

      try {
        const params = {
          limit: 60
        };

        if (search.trim()) {
          params.q = search.trim();
        }

        if (filters.state !== "All states") {
          params.state = filters.state;
        }

        if (filters.resultType !== "All results") {
          params.type = filters.resultType;
        }

        const response = await apiClient.get("/locations/search", {
          params,
          signal: controller.signal
        });
        const nextResults = response.data?.results || [];

        setResults(nextResults);
        setMeta({
          usedLiveResults: Boolean(response.data?.usedLiveResults),
          message:
            response.data?.message ||
            (response.data?.usedLiveResults
              ? "Real place search is active and blended with the official India directory."
              : "Showing the official India state-capital and featured-city directory.")
        });
      } catch (error) {
        if (error.name === "CanceledError" || error.code === "ERR_CANCELED") {
          return;
        }

        setResults([]);
        setMeta({
          usedLiveResults: false,
          message: "Search results could not be loaded right now."
        });
      } finally {
        setLoading(false);
      }
    }, search.trim() ? 280 : 0);

    return () => {
      clearTimeout(timeoutId);
      controller.abort();
    };
  }, [search, filters.state, filters.resultType]);

  useEffect(() => {
    if (!results.length) {
      setSelectedLocation(null);
      return;
    }

    if (!selectedLocation) {
      setSelectedLocation(results[0]);
      return;
    }

    const stillVisible = results.find(
      (item) =>
        normalizePlaceText(item.name) === normalizePlaceText(selectedLocation.name) &&
        normalizePlaceText(item.state) === normalizePlaceText(selectedLocation.state)
    );

    if (!stillVisible) {
      setSelectedLocation(results[0]);
    }
  }, [results, selectedLocation]);

  const activeLocation = selectedLocation || results[0] || null;
  const activeProfile = findDashboardProfile(activeLocation, villages);
  const modules = activeLocation
    ? buildSearchModules({
        location: activeLocation,
        profile: activeProfile,
        environment
      })
    : [];

  useEffect(() => {
    const latitude = Number(activeLocation?.latitude);
    const longitude = Number(activeLocation?.longitude);

    if (!activeLocation || !Number.isFinite(latitude) || !Number.isFinite(longitude)) {
      setEnvironment({
        loading: false,
        weather: null,
        aqi: null,
        error: ""
      });
      return;
    }

    const controller = new AbortController();

    const loadEnvironment = async () => {
      setEnvironment({
        loading: true,
        weather: null,
        aqi: null,
        error: ""
      });

      try {
        const [weatherResponse, aqiResponse] = await Promise.all([
          fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,wind_speed_10m&timezone=auto`,
            { signal: controller.signal }
          ),
          fetch(
            `https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${latitude}&longitude=${longitude}&current=us_aqi,pm2_5,pm10,nitrogen_dioxide,ozone&timezone=auto`,
            { signal: controller.signal }
          )
        ]);

        if (!weatherResponse.ok || !aqiResponse.ok) {
          throw new Error("Live environmental feed failed");
        }

        const [weatherData, aqiData] = await Promise.all([
          weatherResponse.json(),
          aqiResponse.json()
        ]);

        if (!controller.signal.aborted) {
          setEnvironment({
            loading: false,
            weather: weatherData,
            aqi: aqiData,
            error: ""
          });
        }
      } catch (_error) {
        if (!controller.signal.aborted) {
          setEnvironment({
            loading: false,
            weather: null,
            aqi: null,
            error: "Live environmental feeds are temporarily unavailable."
          });
        }
      }
    };

    loadEnvironment();

    return () => {
      controller.abort();
    };
  }, [activeLocation]);

  const renderResultCard = (record) => {
    const linkedProfile = findDashboardProfile(record, villages);
    const isActive =
      activeLocation &&
      normalizePlaceText(record.name) === normalizePlaceText(activeLocation.name) &&
      normalizePlaceText(record.state) === normalizePlaceText(activeLocation.state);

    return <button key={`${record.id || record.name}-${record.state}`} type="button" className={`search-result-card${isActive ? " active" : ""}`} onClick={() => setSelectedLocation(record)}>
  <div key="top" className="search-result-top">
    <div key="copy" className="search-result-copy">
      <strong key="name">
        {record.name}
      </strong>
      <span key="state">
        {record.state}
      </span>
    </div>
    <span key="type" className="search-result-type-pill">
      {record.type}
    </span>
  </div>
  <p key="description" className="search-result-description">
    {record.description}
  </p>
  <div key="chips" className="search-result-meta">
    <span key="source" className="search-result-badge">
      {record.sourceLabel}
    </span>
    <span key="modules" className="search-result-badge muted">
      {linkedProfile ? "Governance modules linked" : "Location verified"}
    </span>
  </div>
</button>;
  };

  return <div>
  <PageBanner key="banner" chips={["Real place search", "Smart governance modules", "Interactive maps"]} />
  <section key="body" className="search-page-section">
    <div key="container" className="container">
      <SearchToolbar key="toolbar" search={search} filters={filters} states={states} types={types} onChange={(key, value) => {
                  if (key === "search") {
                    setSearch(value);
                    return;
                  }

                  setFilters({ ...filters, [key]: value });
                }} />
      <div key="status" className="search-status-strip premium-card">
        <div key="copy" className="search-status-copy">
          <span key="kicker" className="search-status-kicker">Keshar Intelligence Layer</span>
          <strong key="title">
            {loading ? "Refreshing place intelligence..." : "Search intelligence"}
          </strong>
          <span key="text">
            {`${meta.message} This panel now prioritises soil, water, sensors, classrooms, dairy, sanitation, and maps over raw geocoder trivia.`}
          </span>
        </div>
        <div key="chips" className="page-banner-chips search-status-pills">
          <span key="states" className="page-chip">
            {`${states.length || 28} states covered`}
          </span>
          <span key="results" className="page-chip">
            {`${results.length} live matches`}
          </span>
          <span key="source" className="page-chip">
            {meta.usedLiveResults ? "Live + official" : "Official directory"}
          </span>
        </div>
      </div>
      <div key="layout" className="search-layout-grid">
        <div key="resultsPanel" className="premium-card search-results-panel">
          <div key="head" className="search-panel-header">
            <div key="copy" className="search-panel-copy">
              <span key="eyebrow" className="section-eyebrow">Verified place results</span>
              <h3 key="title" className="table-title">Choose a place to inspect</h3>
            </div>
            <span key="count" className="search-panel-count">
              {`${results.length} result${results.length === 1 ? "" : "s"}`}
            </span>
          </div>
          {results.length
                        ? <div key="grid" className="search-result-grid">
            {results.map((record) => renderResultCard(record))}
          </div>
                        : <div key="empty" className="search-empty-state">
            <strong key="title">No place matched that search.</strong>
            <p key="text">Try a state name, state capital, or city such as Patna, Mumbai, Varanasi, Bengaluru, or Mandi.</p>
          </div>}
        </div>
        <div key="detailPanel" className="premium-card search-detail-panel">
          {activeLocation
                        ? <div key="detail" className="search-detail-shell">
            <div key="hero" className="search-detail-hero">
              <div key="copy" className="search-detail-copy">
                <span key="eyebrow" className="section-eyebrow">Selected place dashboard</span>
                <h3 key="title" className="search-detail-title">
                  {activeLocation.name}
                </h3>
                <p key="text" className="search-detail-description">
                  {activeProfile?.searchDashboardIntro
                                            ? activeProfile.searchDashboardIntro
                                            : activeProfile
                                              ? `This place is linked to the smart dashboard dataset for ${activeProfile.areaName}. The cards below now surface governance modules instead of raw geocoder details.`
                                              : "This place is verified through the India location directory. Governance cards below show linked live modules first and mark missing local feeds honestly."}
                </p>
              </div>
              <div key="chips" className="search-detail-chip-stack">
                <span key="state" className="page-chip">
                  {activeLocation.state}
                </span>
                <span key="type" className="page-chip">
                  {activeLocation.type}
                </span>
                <span key="source" className="page-chip">
                  {activeLocation.sourceLabel}
                </span>
                {activeLocation.capital
                                        ? <span key="capital" className="page-chip">
                  {`Capital: ${activeLocation.capital}`}
                </span>
                                        : null}
              </div>
            </div>
            <div key="summary" className="search-summary-strip">
              <div key="soil" className="search-summary-card soil">
                <span key="label" className="search-summary-label">Soil</span>
                <strong key="value">
                  {activeProfile?.soilIntelligenceValue ||
                                            activeProfile?.soilType ||
                                            "Awaiting local feed"}
                </strong>
              </div>
              <div key="water" className="search-summary-card water">
                <span key="label" className="search-summary-label">Water supply</span>
                <strong key="value">
                  {activeProfile?.waterSupplyValue ||
                                            (activeProfile ? `${activeProfile.waterLevel}%` : "Feed pending")}
                </strong>
              </div>
              <div key="sensor" className="search-summary-card sensors">
                <span key="label" className="search-summary-label">Live sensors</span>
                <strong key="value">
                  {activeProfile?.environmentalSensorsValue ||
                                            (environment.loading
                                              ? "Refreshing"
                                              : environment.aqi?.current?.us_aqi || environment.aqi?.current?.us_aqi === 0
                                                ? `AQI ${Math.round(environment.aqi.current.us_aqi)}`
                                                : environment.error || "Waiting for live feed")}
                </strong>
              </div>
              <div key="map" className="search-summary-card map">
                <span key="label" className="search-summary-label">Map view</span>
                <a key="link" className="search-map-link" href={activeProfile?.interactiveMapsUrl ||
                                            `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                                              [activeLocation.name, activeLocation.state, "India"].filter(Boolean).join(", ")
                                            )}`} target="_blank" rel="noreferrer">
                  {activeProfile?.interactiveMapsActionLabel || "Open"}
                </a>
              </div>
            </div>
            <div key="modules" className="search-module-grid">
              {modules.map((module) =>
                                    <article key={module.key} className={`search-module-card tone-${module.tone}`}>
                <div key="top" className="search-module-top">
                  <div key="copy" className="search-module-copy">
                    <span key="eyebrow" className="search-module-source">
                      {module.source}
                    </span>
                    <strong key="title">
                      {module.title}
                    </strong>
                  </div>
                  <span key="value" className="search-module-value">
                    {module.value}
                  </span>
                </div>
                <p key="description" className="search-module-description">
                  {module.description}
                </p>
                {module.actionHref
                                          ? <a key="action" className="search-module-action" href={module.actionHref} target="_blank" rel="noreferrer">
                  {module.actionLabel}
                </a>
                                          : null}
              </article>
                                  )}
            </div>
          </div>
                        : <div key="empty" className="search-empty-state detail">
            <strong key="title">Search a place to open its dashboard view.</strong>
            <p key="text">The detail panel will show soil, water, sensors, smart dairy, digital classrooms, sanitation readiness, and map access.</p>
          </div>}
        </div>
      </div>
    </div>
  </section>
</div>;
};

export default SearchFilterPage;
