import axios from "axios";

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "/api"
});

apiClient.interceptors.request.use((config) => {
  const storedAuth = localStorage.getItem("smartVillageAuth");

  if (storedAuth) {
    try {
      const parsed = JSON.parse(storedAuth);
      if (parsed.token) {
        config.headers.Authorization = `Bearer ${parsed.token}`;
      }
    } catch (_error) {
      localStorage.removeItem("smartVillageAuth");
    }
  }

  return config;
});

export default apiClient;
