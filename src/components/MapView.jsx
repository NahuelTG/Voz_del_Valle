import React from 'react';

const MapView = ({ isDarkMode }) => {
  return (
    <div className="map-view">
      <div className="map-placeholder">
        <div className="map-grid">
          {Array.from({ length: 20 }).map((_, i) => (
            <div key={i} className="grid-line" />
          ))}
        </div>
        <div className="map-marker">
          <div className="marker-pulse" />
        </div>
        
        {/* Marcadores de rutas */}
        <div className="route-marker" style={{ top: '30%', left: '40%' }}>
          <div className="marker-icon unlocked">🎵</div>
          <div className="marker-label">Ruta Sonora</div>
        </div>
        
        <div className="route-marker" style={{ top: '60%', left: '70%' }}>
          <div className="marker-icon locked">🔒</div>
          <div className="marker-label">Caminos de Memoria</div>
        </div>
        
        <div className="route-marker" style={{ top: '45%', left: '25%' }}>
          <div className="marker-icon locked">🔒</div>
          <div className="marker-label">Ecos del Pasado</div>
        </div>
      </div>
    </div>
  );
};

export default MapView;
