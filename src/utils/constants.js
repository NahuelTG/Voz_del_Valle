// src/utils/constants.js

export const VIEWS = {
   MAP: "mapa",
   ROUTES: "rutas",
   ADVENTURES: "aventuras",
   PROFILE: "perfil",
};

export const NAVIGATION_ITEMS = [
   { id: VIEWS.MAP, label: "Mapa", icon: "🗺️" },
   { id: VIEWS.ROUTES, label: "Rutas", icon: "🚴‍♂️" },
   { id: VIEWS.ADVENTURES, label: "Aventuras", icon: "📜" },
   { id: VIEWS.PROFILE, label: "Perfil", icon: "⚙️" },
];

export const ROUTES_DATA = [
   {
      id: 1,
      title: "Ruta Sonora – La Voz del Valle",
      description:
         "Descubre los sonidos únicos del valle a través de paisajes sonoros naturales y testimonios locales que han resonado por generaciones.",
      duration: "45 min",
      distance: "2.3 km",
      difficulty: "Fácil",
      code: "VALLE2024",
      isUnlocked: true,
      points: [
         { id: 1, name: "Mirador del Valle", type: "audio", icon: "🎵" },
         { id: 2, name: "Cascada Susurrante", type: "ar", icon: "📱" },
         { id: 3, name: "Plaza de los Ecos", type: "info", icon: "ℹ️" },
         { id: 4, name: "Bosque Sonoro", type: "audio", icon: "🎵" },
      ],
      stats: { photos: 12, timeSpent: "1h 23m", challenges: 3 },
   },
   {
      id: 2,
      title: "Caminos de Memoria",
      description: "Un recorrido por los lugares históricos más emblemáticos de la región, donde cada piedra cuenta una historia.",
      duration: "60 min",
      distance: "3.1 km",
      difficulty: "Medio",
      code: "MEMORIA2024",
      isUnlocked: false,
      points: [
         { id: 1, name: "Casa Colonial", type: "ar", icon: "📱" },
         { id: 2, name: "Puente Histórico", type: "info", icon: "ℹ️" },
         { id: 3, name: "Museo al Aire Libre", type: "audio", icon: "🎵" },
      ],
      stats: { photos: 0, timeSpent: "0m", challenges: 0 },
   },
   {
      id: 3,
      title: "Ecos del Pasado",
      description: "Historias y leyendas transmitidas de generación en generación cobran vida en este místico recorrido.",
      duration: "30 min",
      distance: "1.8 km",
      difficulty: "Fácil",
      code: "ECOS2024",
      isUnlocked: false,
      points: [
         { id: 1, name: "Árbol Centenario", type: "audio", icon: "🎵" },
         { id: 2, name: "Piedra de los Deseos", type: "ar", icon: "📱" },
      ],
      stats: { photos: 0, timeSpent: "0m", challenges: 0 },
   },
];

export const ACHIEVEMENTS_DATA = [
   { id: 1, name: "Explorador del Valle", icon: "🏔️", unlocked: true },
   { id: 2, name: "Guardián del Agua", icon: "💧", unlocked: false },
   { id: 3, name: "Maestro de Sonidos", icon: "🎼", unlocked: false },
];

export const TABS = {
   SUMMARY: 0,
   POINTS: 1,
   MEMORIES: 2,
};

export const TAB_LABELS = ["Resumen", "Puntos", "Recuerdos"];
