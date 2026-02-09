import { createContext, useEffect, useState } from "react";

export const ThemeContext = createContext();

function getSystemTheme() {

  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";

}

export function ThemeProvider({ children }) {

  const [theme, setTheme] = useState(
    localStorage.getItem("theme") || getSystemTheme()
  );

  useEffect(() => {

    document.documentElement.setAttribute("data-theme", theme);

    localStorage.setItem("theme", theme);

  }, [theme]);

  function toggleTheme() {

    setTheme(prev =>
      prev === "dark" ? "light" : "dark"
    );

  }

  return (

    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>

  );

}
