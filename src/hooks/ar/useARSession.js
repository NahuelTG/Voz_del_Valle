// hooks/ar/useARSession.js
import { useState, useEffect, useRef, useCallback } from "react";

export const useARSession = (renderer, isARSupported, scene) => {
   const [isStarted, setIsStarted] = useState(false);
   const [isTracked, setIsTracked] = useState(false);
   const isStartedRef = useRef(false);
   const isTrackedRef = useRef(false);
   const sessionInitialized = useRef(false);

   const startAR = useCallback(async () => {
      if (!isARSupported || !renderer || sessionInitialized.current) return;

      try {
         console.log("🚀 Iniciando sesión AR...");

         const session = await navigator.xr.requestSession("immersive-ar", {
            requiredFeatures: ["hit-test"],
            optionalFeatures: ["dom-overlay"],
            domOverlay: { root: document.getElementById("ar-ui") },
         });

         renderer.xr.setReferenceSpaceType("local");

         session.addEventListener("visibilitychange", () => {
            if (session.visibilityState === "visible") {
               console.log("✅ Sesión AR visible y lista");
               isStartedRef.current = true;
               setIsStarted(true);
            }
         });

         // Configurar la sesión
         await renderer.xr.setSession(session);
         sessionInitialized.current = true;

         console.log("🎯 Sesión AR configurada");
      } catch (error) {
         console.log("🔄 Fallback: Intentando sin DOM overlay...");
         try {
            const session = await navigator.xr.requestSession("immersive-ar", {
               requiredFeatures: ["hit-test"],
            });

            renderer.xr.setReferenceSpaceType("local");

            session.addEventListener("visibilitychange", () => {
               if (session.visibilityState === "visible") {
                  console.log("✅ Sesión AR visible (fallback)");
                  isStartedRef.current = true;
                  setIsStarted(true);
               }
            });

            await renderer.xr.setSession(session);
            sessionInitialized.current = true;
         } catch (fallbackError) {
            console.error("❌ Error iniciando AR:", fallbackError, error);
         }
      }
   }, [isARSupported, renderer]);

   const stopAR = useCallback(() => {
      const session = renderer?.xr.getSession();
      if (session) {
         session.end();
      }
   }, [renderer]);

   useEffect(() => {
      if (!renderer) return;

      const handleSessionStart = () => {
         console.log("🎬 Sesión AR iniciada");
         if (scene) scene.background = null;

         setTimeout(() => {
            isStartedRef.current = true;
            setIsStarted(true);
         }, 500);
      };

      const handleSessionEnd = () => {
         console.log("🛑 Sesión AR terminada");
         isStartedRef.current = false;
         isTrackedRef.current = false;
         sessionInitialized.current = false;
         setIsStarted(false);
         setIsTracked(false);
      };

      renderer.xr.addEventListener("sessionstart", handleSessionStart);
      renderer.xr.addEventListener("sessionend", handleSessionEnd);

      return () => {
         renderer.xr.removeEventListener("sessionstart", handleSessionStart);
         renderer.xr.removeEventListener("sessionend", handleSessionEnd);
      };
   }, [renderer, scene]);

   useEffect(() => {
      if (isARSupported && renderer && !sessionInitialized.current) {
         setTimeout(startAR, 2000);
      }
   }, [isARSupported, renderer, startAR]);

   return {
      startAR,
      stopAR,
      isStarted,
      isTracked,
      isStartedRef,
      isTrackedRef,
      setIsTracked,
   };
};
