import React, { useContext, useEffect, useState } from "react";
import { h } from "../utils/h";
import apiClient from "../api/client";
import {
  sampleVillages,
  sampleNotifications
} from "../data/sampleVillages";
import {
  buildOverviewFromVillages,
  fallbackTrends
} from "../data/dashboardSeed";

const DataContext = React.createContext(null);

const findVillageById = (villages, id) =>
  villages.find((village) => String(village._id) === String(id));

export const DataProvider = ({ children }) => {
  const [villages, setVillages] = useState(sampleVillages);
  const [notifications, setNotifications] = useState(sampleNotifications);
  const [overview, setOverview] = useState(
    buildOverviewFromVillages(sampleVillages, sampleNotifications)
  );
  const [trends, setTrends] = useState(fallbackTrends);
  const [loading, setLoading] = useState(false);

  const syncDerivedState = (nextVillages, nextNotifications) => {
    setOverview(buildOverviewFromVillages(nextVillages, nextNotifications));
  };

  const refreshAll = async () => {
    setLoading(true);

    try {
      const villageResponse = await apiClient.get("/villages?limit=120");
      const nextVillages = villageResponse.data?.villages?.length
        ? villageResponse.data.villages
        : sampleVillages;

      setVillages(nextVillages);

      const results = await Promise.allSettled([
        apiClient.get("/dashboard/overview"),
        apiClient.get("/dashboard/trends"),
        apiClient.get("/notifications")
      ]);

      const overviewResult = results[0];
      const trendsResult = results[1];
      const notificationsResult = results[2];

      const nextNotifications =
        notificationsResult.status === "fulfilled" &&
        notificationsResult.value.data?.notifications?.length
          ? notificationsResult.value.data.notifications
          : sampleNotifications;

      setNotifications(nextNotifications);

      if (overviewResult.status === "fulfilled" && overviewResult.value.data?.overview) {
        setOverview(overviewResult.value.data.overview);
      } else {
        setOverview(buildOverviewFromVillages(nextVillages, nextNotifications));
      }

      if (trendsResult.status === "fulfilled" && trendsResult.value.data?.trends) {
        setTrends(trendsResult.value.data.trends);
      } else {
        setTrends(fallbackTrends);
      }
    } catch (_error) {
      setVillages(sampleVillages);
      setNotifications(sampleNotifications);
      setOverview(buildOverviewFromVillages(sampleVillages, sampleNotifications));
      setTrends(fallbackTrends);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshAll();
  }, []);

  const fetchVillageById = async (id) => {
    try {
      const response = await apiClient.get(`/villages/${id}`);
      return response.data?.village || findVillageById(villages, id);
    } catch (_error) {
      return findVillageById(villages, id);
    }
  };

  const saveVillage = async (payload) => {
    const isUpdate = Boolean(payload._id);
    const route = isUpdate ? `/villages/${payload._id}` : "/villages";
    const method = isUpdate ? "put" : "post";

    const response = await apiClient[method](route, payload);
    const savedVillage = response.data.village;

    const nextVillages = isUpdate
      ? villages.map((village) =>
          String(village._id) === String(savedVillage._id) ? savedVillage : village
        )
      : [savedVillage, ...villages];

    setVillages(nextVillages);
    syncDerivedState(nextVillages, notifications);
    return savedVillage;
  };

  const removeVillage = async (id) => {
    await apiClient.delete(`/villages/${id}`);
    const nextVillages = villages.filter(
      (village) => String(village._id) !== String(id)
    );
    setVillages(nextVillages);
    syncDerivedState(nextVillages, notifications);
  };

  const publishNotification = async (payload) => {
    const response = await apiClient.post("/notifications", payload);
    const nextNotifications = [response.data.notification, ...notifications];
    setNotifications(nextNotifications);
    syncDerivedState(villages, nextNotifications);
    return response.data.notification;
  };

  const deleteNotification = async (id) => {
    await apiClient.delete(`/notifications/${id}`);
    const nextNotifications = notifications.filter(
      (notification) => String(notification._id) !== String(id)
    );
    setNotifications(nextNotifications);
    syncDerivedState(villages, nextNotifications);
  };

  return h(
    DataContext.Provider,
    {
      value: {
        villages,
        notifications,
        overview,
        trends,
        loading,
        refreshAll,
        fetchVillageById,
        saveVillage,
        removeVillage,
        publishNotification,
        deleteNotification
      }
    },
    children
  );
};

export const useData = () => useContext(DataContext);
