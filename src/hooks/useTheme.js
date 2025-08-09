// src/hooks/useTheme.js
import { useEffect } from "react";
import { useLocalStorage } from "./useLocalStorage";

const getSystemTheme = () => {
   return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
};

export const useTheme = () => {
   const [theme, setTheme] = useLocalStorage("theme", getSystemTheme());

   useEffect(() => {
      document.documentElement.setAttribute("data-theme", theme);
   }, [theme]);

   useEffect(() => {
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
      const handleChange = (e) => {
         const systemTheme = e.matches ? "dark" : "light";
         if (!localStorage.getItem("theme")) {
            setTheme(systemTheme);
         }
      };

      mediaQuery.addEventListener("change", handleChange);
      return () => mediaQuery.removeEventListener("change", handleChange);
   }, [setTheme]);

   const toggleTheme = () => {
      setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
   };

   return { theme, toggleTheme, setTheme };
};
