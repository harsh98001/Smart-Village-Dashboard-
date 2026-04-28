import React from "react";
import { Routes, Route } from "react-router-dom";
import { h } from "./utils/h";
import { ThemeProvider } from "./context/ThemeContext";
import { ToastProvider } from "./context/ToastContext";
import { AuthProvider } from "./context/AuthContext";
import { DataProvider } from "./context/DataContext";
import AppLayout from "./components/layout/AppLayout";
import LandingPage from "./pages/LandingPage";
import HomeDashboardPage from "./pages/HomeDashboardPage";
import AnalyticsPage from "./pages/AnalyticsPage";
import GrowthPage from "./pages/GrowthPage";
import SoilPage from "./pages/SoilPage";
import WaterPage from "./pages/WaterPage";
import ElectricityPage from "./pages/ElectricityPage";
import AgriculturePage from "./pages/AgriculturePage";
import InfrastructurePage from "./pages/InfrastructurePage";
import HealthPage from "./pages/HealthPage";
import EducationPage from "./pages/EducationPage";
import TechnologyPage from "./pages/TechnologyPage";
import IndustriesPage from "./pages/IndustriesPage";
import MoreSectorsPage from "./pages/MoreSectorsPage";
import VillageDetailPage from "./pages/VillageDetailPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import AdminEntryPage from "./pages/AdminEntryPage";
import ReportsPage from "./pages/ReportsPage";
import NotificationsPage from "./pages/NotificationsPage";
import ProfilePage from "./pages/ProfilePage";
import SettingsPage from "./pages/SettingsPage";
import SearchFilterPage from "./pages/SearchFilterPage";
import ContactPage from "./pages/ContactPage";

const AppRoutes = () =>
  h(Routes, null, [
    h(Route, { key: "landing", path: "/", element: h(LandingPage) }),
    h(Route, { key: "dashboard", path: "/dashboard", element: h(HomeDashboardPage) }),
    h(Route, { key: "analytics", path: "/analytics", element: h(AnalyticsPage) }),
    h(Route, { key: "growth", path: "/growth", element: h(GrowthPage) }),
    h(Route, { key: "soil", path: "/soil", element: h(SoilPage) }),
    h(Route, { key: "water", path: "/water", element: h(WaterPage) }),
    h(Route, { key: "electricity", path: "/electricity", element: h(ElectricityPage) }),
    h(Route, { key: "agriculture", path: "/agriculture", element: h(AgriculturePage) }),
    h(Route, {
      key: "infrastructure",
      path: "/infrastructure",
      element: h(InfrastructurePage)
    }),
    h(Route, { key: "health", path: "/health", element: h(HealthPage) }),
    h(Route, { key: "education", path: "/education", element: h(EducationPage) }),
    h(Route, { key: "technology", path: "/technology", element: h(TechnologyPage) }),
    h(Route, { key: "industries", path: "/industries", element: h(IndustriesPage) }),
    h(Route, { key: "more", path: "/more-sectors", element: h(MoreSectorsPage) }),
    h(Route, { key: "detail", path: "/villages/:id", element: h(VillageDetailPage) }),
    h(Route, { key: "login", path: "/login", element: h(LoginPage) }),
    h(Route, { key: "signup", path: "/signup", element: h(SignupPage) }),
    h(Route, { key: "admin", path: "/admin-entry", element: h(AdminEntryPage) }),
    h(Route, { key: "reports", path: "/reports", element: h(ReportsPage) }),
    h(Route, {
      key: "notifications",
      path: "/notifications",
      element: h(NotificationsPage)
    }),
    h(Route, { key: "profile", path: "/profile", element: h(ProfilePage) }),
    h(Route, { key: "settings", path: "/settings", element: h(SettingsPage) }),
    h(Route, { key: "search", path: "/search", element: h(SearchFilterPage) }),
    h(Route, { key: "contact", path: "/contact", element: h(ContactPage) })
  ]);

const App = () =>
  h(ThemeProvider, null, [
    h(ToastProvider, { key: "toasts" }, [
      h(AuthProvider, { key: "auth" }, [
        h(DataProvider, { key: "data" }, [
          h(AppLayout, { key: "layout" }, h(AppRoutes))
        ])
      ])
    ])
  ]);

export default App;

