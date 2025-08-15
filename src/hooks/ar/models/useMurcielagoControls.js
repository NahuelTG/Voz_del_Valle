// hooks/ar/models/useMurcielagoControls.js
import { useARModelBase } from "../useARModelBase.js";

export const useMurcielagoControls = () => {
   const murcielagoConfig = {
      scale: { x: 0.3, y: 0.3, z: 0.3 },
      position: { x: 0, y: 1, z: 0 },
      rotation: { x: 0, y: Math.PI, z: 0 },
      animationSpeed: 1.5,
      eyeGlow: true,
      howlOnAppear: false,
   };

   const baseControls = useARModelBase("murcielago", murcielagoConfig);

   // Función específica para acción del murciélago
   const triggerMurcielagoAction = () => {
      baseControls.triggerModelAction("playFlyAnimation");
   };

   return {
      ...baseControls,
      // Alias específicos del murciélago
      hasMurcielago: baseControls.hasModel,
      isMurcielagoLoaded: baseControls.isModelLoaded,
      addMurcielago: baseControls.addModel,
      removeMurcielago: baseControls.removeModel,
      triggerMurcielagoAction,
      updateMurcielago: baseControls.updateModel,
   };
};
