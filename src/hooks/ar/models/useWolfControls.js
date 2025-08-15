// hooks/ar/models/useWolfControls.js
import { useARModelBase } from "../useARModelBase.js";

export const useWolfControls = () => {
   const wolfConfig = {
      scale: { x: 1, y: 1, z: 1 },
      position: { x: 0, y: 0, z: 0 },
      rotation: { x: 0, y: 0, z: 0 },
      animationSpeed: 1.2,
      eyeGlow: true,
      howlOnAppear: true,
   };

   const baseControls = useARModelBase("wolf", wolfConfig);

   // Función específica para aullar (mantiene mismo nombre por compatibilidad)
   const triggerHowl = () => {
      baseControls.triggerModelAction("playHowlAnimation");
   };

   return {
      ...baseControls,
      // Alias específicos del lobo
      hasWolf: baseControls.hasModel,
      isWolfLoaded: baseControls.isModelLoaded,
      addWolf: baseControls.addModel,
      removeWolf: baseControls.removeModel,
      triggerHowl,
      updateWolf: baseControls.updateModel,
   };
};
