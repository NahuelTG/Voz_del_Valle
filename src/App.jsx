import { useState } from "react";
import MapView from "./components/MapView";
import Sidebar from "./components/Sidebar";
import EnhancedRouteSlider from "./components/EnhancedRouteSlider";
import MenuButton from "./components/MenuButton";
import BottomNavigation from "./components/BottomNavigation";
import RoutesView from "./components/RoutesView";
import AdventuresView from "./components/AdventuresView";
import ProfileView from "./components/ProfileView";
import CodeModal from "./components/CodeModal";
import "./App.css";

const App = () => {
   const [isSidebarOpen, setIsSidebarOpen] = useState(false);
   const [selectedRoute, setSelectedRoute] = useState(null);
   const [currentView, setCurrentView] = useState("mapa");
   const [isDarkMode, setIsDarkMode] = useState(false);
   const [showCodeModal, setShowCodeModal] = useState(false);
   const [unlockedRoutes, setUnlockedRoutes] = useState([1]); // Ruta 1 desbloqueada por defecto

   const routes = [
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

   const achievements = [
      { id: 1, name: "Explorador del Valle", icon: "🏔️", unlocked: true },
      { id: 2, name: "Guardián del Agua", icon: "💧", unlocked: false },
      { id: 3, name: "Maestro de Sonidos", icon: "🎼", unlocked: false },
   ];

   const toggleSidebar = () => {
      setIsSidebarOpen(!isSidebarOpen);
   };

   const handleRouteSelect = (route) => {
      const isUnlocked = unlockedRoutes.includes(route.id);
      setSelectedRoute({ ...route, isUnlocked });
      setIsSidebarOpen(false);
   };

   const handleViewChange = (view) => {
      setCurrentView(view);
      setSelectedRoute(null);
   };

   const handleUnlockRoute = (code) => {
      const route = routes.find((r) => r.code === code);
      if (route && !unlockedRoutes.includes(route.id)) {
         setUnlockedRoutes([...unlockedRoutes, route.id]);
         setShowCodeModal(false);
         return true;
      }
      return false;
   };

   const renderCurrentView = () => {
      switch (currentView) {
         case "rutas":
            return (
               <RoutesView
                  routes={routes.map((r) => ({ ...r, isUnlocked: unlockedRoutes.includes(r.id) }))}
                  onRouteSelect={handleRouteSelect}
                  isDarkMode={isDarkMode}
               />
            );
         case "aventuras":
            return (
               <AdventuresView
                  routes={routes.filter((r) => unlockedRoutes.includes(r.id))}
                  achievements={achievements}
                  isDarkMode={isDarkMode}
               />
            );
         case "perfil":
            return (
               <ProfileView
                  isDarkMode={isDarkMode}
                  onToggleDarkMode={() => setIsDarkMode(!isDarkMode)}
                  onShowCodeModal={() => setShowCodeModal(true)}
               />
            );
         default:
            return <MapView isDarkMode={isDarkMode} />;
      }
   };

   return (
      <div className={`app ${isDarkMode ? "dark-mode" : ""}`}>
         {renderCurrentView()}

         {currentView === "mapa" && <MenuButton onClick={toggleSidebar} isOpen={isSidebarOpen} isDarkMode={isDarkMode} />}

         <Sidebar
            isOpen={isSidebarOpen}
            onClose={() => setIsSidebarOpen(false)}
            routes={routes.map((r) => ({ ...r, isUnlocked: unlockedRoutes.includes(r.id) }))}
            onRouteSelect={handleRouteSelect}
            isDarkMode={isDarkMode}
         />

         {selectedRoute && (
            <EnhancedRouteSlider
               route={selectedRoute}
               onClose={() => setSelectedRoute(null)}
               onShowCodeModal={() => setShowCodeModal(true)}
               isDarkMode={isDarkMode}
            />
         )}

         <BottomNavigation currentView={currentView} onViewChange={handleViewChange} isDarkMode={isDarkMode} />

         {showCodeModal && <CodeModal onClose={() => setShowCodeModal(false)} onUnlock={handleUnlockRoute} isDarkMode={isDarkMode} />}

         {isSidebarOpen && <div className="overlay" onClick={() => setIsSidebarOpen(false)} />}
      </div>
   );
};

export default App;
