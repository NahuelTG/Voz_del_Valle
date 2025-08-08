import React from 'react';

const MenuButton = ({ onClick, isOpen, isDarkMode }) => {
  return (
    <button 
      className={`menu-button ${isOpen ? 'open' : ''}`}
      onClick={onClick}
      aria-label="Abrir menú"
    >
      <span className="hamburger-line"></span>
      <span className="hamburger-line"></span>
      <span className="hamburger-line"></span>
    </button>
  );
};

export default MenuButton;
