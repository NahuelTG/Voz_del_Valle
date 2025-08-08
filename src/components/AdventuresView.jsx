import React from 'react';

const AdventuresView = ({ routes, achievements, isDarkMode }) => {
  const completedRoutes = routes.filter(r => r.stats.photos > 0);
  const totalDistance = completedRoutes.reduce((sum, r) => sum + parseFloat(r.distance), 0);
  const totalTime = completedRoutes.reduce((sum, r) => {
    const time = r.stats.timeSpent;
    const hours = time.includes('h') ? parseInt(time.split('h')[0]) : 0;
    const minutes = time.includes('m') ? parseInt(time.split('m')[0].split(' ').pop()) : 0;
    return sum + (hours * 60) + minutes;
  }, 0);

  return (
    <div className="adventures-view">
      <div className="view-header">
        <h2>Mis Aventuras</h2>
        <p>Tu progreso y logros</p>
      </div>
      
      <div className="stats-overview">
        <div className="stat-card">
          <span className="stat-icon">🏃‍♂️</span>
          <span className="stat-value">{completedRoutes.length}</span>
          <span className="stat-label">Rutas Completadas</span>
        </div>
        <div className="stat-card">
          <span className="stat-icon">📍</span>
          <span className="stat-value">{totalDistance.toFixed(1)} km</span>
          <span className="stat-label">Distancia Total</span>
        </div>
        <div className="stat-card">
          <span className="stat-icon">⏰</span>
          <span className="stat-value">{Math.floor(totalTime / 60)}h {totalTime % 60}m</span>
          <span className="stat-label">Tiempo Total</span>
        </div>
      </div>
      
      <div className="achievements-section">
        <h3>Logros</h3>
        <div className="achievements-grid">
          {achievements.map(achievement => (
            <div 
              key={achievement.id}
              className={`achievement-card ${achievement.unlocked ? 'unlocked' : 'locked'}`}
            >
              <span className="achievement-icon">{achievement.icon}</span>
              <span className="achievement-name">{achievement.name}</span>
              {!achievement.unlocked && <div className="achievement-overlay">🔒</div>}
            </div>
          ))}
        </div>
      </div>
      
      <div className="completed-routes">
        <h3>Rutas Completadas</h3>
        {completedRoutes.length > 0 ? (
          <div className="completed-list">
            {completedRoutes.map(route => (
              <div key={route.id} className="completed-item">
                <div className="completed-info">
                  <h4>{route.title}</h4>
                  <div className="completed-stats">
                    <span>📷 {route.stats.photos} fotos</span>
                    <span>⏱️ {route.stats.timeSpent}</span>
                    <span>🏆 {route.stats.challenges} desafíos</span>
                  </div>
                </div>
                <button className="replay-button">🔄</button>
              </div>
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <span className="empty-icon">🎯</span>
            <p>¡Completa tu primera ruta para ver tus aventuras aquí!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdventuresView;
