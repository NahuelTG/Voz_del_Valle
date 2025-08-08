import React, { useState, useEffect } from 'react';

const RouteSlider = ({ route, onClose }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 300);
  };

  return (
    <div className={`route-slider ${isVisible ? 'visible' : ''}`}>
      <div className="slider-handle" />
      
      <div className="slider-content">
        <button 
          className="slider-close"
          onClick={handleClose}
          aria-label="Cerrar"
        >
          ✕
        </button>
        
        <h3 className="route-title">{route.title}</h3>
        <p className="route-description">{route.description}</p>
        
        <div className="route-actions">
          <button className="route-button primary">
            Empezar ruta
          </button>
          <button className="route-button secondary">
            Ver más
          </button>
        </div>
      </div>
    </div>
  );
};

export default RouteSlider;
