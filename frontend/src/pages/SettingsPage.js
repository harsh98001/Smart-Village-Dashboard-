import React from "react";
import { useTheme } from "../context/ThemeContext";
import PageBanner from "../components/layout/PageBanner";

const SettingsPage = () => {
  const { theme, setTheme, toggleTheme } = useTheme();

  return <div>
  <PageBanner key="banner" chips={["Dark mode", "Light mode", "UI controls"]} />
  <section key="body" className="settings-page-section">
    <div key="container" className="container dashboard-split-grid">
      <div key="theme" className="premium-card settings-card">
        <h3 key="title">Theme mode</h3>
        <p key="text">Switch between light and dark themes while keeping the same premium layout and rural governance aesthetic.</p>
        <div key="actions" className="banner-actions">
          <button key="light" type="button" className={theme === "light" ? "btn btn-smart-primary" : "btn btn-outline-smart"} onClick={() => setTheme("light")}>Light mode</button>
          <button key="dark" type="button" className={theme === "dark" ? "btn btn-smart-primary" : "btn btn-outline-smart"} onClick={() => setTheme("dark")}>Dark mode</button>
        </div>
      </div>
      <div key="assistant" className="premium-card settings-card">
        <h3 key="title">Assistant behaviour</h3>
        <p key="text">The floating AI assistant is global, page-aware, and always available from the bottom-right corner.</p>
        <button key="toggle" type="button" className="btn btn-outline-smart" onClick={toggleTheme}>Quick theme toggle</button>
      </div>
    </div>
  </section>
</div>;
};

export default SettingsPage;

