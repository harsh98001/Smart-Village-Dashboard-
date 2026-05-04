import React, { useContext, useEffect, useState } from "react";
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

  return <ThemeContext.Provider value={{
        theme,
        setTheme,
        toggleTheme
      }}>
  {children}
</ThemeContext.Provider>;
};

export const useTheme = () => useContext(ThemeContext);

