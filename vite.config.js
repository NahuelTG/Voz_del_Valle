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
            // 🔧 SOLUCIÓN: Aumentar el límite de tamaño de archivos
            maximumFileSizeToCacheInBytes: 10 * 1024 * 1024, // 10 MB

            globPatterns: ["**/*.{js,css,html,svg,png,ico}"],
            cleanupOutdatedCaches: true,
            clientsClaim: true,
            skipWaiting: true,

            // 📦 Estrategias de caché para diferentes tipos de archivos
            runtimeCaching: [
               // Mapbox tiles y API
               {
                  urlPattern: /^https:\/\/api\.mapbox\.com/,
                  handler: "CacheFirst",
                  options: {
                     cacheName: "mapbox-cache",
                     expiration: {
                        maxEntries: 100,
                        maxAgeSeconds: 60 * 60 * 24 * 30, // 30 días
                     },
                  },
               },
               // Modelos 3D y archivos AR
               {
                  urlPattern: /\.(?:glb|gltf|mind)$/,
                  handler: "CacheFirst",
                  options: {
                     cacheName: "ar-models-cache",
                     expiration: {
                        maxEntries: 20,
                        maxAgeSeconds: 60 * 60 * 24 * 90, // 90 días
                     },
                  },
               },
               // Imágenes
               {
                  urlPattern: /\.(?:png|jpg|jpeg|svg|webp)$/,
                  handler: "CacheFirst",
                  options: {
                     cacheName: "images-cache",
                     expiration: {
                        maxEntries: 100,
                        maxAgeSeconds: 60 * 60 * 24 * 30, // 30 días
                     },
                  },
               },
               // JavaScript chunks (para lazy loading)
               {
                  urlPattern: /\.js$/,
                  handler: "StaleWhileRevalidate",
                  options: {
                     cacheName: "js-cache",
                     expiration: {
                        maxEntries: 50,
                        maxAgeSeconds: 60 * 60 * 24 * 7, // 7 días
                     },
                  },
               },
            ],

            // 🚫 Archivos a ignorar del precaching
            globIgnores: [
               "**/node_modules/**/*",
               // Opcional: excluir chunks muy grandes del precaching inicial
               // '**/assets/three-*.js',
               // '**/assets/mindar-*.js',
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

   // 🏗️ Optimizaciones de build para reducir tamaño
   build: {
      // Aumentar límite de advertencia
      chunkSizeWarningLimit: 1000,

      rollupOptions: {
         output: {
            // 📦 Code splitting para dividir el bundle grande
            manualChunks: {
               // Separar librerías pesadas
               three: ["three"],
               mindar: ["mind-ar"],
               "react-vendor": ["react", "react-dom"],
               router: ["react-router-dom"],
               mapbox: ["mapbox-gl"],
            },
         },
      },

      // 🗜️ Minificación optimizada
      minify: "terser",
      terserOptions: {
         compress: {
            drop_console: true, // Eliminar console.log en producción
            drop_debugger: true,
         },
      },
   },

   // 🚀 Optimizaciones adicionales
   define: {
      "process.env.NODE_ENV": JSON.stringify("production"),
   },
});
