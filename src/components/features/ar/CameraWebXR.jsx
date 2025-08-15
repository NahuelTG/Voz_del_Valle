// CameraWebXR.jsx - Usando sistema MindAR con Factory Pattern
import { useRef, useState, useMemo } from "react";
import { useNavigate } from "react-router";
import * as THREE from "three";

// Hooks AR personalizados
import { useARSupport } from "../../../hooks/ar/useARSupport";
import { useThreeJS } from "../../../hooks/ar/useThreeJS";
import { useARSession } from "../../../hooks/ar/useARSession";
import { useHitTest } from "../../../hooks/ar/useHitTest";
import { useARControls } from "../../../hooks/ar/useARControls";
import { useARRender } from "../../../hooks/ar/useARRender";
import { useWindowResize } from "../../../hooks/ar/useWindowResize";

// Sistema de modelos AR
import { ARModelFactory } from "../../../models/ARModelFactory.js";

// Componentes UI
import ARLoadingIndicator from "./components/ARLoadingIndicator";
import ARErrorMessage from "./components/ARErrorMessage";
import ARSurfaceIndicator from "./components/ARSurfaceIndicator";
import ARWolfControls from "./components/ARWolfControls";
import AROverlay from "./components/AROverlay";

const CameraWebXR = () => {
   const canvasRef = useRef(null);
   const navigate = useNavigate();
   const [hasWolf, setHasWolf] = useState(false);
   const [isWolfLoaded, setIsWolfLoaded] = useState(false);
   const wolfModelRef = useRef(null);
   const anchorRef = useRef(null);

   // 🎯 Crear modelo del lobo usando Factory Pattern
   const wolfModel = useMemo(() => {
      return ARModelFactory.createModel("wolf", {
         // 🐺 Configuraciones específicas para WebXR
         scale: { x: 1, y: 1, z: 1 }, // Escala más pequeña para WebXR
         position: { x: 0, y: 0, z: 0 }, // Posición centrada
         rotation: { x: 0, y: 0, z: 0 }, // Rotación para que mire al frente
         animationSpeed: 1.2,
         eyeGlow: true,
         howlOnAppear: true,
      });
   }, []);

   // 1. Verificar soporte AR
   const isARSupported = useARSupport();

   // 2. Inicializar Three.js
   const { isReady, scene, camera, renderer, reticle, pointer } = useThreeJS(canvasRef);

   // 3. Sesión AR
   const { stopAR, isStartedRef, setIsTracked } = useARSession(renderer, isARSupported, scene);

   // 4. Hit Testing
   const { surfaceDetected, processHitTest } = useHitTest(renderer, reticle, pointer, camera, isStartedRef, setIsTracked);

   // 5. Función para añadir lobo
   const addWolf = async () => {
      if (!reticle?.visible || !scene || hasWolf || !wolfModel) return;

      try {
         console.log("🔄 Cargando modelo del lobo...");

         // Cargar el modelo
         await wolfModel.load();

         // Crear un anchor manual (grupo) en la posición del reticle
         const anchor = new THREE.Group();
         const position = new THREE.Vector3().setFromMatrixPosition(reticle.matrix);
         anchor.position.copy(position);
         anchor.position.y += 0.05; // Elevar un poco del suelo

         scene.add(anchor);
         anchorRef.current = anchor;

         // Añadir el modelo al anchor
         wolfModel.addToAnchor({ group: anchor });
         wolfModel.show();

         wolfModelRef.current = wolfModel;
         setHasWolf(true);
         setIsWolfLoaded(true);

         console.log("✅ Lobo añadido exitosamente");
      } catch (error) {
         console.error("❌ Error añadiendo lobo:", error);
      }
   };

   // 6. Función para remover TODOS los lobos
   const removeWolf = () => {
      if (!scene) return;

      try {
         // Buscar y remover todos los lobos en la escena
         const objectsToRemove = [];

         scene.traverse((child) => {
            // Buscar grupos que contengan modelos de lobo
            if (child.isGroup && child.children.length > 0) {
               // Verificar si el grupo contiene un modelo de lobo
               const hasWolfModel = child.children.some((grandchild) => grandchild.isGroup || grandchild.isMesh);
               if (hasWolfModel) {
                  objectsToRemove.push(child);
               }
            }
         });

         // Remover todos los lobos encontrados
         objectsToRemove.forEach((wolfGroup) => {
            // Limpiar materiales y geometrías
            wolfGroup.traverse((child) => {
               if (child.geometry) child.geometry.dispose();
               if (child.material) {
                  if (Array.isArray(child.material)) {
                     child.material.forEach((mat) => mat.dispose());
                  } else {
                     child.material.dispose();
                  }
               }
            });

            scene.remove(wolfGroup);
         });

         // Limpiar el modelo actual si existe
         if (wolfModelRef.current) {
            wolfModelRef.current.dispose();
            wolfModelRef.current = null;
         }

         anchorRef.current = null;
         setHasWolf(false);
         setIsWolfLoaded(false);

         console.log(`🐺 ${objectsToRemove.length} lobo(s) removido(s) del escenario`);
      } catch (error) {
         console.error("❌ Error removiendo lobos:", error);
      }
   };

   // 7. Función para hacer aullar
   const triggerHowl = () => {
      if (wolfModelRef.current) {
         wolfModelRef.current.triggerModelAction?.("playHowlAnimation");
         console.log("🐺 ¡Auuuuu! El lobo está aullando");
      }
   };

   // 8. Función shouldIgnoreSelect - EVITAR COLOCACIÓN AUTOMÁTICA
   const shouldIgnoreSelect = useRef(false);

   const setIgnoreSelect = (ignore) => {
      shouldIgnoreSelect.current = ignore;
      // Auto-reset después de un breve tiempo
      if (ignore) {
         setTimeout(() => {
            shouldIgnoreSelect.current = false;
         }, 500);
      }
   };

   const checkShouldIgnoreSelect = () => shouldIgnoreSelect.current;

   // 9. Controladores AR con protección
   useARControls(renderer, addWolf, checkShouldIgnoreSelect);

   // 10. Loop de renderizado con actualización del modelo
   const customProcessHitTest = (frame) => {
      processHitTest(frame);

      // Actualizar animaciones del lobo si está cargado
      if (isWolfLoaded && wolfModelRef.current) {
         const delta = 0.016; // ~60fps
         wolfModelRef.current.update(delta);
      }
   };

   useARRender(renderer, scene, camera, customProcessHitTest);

   // 11. Redimensionado
   useWindowResize(camera, renderer);

   // Handlers con protección contra colocación automática
   const handleStopAR = () => {
      if (hasWolf) {
         removeWolf();
      }
      stopAR();
      navigate("/");
   };

   const handleAddWolf = () => {
      if (!hasWolf && surfaceDetected) {
         setIgnoreSelect(true); // Evitar colocación automática
         addWolf();
      }
   };

   const handleRemoveWolf = () => {
      setIgnoreSelect(true); // Evitar colocación automática tras remover
      removeWolf();
   };

   const handleTriggerHowl = () => {
      setIgnoreSelect(true); // Evitar interferencia con audio
      triggerHowl();
   };

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

            <ARSurfaceIndicator surfaceDetected={surfaceDetected} hasWolf={hasWolf} />

            <ARWolfControls
               surfaceDetected={surfaceDetected}
               hasWolf={hasWolf}
               onAddWolf={handleAddWolf}
               onRemoveWolf={handleRemoveWolf}
               onTriggerHowl={handleTriggerHowl}
               onExit={handleStopAR}
            />
         </AROverlay>
      </div>
   );
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
