import React, { useContext, useEffect, useState } from "react";
import apiClient from "../api/client";

const AuthContext = React.createContext(null);

const getStoredAuth = () => {
  const savedAuth = localStorage.getItem("smartVillageAuth");
  if (!savedAuth) {
    return { user: null, token: null };
  }

  try {
    const parsed = JSON.parse(savedAuth);
    return {
      user: parsed.user || null,
      token: parsed.token || null
    };
  } catch (_error) {
    localStorage.removeItem("smartVillageAuth");
    return { user: null, token: null };
  }
};

export const AuthProvider = ({ children }) => {
  const storedAuth = getStoredAuth();
  const [user, setUser] = useState(storedAuth.user);
  const [token, setToken] = useState(storedAuth.token);
  const [loading, setLoading] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(!storedAuth.user);
  const [authView, setAuthView] = useState("login");

  useEffect(() => {
    if (user && token) {
      localStorage.setItem("smartVillageAuth", JSON.stringify({ user, token }));
      return;
    }

    localStorage.removeItem("smartVillageAuth");
  }, [user, token]);

  const syncAuth = (payload) => {
    setUser(payload.user);
    setToken(payload.token);
    setShowAuthModal(false);
  };

  const loginUser = async (credentials) => {
    setLoading(true);
    try {
      const response = await apiClient.post("/auth/login", credentials);
      syncAuth(response.data);
      return { success: true, data: response.data };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || "Unable to login right now"
      };
    } finally {
      setLoading(false);
    }
  };

  const signupUser = async (payload) => {
    setLoading(true);
    try {
      const response = await apiClient.post("/auth/signup", payload);
      syncAuth(response.data);
      return { success: true, data: response.data };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || "Unable to create the account"
      };
    } finally {
      setLoading(false);
    }
  };

  const logoutUser = () => {
    setUser(null);
    setToken(null);
    setShowAuthModal(true);
    setAuthView("login");
  };

  const openAuth = (view = "login") => {
    setAuthView(view);
    setShowAuthModal(true);
  };

  const closeAuth = () => {
    if (user) {
      setShowAuthModal(false);
    }
  };

  return <AuthContext.Provider value={{
        user,
        token,
        loading,
        showAuthModal,
        authView,
        setAuthView,
        openAuth,
        closeAuth,
        loginUser,
        signupUser,
        logoutUser,
        isAdmin: user?.role === "admin"
      }}>
  {children}
</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);

