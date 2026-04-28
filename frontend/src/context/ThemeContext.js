import React, { useContext, useEffect, useState } from "react";
import { h } from "../utils/h";

const ThemeContext = React.createContext(null);

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(
    localStorage.getItem("smartVillageTheme") || "light"
  );

  useEffect(() => {
    document.body.setAttribute("data-theme", theme);
    localStorage.setItem("smartVillageTheme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((currentTheme) => (currentTheme === "light" ? "dark" : "light"));
  };

  return h(
    ThemeContext.Provider,
    {
      value: {
        theme,
        setTheme,
        toggleTheme
      }
    },
    children
  );
};

export const useTheme = () => useContext(ThemeContext);

