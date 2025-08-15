// hooks/ar/useARRender.js - SOLUCIÓN COMPLETA
import { useEffect, useCallback, useRef } from "react";

export const useARRender = (renderer, scene, camera, processHitTest, isStartedRef) => {
   const animationLoopActive = useRef(false);

   const render = useCallback(
      (timestamp, frame) => {
         if (!renderer || !scene || !camera) return;

         if (!isStartedRef?.current || !frame || !renderer.xr.isPresenting) {
            return;
         }

         try {
            if (processHitTest) {
               processHitTest(frame);
            }

            renderer.clear();

            renderer.render(scene, camera);
         } catch (error) {
            console.warn("Error en renderizado XR:", error);

            if (renderer && animationLoopActive.current) {
               renderer.setAnimationLoop(null);
               animationLoopActive.current = false;
            }
         }
      },
      [renderer, scene, camera, processHitTest, isStartedRef]
   );

   useEffect(() => {
      if (!renderer) return;

      if (!animationLoopActive.current) {
         renderer.setAnimationLoop(render);
         animationLoopActive.current = true;
      }

      return () => {
         if (renderer && animationLoopActive.current) {
            renderer.setAnimationLoop(null);
            animationLoopActive.current = false;
         }
      };
   }, [renderer, render]);

   useEffect(() => {
      if (!isStartedRef?.current && renderer && animationLoopActive.current) {
         renderer.setAnimationLoop(null);
         animationLoopActive.current = false;

         setTimeout(() => {
            if (isStartedRef?.current && renderer && !animationLoopActive.current) {
               renderer.setAnimationLoop(render);
               animationLoopActive.current = true;
            }
         }, 100);
      }
   }, [renderer, render, isStartedRef]);

   return { render };
};
