import React from 'react';

const BottomNavigation = ({ currentView, onViewChange, isDarkMode }) => {
  const navItems = [
    { id: 'mapa', label: 'Mapa', icon: '🗺️' },
    { id: 'rutas', label: 'Rutas', icon: '🚴‍♂️' },
    { id: 'aventuras', label: 'Aventuras', icon: '📜' },
    { id: 'perfil', label: 'Perfil', icon: '⚙️' }
  ];

  return (
    <nav className="bottom-navigation">
      {navItems.map(item => (
        <button
          key={item.id}
          className={`nav-item ${currentView === item.id ? 'active' : ''}`}
          onClick={() => onViewChange(item.id)}
        >
          <span className="nav-icon">{item.icon}</span>
          <span className="nav-label">{item.label}</span>
        </button>
      ))}
    </nav>
  );
};

export default BottomNavigation;
