// models/ARModelFactory.js - Factory con modelo base de animales
import { AnimalARModel } from "./AnimalARModel";

// Modelos específicos usando AnimalARModel como base
class DuendeARModel extends AnimalARModel {
   constructor(customConfig = {}) {
      const duendeConfig = {
         scale: { x: 0.8, y: 0.8, z: 0.8 },
         position: { x: 0, y: 0, z: 0 },
         rotation: { x: 0, y: Math.PI * 0.5, z: 0 },
         animationSpeed: 1.0,
         eyeGlow: false,
         soundOnAppear: true,
         ...customConfig,
      };

      super("duende", duendeConfig);
   }
}

class MurcielagoARModel extends AnimalARModel {
   constructor(customConfig = {}) {
      const murcielagoConfig = {
         scale: { x: 1.2, y: 1.2, z: 1.2 },
         position: { x: 0, y: 0.1, z: 0 },
         rotation: { x: 0, y: Math.PI, z: 0 },
         animationSpeed: 1.5,
         eyeGlow: true,
         soundOnAppear: false,
         ...customConfig,
      };

      super("murcielago", murcielagoConfig);
   }
}

// Actualizar WolfARModel para usar AnimalARModel también
class LoboARModel extends AnimalARModel {
   constructor(customConfig = {}) {
      const loboConfig = {
         scale: { x: 1, y: 1, z: 1 },
         position: { x: 0, y: 0, z: 0 },
         rotation: { x: 0, y: 0, z: 0 },
         animationSpeed: 1.2,
         eyeGlow: true,
         soundOnAppear: true,
         ...customConfig,
      };

      super("wolf", loboConfig);
   }
}

export class ARModelFactory {
   static createModel(type, config = {}) {
      switch (type.toLowerCase()) {
         case "wolf":
         case "lobo":
            return new LoboARModel(config);

         case "duende":
         case "gnome":
            return new DuendeARModel(config);

         case "murcielago":
         case "bat":
            return new MurcielagoARModel(config);

         // Fácil añadir más animales usando AnimalARModel directamente
         case "fox":
            return new AnimalARModel("fox", config);
         case "rabbit":
            return new AnimalARModel("rabbit", config);
         case "bird":
            return new AnimalARModel("bird", config);

         default:
            console.warn(`Tipo de modelo AR no soportado: ${type}, usando lobo por defecto`);
            return new LoboARModel(config);
      }
   }

   static getAvailableModels() {
      return ["wolf", "duende", "murcielago", "fox", "rabbit", "bird", "dragon"];
   }

   static getAnimalModels() {
      return ["wolf", "duende", "murcielago", "fox", "rabbit", "bird"];
   }
}
