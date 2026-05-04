import React from "react";
import { Routes, Route } from "react-router-dom";
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
  <Routes>
  <Route key="landing" path="/" element={<LandingPage />} />
  <Route key="dashboard" path="/dashboard" element={<HomeDashboardPage />} />
  <Route key="analytics" path="/analytics" element={<AnalyticsPage />} />
  <Route key="growth" path="/growth" element={<GrowthPage />} />
  <Route key="soil" path="/soil" element={<SoilPage />} />
  <Route key="water" path="/water" element={<WaterPage />} />
  <Route key="electricity" path="/electricity" element={<ElectricityPage />} />
  <Route key="agriculture" path="/agriculture" element={<AgriculturePage />} />
  <Route key="infrastructure" path="/infrastructure" element={<InfrastructurePage />} />
  <Route key="health" path="/health" element={<HealthPage />} />
  <Route key="education" path="/education" element={<EducationPage />} />
  <Route key="technology" path="/technology" element={<TechnologyPage />} />
  <Route key="industries" path="/industries" element={<IndustriesPage />} />
  <Route key="more" path="/more-sectors" element={<MoreSectorsPage />} />
  <Route key="detail" path="/villages/:id" element={<VillageDetailPage />} />
  <Route key="login" path="/login" element={<LoginPage />} />
  <Route key="signup" path="/signup" element={<SignupPage />} />
  <Route key="admin" path="/admin-entry" element={<AdminEntryPage />} />
  <Route key="reports" path="/reports" element={<ReportsPage />} />
  <Route key="notifications" path="/notifications" element={<NotificationsPage />} />
  <Route key="profile" path="/profile" element={<ProfilePage />} />
  <Route key="settings" path="/settings" element={<SettingsPage />} />
  <Route key="search" path="/search" element={<SearchFilterPage />} />
  <Route key="contact" path="/contact" element={<ContactPage />} />
</Routes>;

const App = () =>
  <ThemeProvider>
  <ToastProvider key="toasts">
    <AuthProvider key="auth">
      <DataProvider key="data">
        <AppLayout key="layout">
          <AppRoutes />
        </AppLayout>
      </DataProvider>
    </AuthProvider>
  </ToastProvider>
</ThemeProvider>;

export default App;

