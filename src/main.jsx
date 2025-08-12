// src/main.jsx (actualizado)
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import App from "./App.jsx";

// Importar estilos globales
import "./styles/variables.css";
import "./styles/themes.css";
import "./styles/globals.css";

// Configurar tema inicial antes del renderizado
(function () {
   const theme = localStorage.getItem("theme")
      ? JSON.parse(localStorage.getItem("theme"))
      : window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
   document.documentElement.setAttribute("data-theme", theme);
})();

createRoot(document.getElementById("root")).render(
   <StrictMode>
      <BrowserRouter>
         <App />
      </BrowserRouter>
   </StrictMode>
);
