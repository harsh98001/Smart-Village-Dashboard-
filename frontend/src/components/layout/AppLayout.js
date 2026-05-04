import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import NotificationRibbon from "./NotificationRibbon";
import AuthModal from "./AuthModal";
import AssistantWidget from "../ui/AssistantWidget";
import ToastStack from "../ui/ToastStack";
import LoadingScreen from "../ui/LoadingScreen";
import { useData } from "../../context/DataContext";
import useGlobalParallax from "../../hooks/useGlobalParallax";

const AppLayout = ({ children }) => {
  const { loading } = useData();
  useGlobalParallax();

  return <div className="app-shell">
  <div key="parallaxBg" className="app-parallax-background" aria-hidden="true">
    <div key="grid" className="app-parallax-grid" />
    <div key="orbSky" className="app-parallax-orb orb-sky" />
    <div key="orbMilkshake" className="app-parallax-orb orb-milkshake" />
    <div key="orbGreen" className="app-parallax-orb orb-green" />
    <div key="orbMaroon" className="app-parallax-orb orb-maroon" />
  </div>
  <Header key="header" />
  <NotificationRibbon key="ribbon" />
  <main key="main" className="page-content">
    {children}
  </main>
  <Footer key="footer" />
  <AuthModal key="auth" />
  <AssistantWidget key="assistant" />
  <ToastStack key="toasts" />
  <LoadingScreen key="loading" active={loading} />
</div>;
};

export default AppLayout;
