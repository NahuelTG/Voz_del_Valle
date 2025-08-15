// models/AnimalARModel.js - Modelo base genérico para todos los animales
import { ARModelBase } from "./ARModelBase";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import * as THREE from "three";

export class AnimalARModel extends ARModelBase {
   constructor(animalType, customConfig = {}) {
      // Configuración base para animales
      const animalConfig = {
         scale: { x: 1, y: 1, z: 1 },
         position: { x: 0, y: 0, z: 0 },
         rotation: { x: 0, y: 0, z: 0 },
         animationSpeed: 1.2,
         castShadow: true,
         receiveShadow: true,
         // Configuraciones específicas de animales
         eyeGlow: false,
         soundOnAppear: false,
         ...customConfig,
      };

      super(animalConfig);

      this.animalType = animalType;
      this.modelPath = this.getModelPath(animalType);
   }

   // Determinar la ruta del modelo según el tipo de animal
   getModelPath(animalType) {
      const modelPaths = {
         wolf: "/assets/models/wolf/wolf.glb",
         lobo: "/assets/models/wolf/wolf.glb",
         duende: "/assets/models/duende/duende.glb",
         gnome: "/assets/models/duende/duende.glb",
         murcielago: "/assets/models/murcielago/murcielago.glb",
         bat: "/assets/models/murcielago/murcielago.glb",
         // Fácil añadir más animales
         fox: "/assets/models/fox/fox.glb",
         rabbit: "/assets/models/rabbit/rabbit.glb",
         bird: "/assets/models/bird/bird.glb",
      };

      return modelPaths[animalType.toLowerCase()] || "/assets/models/wolf/wolf.glb";
   }

   async load() {
      try {
         const loader = new GLTFLoader();
         const gltf = await new Promise((resolve, reject) => {
            loader.load(this.modelPath, resolve, undefined, reject);
         });

         this.model = gltf.scene;
         this.setupAnimations(gltf);
         this.configure();
         this.setupAnimalSpecificFeatures();

         return this.model;
      } catch (error) {
         console.error(`Error cargando modelo del ${this.animalType}:`, error);
         throw error;
      }
   }

   setupAnimalSpecificFeatures() {
      if (!this.model) return;

      // 👁️ Configurar brillo en los ojos si está habilitado
      if (this.config.eyeGlow) {
         this.setupEyeGlow();
      }

      // 🎵 Configurar sonido si está habilitado
      if (this.config.soundOnAppear) {
         this.setupAnimalSound();
      }
   }

   setupEyeGlow() {
      this.model.traverse((child) => {
         if (child.isMesh && child.name.toLowerCase().includes("eye")) {
            if (child.material) {
               child.material.emissive = new THREE.Color(0x00ff00);
               child.material.emissiveIntensity = 0.3;
            }
         }
      });
   }

   setupAnimalSound() {
      console.log(`🔊 ${this.animalType} configurado con sonido`);
   }

   // 🎬 Método genérico para reproducir animación principal
   playMainAnimation() {
      // Buscar animación principal según el tipo de animal
      const animationNames = this.getAnimationNames();

      for (const animName of animationNames) {
         const animation = this.animations.find((anim) => anim.clip.name.toLowerCase().includes(animName));

         if (animation) {
            animation.action.reset().play();
            console.log(`🎬 ${this.animalType} ejecutando: ${animName}`);
            return;
         }
      }

      console.log(`🎬 ${this.animalType} - animación genérica`);
   }

   // Nombres de animaciones según el tipo de animal
   getAnimationNames() {
      const animationMap = {
         wolf: ["howl", "bark", "idle"],
         lobo: ["howl", "bark", "idle"],
         duende: ["magic", "dance", "idle"],
         gnome: ["magic", "dance", "idle"],
         murcielago: ["fly", "flap", "idle"],
         bat: ["fly", "flap", "idle"],
         fox: ["run", "jump", "idle"],
         rabbit: ["hop", "jump", "idle"],
         bird: ["fly", "sing", "idle"],
      };

      return animationMap[this.animalType.toLowerCase()] || ["idle"];
   }

   // Método específico para trigger (compatible con sistema actual)
   triggerModelAction(actionName) {
      switch (actionName) {
         case "playHowlAnimation":
         case "playMagicAnimation":
         case "playFlyAnimation":
         case "playMainAnimation":
         default:
            this.playMainAnimation();
            break;
      }
   }
}
