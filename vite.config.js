import { VitePWA } from "vite-plugin-pwa";
import { defineConfig } from "vite";
import { fileURLToPath } from "url";
import react from "@vitejs/plugin-react";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// https://vitejs.dev/config/
export default defineConfig({
   plugins: [
      react(),
      VitePWA({
         registerType: "prompt",
         injectRegister: false,

         pwaAssets: {
            disabled: false,
            config: true,
         },

         manifest: {
            name: "voz_del_valle",
            short_name: "voz_del_valle",
            description: "voz_del_valle",
            theme_color: "#ffffff",
         },

         workbox: {
            globPatterns: ["**/*.{js,css,html,svg,png,ico}"],
            cleanupOutdatedCaches: true,
            clientsClaim: true,
         },

         devOptions: {
            enabled: false,
            navigateFallback: "index.html",
            suppressWarnings: true,
            type: "module",
         },
      }),
   ],
   resolve: {
      alias: {
         "@": path.resolve(__dirname, "./src"),
      },
   },
   css: {
      modules: {
         localsConvention: "camelCase",
         generateScopedName: "[name]__[local]___[hash:base64:5]",
      },
   },
});
