// src/App.jsx
import { useState } from "react";
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

import { VIEWS, ROUTES_DATA, ACHIEVEMENTS_DATA } from "./utils/constants";

import styles from "./App.module.css";

const App = () => {
   const { theme, toggleTheme } = useTheme();
   const [unlockedRoutes, setUnlockedRoutes] = useLocalStorage("unlockedRoutes", [1]);

   const [isSidebarOpen, setIsSidebarOpen] = useState(false);
   const [selectedRoute, setSelectedRoute] = useState(null);
   const [currentView, setCurrentView] = useState(VIEWS.MAP);
   const [showCodeModal, setShowCodeModal] = useState(false);

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

   const renderCurrentView = () => {
      const viewProps = { theme };

      switch (currentView) {
         case VIEWS.ROUTES:
            return <RoutesView routes={enrichedRoutes} onRouteSelect={handleRouteSelect} {...viewProps} />;
         case VIEWS.ADVENTURES:
            return <AdventuresView routes={enrichedRoutes.filter((r) => r.isUnlocked)} achievements={ACHIEVEMENTS_DATA} {...viewProps} />;
         case VIEWS.PROFILE:
            return <ProfileView theme={theme} onToggleTheme={toggleTheme} onShowCodeModal={() => setShowCodeModal(true)} {...viewProps} />;
         default:
            return <MapView {...viewProps} />;
      }
   };

   return (
      <div className={styles.app}>
         {renderCurrentView()}

         {currentView === VIEWS.MAP && <MenuButton onClick={() => setIsSidebarOpen(!isSidebarOpen)} isOpen={isSidebarOpen} />}

         <Sidebar
            isOpen={isSidebarOpen}
            onClose={() => setIsSidebarOpen(false)}
            routes={enrichedRoutes}
            onRouteSelect={handleRouteSelect}
         />

         {selectedRoute && (
            <EnhancedRouteSlider
               route={selectedRoute}
               onClose={() => setSelectedRoute(null)}
               onShowCodeModal={() => setShowCodeModal(true)}
            />
         )}

         <BottomNavigation currentView={currentView} onViewChange={setCurrentView} />

         <CodeModal isOpen={showCodeModal} onClose={() => setShowCodeModal(false)} onUnlock={handleUnlockRoute} />

         {isSidebarOpen && <div className={styles.overlay} onClick={() => setIsSidebarOpen(false)} />}
      </div>
   );
};

export default App;
