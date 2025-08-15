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
            name: "Voz del Valle",
            short_name: "Voz del Valle",
            description: "Experiencias de realidad aumentada en el valle",
            theme_color: "#2ecc71",
            background_color: "#ffffff",
            display: "standalone",
            orientation: "portrait",
            scope: "/",
            start_url: "/",
         },

         workbox: {
            maximumFileSizeToCacheInBytes: 10 * 1024 * 1024,

            globPatterns: ["**/*.{js,css,html,svg,png,ico}"],
            cleanupOutdatedCaches: true,
            clientsClaim: true,
            skipWaiting: true,

            runtimeCaching: [
               {
                  urlPattern: /^https:\/\/api\.mapbox\.com/,
                  handler: "CacheFirst",
                  options: {
                     cacheName: "mapbox-cache",
                     expiration: {
                        maxEntries: 100,
                        maxAgeSeconds: 60 * 60 * 24 * 30,
                     },
                  },
               },

               {
                  urlPattern: /\.(?:glb|gltf|mind)$/,
                  handler: "CacheFirst",
                  options: {
                     cacheName: "ar-models-cache",
                     expiration: {
                        maxEntries: 20,
                        maxAgeSeconds: 60 * 60 * 24 * 90,
                     },
                  },
               },

               {
                  urlPattern: /\.(?:png|jpg|jpeg|svg|webp)$/,
                  handler: "CacheFirst",
                  options: {
                     cacheName: "images-cache",
                     expiration: {
                        maxEntries: 100,
                        maxAgeSeconds: 60 * 60 * 24 * 30,
                     },
                  },
               },

               {
                  urlPattern: /\.js$/,
                  handler: "StaleWhileRevalidate",
                  options: {
                     cacheName: "js-cache",
                     expiration: {
                        maxEntries: 50,
                        maxAgeSeconds: 60 * 60 * 24 * 7,
                     },
                  },
               },
            ],
         },

         devOptions: {
            enabled: false,
            navigateFallback: "index.html",
            suppressWarnings: true,
            type: "module",
         },
      }),
   ],

   //Development
   server: {
      allowedHosts: true,
   },
   //-----------------
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

   build: {
      chunkSizeWarningLimit: 1000,

      rollupOptions: {
         output: {
            manualChunks: {
               three: ["three"],
               mindar: ["mind-ar"],
               "react-vendor": ["react", "react-dom"],
               router: ["react-router"],
               mapbox: ["mapbox-gl"],
            },
         },
      },

      minify: "terser",
      terserOptions: {
         compress: {
            drop_console: true,
            drop_debugger: true,
         },
      },
   },
});
