import React from 'react';

const Sidebar = ({ isOpen, onClose, routes, onRouteSelect, isDarkMode }) => {
  return (
    <div className={`sidebar ${isOpen ? 'open' : ''}`}>
      <div className="sidebar-header">
        <h2>Menú Rápido</h2>
        <button 
          className="close-button"
          onClick={onClose}
          aria-label="Cerrar menú"
        >
          ✕
        </button>
      </div>
      
      <div className="sidebar-main">
        <div className="quick-routes">
          <h3>Acceso Rápido</h3>
          {routes.slice(0, 2).map(route => (
            <button
              key={route.id}
              className={`quick-route-item ${!route.isUnlocked ? 'locked' : ''}`}
              onClick={() => onRouteSelect(route)}
            >
              <div className="quick-route-info">
                <h4>{route.title}</h4>
                <span className="quick-route-meta">
                  {route.isUnlocked ? `⏱️ ${route.duration}` : '🔒 Bloqueada'}
                </span>
              </div>
              <span className="quick-route-arrow">→</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
