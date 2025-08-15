// CameraWebXR.jsx - Componente genérico para cualquier modelo AR
import { useRef, useMemo } from "react";
import { useNavigate } from "react-router";
import PropTypes from "prop-types";

// Hooks AR personalizados
import { useARSupport } from "../../../hooks/ar/useARSupport";
import { useThreeJS } from "../../../hooks/ar/useThreeJS";
import { useARSession } from "../../../hooks/ar/useARSession";
import { useHitTest } from "../../../hooks/ar/useHitTest";
import { useARControls } from "../../../hooks/ar/useARControls";
import { useARRender } from "../../../hooks/ar/useARRender";
import { useWindowResize } from "../../../hooks/ar/useWindowResize";

// Hooks específicos de modelos
import { useWolfControls } from "../../../hooks/ar/models/useWolfControls.js";
import { useDuendeControls } from "../../../hooks/ar/models/useDuendeControls.js";
import { useMurcielagoControls } from "../../../hooks/ar/models/useMurcielagoControls.js";

// Componentes UI
import ARLoadingIndicator from "./components/ARLoadingIndicator";
import ARErrorMessage from "./components/ARErrorMessage";
import ARSurfaceIndicator from "./components/ARSurfaceIndicator";
import ARModelControls from "./components/ARModelControls"; // Componente genérico
import AROverlay from "./components/AROverlay";

const CameraWebXR = ({ modelType = "wolf" }) => {
   const canvasRef = useRef(null);
   const navigate = useNavigate();

   // 🎯 Llamar todos los hooks siempre (reglas de React)
   const wolfControls = useWolfControls();
   const duendeControls = useDuendeControls();
   const murcielagoControls = useMurcielagoControls();

   // Seleccionar el control activo según el tipo de modelo
   const modelControls = useMemo(() => {
      switch (modelType.toLowerCase()) {
         case "wolf":
         case "lobo":
            return wolfControls;
         case "duende":
         case "gnome":
            return duendeControls;
         case "murcielago":
         case "bat":
            return murcielagoControls;
         default:
            console.warn(`Tipo de modelo no reconocido: ${modelType}, usando lobo por defecto`);
            return wolfControls;
      }
   }, [modelType, wolfControls, duendeControls, murcielagoControls]);

   // Extraer datos del hook seleccionado
   const { hasModel, isModelLoaded, addModel, removeModel, triggerModelAction, updateModel, setIgnoreSelect, checkShouldIgnoreSelect } =
      modelControls;

   // 1. Verificar soporte AR
   const isARSupported = useARSupport();

   // 2. Inicializar Three.js
   const { isReady, scene, camera, renderer, reticle, pointer } = useThreeJS(canvasRef);

   // 3. Sesión AR
   const { stopAR, isStartedRef, setIsTracked } = useARSession(renderer, isARSupported, scene);

   // 4. Hit Testing
   const { surfaceDetected, processHitTest } = useHitTest(renderer, reticle, pointer, camera, isStartedRef, setIsTracked);

   // 5. Controladores AR
   useARControls(renderer, () => addModel(reticle, scene), checkShouldIgnoreSelect);

   // 6. Loop de renderizado con actualización del modelo
   const customProcessHitTest = (frame) => {
      processHitTest(frame);

      // Actualizar animaciones del modelo si está cargado
      if (isModelLoaded) {
         const delta = 0.016; // ~60fps
         updateModel(delta);
      }
   };

   useARRender(renderer, scene, camera, customProcessHitTest);

   // 7. Redimensionado
   useWindowResize(camera, renderer);

   // Handlers con protección contra colocación automática
   const handleStopAR = () => {
      if (hasModel) {
         removeModel(scene);
      }
      stopAR();
      navigate("/");
   };

   const handleAddModel = () => {
      if (!hasModel && surfaceDetected) {
         setIgnoreSelect(true);
         addModel(reticle, scene);
      }
   };

   const handleRemoveModel = () => {
      setIgnoreSelect(true);
      removeModel(scene);
   };

   const handleTriggerAction = () => {
      setIgnoreSelect(true);
      triggerModelAction();
   };

   // Configuración específica por modelo para UI
   const getModelConfig = () => {
      switch (modelType.toLowerCase()) {
         case "wolf":
         case "lobo":
            return {
               name: "Lobo del Valle",
               icon: "🐺",
               actionIcon: "🎵",
               actionText: "Aullar",
            };
         case "duende":
         case "gnome":
            return {
               name: "Duende Mágico",
               icon: "🧚‍♂️",
               actionIcon: "✨",
               actionText: "Magia",
            };
         case "murcielago":
         case "bat":
            return {
               name: "Murciélago Nocturno",
               icon: "🦇",
               actionIcon: "🌙",
               actionText: "Volar",
            };
         default:
            return {
               name: "Modelo AR",
               icon: "🎭",
               actionIcon: "🎬",
               actionText: "Acción",
            };
      }
   };

   const modelConfig = getModelConfig();

   return (
      <div style={containerStyles}>
         {/* Canvas de Three.js */}
         <canvas
            ref={canvasRef}
            style={{
               ...canvasStyles,
               display: isReady ? "block" : "none",
            }}
         />

         {/* DOM Overlay */}
         <AROverlay>
            <ARLoadingIndicator isReady={isReady} />

            <ARErrorMessage isReady={isReady} isARSupported={isARSupported} />

            <ARSurfaceIndicator surfaceDetected={surfaceDetected} hasModel={hasModel} modelConfig={modelConfig} />

            <ARModelControls
               surfaceDetected={surfaceDetected}
               hasModel={hasModel}
               modelConfig={modelConfig}
               onAddModel={handleAddModel}
               onRemoveModel={handleRemoveModel}
               onTriggerAction={handleTriggerAction}
               onExit={handleStopAR}
            />
         </AROverlay>
      </div>
   );
};

CameraWebXR.propTypes = {
   modelType: PropTypes.string,
};

// Estilos
const containerStyles = {
   position: "relative",
   width: "100vw",
   height: "100vh",
   margin: 0,
   padding: 0,
   backgroundColor: "#000",
   overflow: "hidden",
};

const canvasStyles = {
   position: "absolute",
   top: 0,
   left: 0,
   width: "100%",
   height: "100%",
   pointerEvents: "none",
   zIndex: 1,
};

export default CameraWebXR;
