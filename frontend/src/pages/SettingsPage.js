import React from "react";
import { h } from "../utils/h";
import { useTheme } from "../context/ThemeContext";
import PageBanner from "../components/layout/PageBanner";

const SettingsPage = () => {
  const { theme, setTheme, toggleTheme } = useTheme();

  return h("div", null, [
    h(PageBanner, { key: "banner", chips: ["Dark mode", "Light mode", "UI controls"] }),
    h("section", { key: "body", className: "settings-page-section" }, [
      h("div", { key: "container", className: "container dashboard-split-grid" }, [
        h("div", { key: "theme", className: "premium-card settings-card" }, [
          h("h3", { key: "title" }, "Theme mode"),
          h(
            "p",
            { key: "text" },
            "Switch between light and dark themes while keeping the same premium layout and rural governance aesthetic."
          ),
          h("div", { key: "actions", className: "banner-actions" }, [
            h(
              "button",
              {
                key: "light",
                type: "button",
                className: theme === "light" ? "btn btn-smart-primary" : "btn btn-outline-smart",
                onClick: () => setTheme("light")
              },
              "Light mode"
            ),
            h(
              "button",
              {
                key: "dark",
                type: "button",
                className: theme === "dark" ? "btn btn-smart-primary" : "btn btn-outline-smart",
                onClick: () => setTheme("dark")
              },
              "Dark mode"
            )
          ])
        ]),
        h("div", { key: "assistant", className: "premium-card settings-card" }, [
          h("h3", { key: "title" }, "Assistant behaviour"),
          h(
            "p",
            { key: "text" },
            "The floating AI assistant is global, page-aware, and always available from the bottom-right corner."
          ),
          h(
            "button",
            {
              key: "toggle",
              type: "button",
              className: "btn btn-outline-smart",
              onClick: toggleTheme
            },
            "Quick theme toggle"
          )
        ])
      ])
    ])
  ]);
};

export default SettingsPage;

