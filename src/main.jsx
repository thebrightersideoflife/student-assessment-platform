import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App.jsx";
import "./assets/styles/print.css";

import { ThemeProvider } from "./context/ThemeContext";

import "./assets/styles/global.css";

ReactDOM.createRoot(document.getElementById("root")).render(

  <ThemeProvider>
    <App />
  </ThemeProvider>

);
