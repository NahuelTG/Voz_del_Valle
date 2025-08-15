// src/App.jsx - Con rutas AR específicas
import { useState, useRef } from "react";
import { Routes, Route } from "react-router";
import { useTheme } from "./hooks/useTheme";
import { useLocalStorage } from "./hooks/useLocalStorage";

import MapView from "./components/features/map/MapView";
import RoutesView from "./components/features/routes/RoutesView";
import AdventuresView from "./components/features/adventures/AdventuresView";
import ProfileView from "./components/features/profile/ProfileView";
import Sidebar from "./components/layout/Sidebar/Sidebar";
import BottomNavigation from "./components/layout/BottomNavigation/BottomNavigation";
import MenuButton from "./components/layout/MenuButton/MenuButton";
import EnhancedRouteSlider from "./components/features/routes/EnhancedRouteSlider";
import CodeModal from "./components/features/code/CodeModal";
import CameraWebXR from "./components/features/ar/CameraWebXR"; // Componente genérico

import { VIEWS, ROUTES_DATA, ACHIEVEMENTS_DATA } from "./utils/constants";

import styles from "./App.module.css";

// Componente principal de la app
const MainApp = () => {
   const { theme, toggleTheme } = useTheme();
   const [unlockedRoutes, setUnlockedRoutes] = useLocalStorage("unlockedRoutes", [1]);

   const [isSidebarOpen, setIsSidebarOpen] = useState(false);
   const [selectedRoute, setSelectedRoute] = useState(null);
   const [currentView, setCurrentView] = useState(VIEWS.MAP);
   const [showCodeModal, setShowCodeModal] = useState(false);

   // Ref para mantener el estado del mapa
   const mapRef = useRef(null);

   const enrichedRoutes = ROUTES_DATA.map((route) => ({
      ...route,
      isUnlocked: unlockedRoutes.includes(route.id),
   }));

   const handleRouteSelect = (route) => {
      const enrichedRoute = { ...route, isUnlocked: unlockedRoutes.includes(route.id) };
      setSelectedRoute(enrichedRoute);
      setIsSidebarOpen(false);
   };

   const handleUnlockRoute = (code) => {
      const route = ROUTES_DATA.find((r) => r.code === code);
      if (route && !unlockedRoutes.includes(route.id)) {
         setUnlockedRoutes((prev) => [...prev, route.id]);
         setShowCodeModal(false);
         return true;
      }
      return false;
   };

   const handleViewChange = (view) => {
      setCurrentView(view);
      setIsSidebarOpen(false);
      setSelectedRoute(null);
   };

   const handleCloseOverlays = () => {
      setIsSidebarOpen(false);
      setSelectedRoute(null);
   };

   return (
      <div className={styles.app}>
         {/* El mapa siempre está renderizado en el fondo */}
         <div className={styles.mapContainer}>
            <MapView ref={mapRef} theme={theme} />
         </div>

         {/* Overlay Views - Solo se muestran cuando no es MAP */}
         {currentView !== VIEWS.MAP && (
            <div className={styles.overlayView}>
               <div className={styles.overlayContent}>
                  {currentView === VIEWS.ROUTES && <RoutesView routes={enrichedRoutes} onRouteSelect={handleRouteSelect} theme={theme} />}
                  {currentView === VIEWS.ADVENTURES && (
                     <AdventuresView routes={enrichedRoutes.filter((r) => r.isUnlocked)} achievements={ACHIEVEMENTS_DATA} theme={theme} />
                  )}
                  {currentView === VIEWS.PROFILE && (
                     <ProfileView theme={theme} onToggleTheme={toggleTheme} onShowCodeModal={() => setShowCodeModal(true)} />
                  )}
               </div>
            </div>
         )}

         {/* Menu Button - Solo visible en vista MAP */}
         {currentView === VIEWS.MAP && <MenuButton onClick={() => setIsSidebarOpen(!isSidebarOpen)} isOpen={isSidebarOpen} />}

         {/* Sidebar */}
         <Sidebar
            isOpen={isSidebarOpen}
            onClose={() => setIsSidebarOpen(false)}
            routes={enrichedRoutes}
            onRouteSelect={handleRouteSelect}
         />

         {/* Route Slider */}
         {selectedRoute && (
            <EnhancedRouteSlider
               route={selectedRoute}
               onClose={() => setSelectedRoute(null)}
               onShowCodeModal={() => setShowCodeModal(true)}
            />
         )}

         {/* Bottom Navigation */}
         <BottomNavigation currentView={currentView} onViewChange={handleViewChange} />

         {/* Code Modal */}
         <CodeModal isOpen={showCodeModal} onClose={() => setShowCodeModal(false)} onUnlock={handleUnlockRoute} />

         {/* Overlay para cerrar sidebar */}
         {(isSidebarOpen || selectedRoute) && <div className={styles.overlay} onClick={handleCloseOverlays} />}
      </div>
   );
};

// App principal con rutas para diferentes modelos AR
const App = () => {
   return (
      <Routes>
         <Route path="/" element={<MainApp />} />

         {/* 🎯 Rutas específicas para cada modelo AR */}
         <Route path="/ar/lobo" element={<CameraWebXR modelType="wolf" />} />
         <Route path="/ar/duende" element={<CameraWebXR modelType="duende" />} />
         <Route path="/ar/murcielago" element={<CameraWebXR modelType="murcielago" />} />

         {/* 🔄 Rutas de compatibilidad */}
         <Route path="/ar/wolf" element={<CameraWebXR modelType="wolf" />} />
         <Route path="/ar/gnome" element={<CameraWebXR modelType="duende" />} />
         <Route path="/ar/bat" element={<CameraWebXR modelType="murcielago" />} />
      </Routes>
   );
};

export default App;
