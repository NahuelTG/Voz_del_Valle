// hooks/ar/useARModelBase.js - Hook base común para todos los modelos AR
import { useRef, useState } from "react";
import * as THREE from "three";
import { ARModelFactory } from "../../models/ARModelFactory.js";

export const useARModelBase = (modelType, modelConfig = {}) => {
   const [hasModel, setHasModel] = useState(false);
   const [isModelLoaded, setIsModelLoaded] = useState(false);
   const modelRef = useRef(null);
   const anchorRef = useRef(null);
   const shouldIgnoreSelect = useRef(false);

   // Crear modelo usando Factory Pattern
   const model = ARModelFactory.createModel(modelType, modelConfig);

   // Función para ignorar selecciones temporalmente
   const setIgnoreSelect = (ignore) => {
      shouldIgnoreSelect.current = ignore;
      if (ignore) {
         setTimeout(() => {
            shouldIgnoreSelect.current = false;
         }, 500);
      }
   };

   const checkShouldIgnoreSelect = () => shouldIgnoreSelect.current;

   // Función para añadir modelo
   const addModel = async (reticle, scene) => {
      if (!reticle?.visible || !scene || hasModel || !model) {
         console.log(`🚫 No se puede añadir ${modelType}:`, {
            reticleVisible: reticle?.visible,
            hasScene: !!scene,
            hasModel,
            hasModelInstance: !!model,
         });
         return;
      }

      try {
         console.log(`🔄 Cargando modelo ${modelType}...`);

         // Cargar el modelo
         await model.load();

         // Crear anchor en la posición del reticle
         const anchor = new THREE.Group();
         const position = new THREE.Vector3().setFromMatrixPosition(reticle.matrix);
         anchor.position.copy(position);
         anchor.position.y += 0.05;

         scene.add(anchor);
         anchorRef.current = anchor;

         // Añadir modelo al anchor
         model.addToAnchor({ group: anchor });
         model.show();

         modelRef.current = model;
         setHasModel(true);
         setIsModelLoaded(true);

         console.log(`✅ ${modelType} añadido exitosamente`);
      } catch (error) {
         console.error(`❌ Error añadiendo ${modelType}:`, error);
      }
   };

   // Función para remover modelo
   const removeModel = (scene) => {
      if (!scene) return;

      try {
         console.log(`🗑️ Removiendo ${modelType}...`);

         // Buscar y remover todos los modelos en la escena
         const objectsToRemove = [];

         scene.traverse((child) => {
            if (child.isGroup && child.children.length > 0) {
               const hasModelContent = child.children.some((grandchild) => grandchild.isGroup || grandchild.isMesh);
               if (hasModelContent) {
                  objectsToRemove.push(child);
               }
            }
         });

         // Limpiar todos los modelos encontrados
         objectsToRemove.forEach((modelGroup) => {
            modelGroup.traverse((child) => {
               if (child.geometry) child.geometry.dispose();
               if (child.material) {
                  if (Array.isArray(child.material)) {
                     child.material.forEach((mat) => mat.dispose());
                  } else {
                     child.material.dispose();
                  }
               }
            });
            scene.remove(modelGroup);
         });

         // Limpiar referencias
         if (modelRef.current) {
            modelRef.current.dispose();
            modelRef.current = null;
         }

         anchorRef.current = null;
         setHasModel(false);
         setIsModelLoaded(false);

         console.log(`✅ ${modelType} removido exitosamente`);
      } catch (error) {
         console.error(`❌ Error removiendo ${modelType}:`, error);
      }
   };

   // Función para triggear acción del modelo
   const triggerModelAction = (actionName = "playHowlAnimation") => {
      if (modelRef.current) {
         modelRef.current.triggerModelAction?.(actionName);
         console.log(`🎬 ${modelType} ejecutando acción: ${actionName}`);
      }
   };

   // Función para actualizar animaciones
   const updateModel = (delta) => {
      if (isModelLoaded && modelRef.current) {
         modelRef.current.update(delta);
      }
   };

   return {
      // Estados
      hasModel,
      isModelLoaded,
      modelType,

      // Referencias
      modelRef,
      anchorRef,

      // Funciones principales
      addModel,
      removeModel,
      triggerModelAction,
      updateModel,

      // Control de selección
      setIgnoreSelect,
      checkShouldIgnoreSelect,
   };
};
