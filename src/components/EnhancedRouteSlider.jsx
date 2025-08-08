import React, { useState, useEffect } from 'react';

const EnhancedRouteSlider = ({ route, onClose, onShowCodeModal, isDarkMode }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeTab, setActiveTab] = useState(0);

  const tabs = ['Resumen', 'Puntos', 'Recuerdos'];

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 300);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 0:
        return (
          <div className="tab-content">
            <div className="route-header">
              <h3 className="route-title">{route.title}</h3>
              <div className="route-badges">
                <span className="badge difficulty">{route.difficulty}</span>
                <span className="badge duration">⏱️ {route.duration}</span>
                <span className="badge distance">📍 {route.distance}</span>
              </div>
            </div>
            
            <p className="route-description">{route.description}</p>
            
            <div className="route-actions">
              {route.isUnlocked ? (
                <button className="route-button primary">
                  <span className="button-icon">▶️</span>
                  Empezar ruta
                </button>
              ) : (
                <button 
                  className="route-button locked"
                  onClick={onShowCodeModal}
                >
                  <span className="button-icon">🔒</span>
                  Ingresa tu código para iniciar
                </button>
              )}
              <button className="route-button secondary">
                <span className="button-icon">👁️</span>
                Ver más
              </button>
            </div>
          </div>
        );
      
      case 1:
        return (
          <div className="tab-content">
            <h4 className="section-title">Puntos de Interés</h4>
            <div className="points-list">
              {route.points.map((point, index) => (
                <div key={point.id} className="point-item">
                  <div className="point-icon">{point.icon}</div>
                  <div className="point-info">
                    <h5>{point.name}</h5>
                    <span className="point-type">{point.type.toUpperCase()}</span>
                  </div>
                  <button className="point-preview">
                    <span className="preview-icon">👁️</span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        );
      
      case 2:
        return (
          <div className="tab-content">
            <h4 className="section-title">Tus Recuerdos</h4>
            {route.stats.photos > 0 ? (
              <div className="memories-content">
                <div className="photo-grid">
                  {Array.from({ length: Math.min(route.stats.photos, 6) }).map((_, i) => (
                    <div key={i} className="photo-placeholder">
                      <span className="photo-icon">📷</span>
                    </div>
                  ))}
                </div>
                <div className="stats-grid">
                  <div className="stat-item">
                    <span className="stat-value">{route.stats.photos}</span>
                    <span className="stat-label">Fotos</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-value">{route.stats.timeSpent}</span>
                    <span className="stat-label">Tiempo</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-value">{route.stats.challenges}</span>
                    <span className="stat-label">Desafíos</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="empty-memories">
                <div className="empty-icon">📸</div>
                <p>¡Completa esta ruta para crear recuerdos!</p>
              </div>
            )}
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className={`enhanced-route-slider ${isVisible ? 'visible' : ''}`}>
      <div className="slider-handle" />
      
      <div className="slider-header">
        <div className="tab-navigation">
          {tabs.map((tab, index) => (
            <button
              key={tab}
              className={`tab-button ${activeTab === index ? 'active' : ''}`}
              onClick={() => setActiveTab(index)}
            >
              {tab}
            </button>
          ))}
        </div>
        
        <button 
          className="slider-close"
          onClick={handleClose}
          aria-label="Cerrar"
        >
          ✕
        </button>
      </div>
      
      <div className="slider-content">
        {renderTabContent()}
      </div>
    </div>
  );
};

export default EnhancedRouteSlider;
