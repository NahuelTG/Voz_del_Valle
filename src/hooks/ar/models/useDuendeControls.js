// hooks/ar/models/useDuendeControls.js
import { useARModelBase } from "../useARModelBase.js";

export const useDuendeControls = () => {
   const duendeConfig = {
      scale: { x: 0.8, y: 0.8, z: 0.8 },
      position: { x: 0, y: 0, z: 0 },
      rotation: { x: 0, y: Math.PI * 0.5, z: 0 },
      animationSpeed: 1.0,
      eyeGlow: false,
      howlOnAppear: false,
   };

   const baseControls = useARModelBase("duende", duendeConfig);

   // Función específica para acción del duende
   const triggerDuendeAction = () => {
      baseControls.triggerModelAction("playMagicAnimation");
   };

   return {
      ...baseControls,
      // Alias específicos del duende
      hasDuende: baseControls.hasModel,
      isDuendeLoaded: baseControls.isModelLoaded,
      addDuende: baseControls.addModel,
      removeDuende: baseControls.removeModel,
      triggerDuendeAction,
      updateDuende: baseControls.updateModel,
   };
};
