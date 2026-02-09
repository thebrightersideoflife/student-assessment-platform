import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

export default function ThemeToggle() {

  const { theme, toggleTheme } = useContext(ThemeContext);

  return (

    <button className="button" onClick={toggleTheme}>

      {theme === "dark" ? "Light Mode" : "Dark Mode"}

    </button>

  );

}
