import React from 'react';

const RoutesView = ({ routes, onRouteSelect, isDarkMode }) => {
  return (
    <div className="routes-view">
      <div className="view-header">
        <h2>Rutas Disponibles</h2>
        <p>Descubre experiencias únicas en cada recorrido</p>
      </div>
      
      <div className="routes-grid">
        {routes.map(route => (
          <div 
            key={route.id} 
            className={`route-card ${!route.isUnlocked ? 'locked' : ''}`}
            onClick={() => onRouteSelect(route)}
          >
            <div className="card-header">
              <h3>{route.title}</h3>
              {!route.isUnlocked && <span className="lock-icon">🔒</span>}
            </div>
            
            <p className="card-description">{route.description}</p>
            
            <div className="card-meta">
              <span className="meta-item">⏱️ {route.duration}</span>
              <span className="meta-item">📍 {route.distance}</span>
              <span className="meta-item difficulty">{route.difficulty}</span>
            </div>
            
            <div className="card-progress">
              {route.isUnlocked ? (
                <div className="progress-bar">
                  <div 
                    className="progress-fill" 
                    style={{ width: route.stats.photos > 0 ? '100%' : '0%' }}
                  />
                </div>
              ) : (
                <div className="unlock-hint">
                  Toca para ingresar código
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RoutesView;
