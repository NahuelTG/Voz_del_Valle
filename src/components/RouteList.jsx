import React from 'react';

const RouteList = ({ routes, onRouteSelect }) => {
  return (
    <div className="route-list">
      <h3>Rutas Disponibles</h3>
      {routes.map(route => (
        <div key={route.id} className="route-card">
          <h4>{route.title}</h4>
          <p>{route.description}</p>
          <div className="route-meta">
            <span className="duration">⏱️ {route.duration}</span>
          </div>
          <button 
            className="route-button primary"
            onClick={() => onRouteSelect(route)}
          >
            Empezar ruta
          </button>
        </div>
      ))}
    </div>
  );
};

export default RouteList;
