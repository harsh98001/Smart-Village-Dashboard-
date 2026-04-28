import React from "react";
import { h } from "../../utils/h";
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

  return h("div", { className: "app-shell" }, [
    h("div", { key: "parallaxBg", className: "app-parallax-background", "aria-hidden": "true" }, [
      h("div", { key: "grid", className: "app-parallax-grid" }),
      h("div", { key: "orbSky", className: "app-parallax-orb orb-sky" }),
      h("div", { key: "orbMilkshake", className: "app-parallax-orb orb-milkshake" }),
      h("div", { key: "orbGreen", className: "app-parallax-orb orb-green" }),
      h("div", { key: "orbMaroon", className: "app-parallax-orb orb-maroon" })
    ]),
    h(Header, { key: "header" }),
    h(NotificationRibbon, { key: "ribbon" }),
    h("main", { key: "main", className: "page-content" }, children),
    h(Footer, { key: "footer" }),
    h(AuthModal, { key: "auth" }),
    h(AssistantWidget, { key: "assistant" }),
    h(ToastStack, { key: "toasts" }),
    h(LoadingScreen, { key: "loading", active: loading })
  ]);
};

export default AppLayout;
