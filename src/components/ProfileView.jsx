import React from 'react';

const ProfileView = ({ isDarkMode, onToggleDarkMode, onShowCodeModal }) => {
  return (
    <div className="profile-view">
      <div className="view-header">
        <h2>Perfil</h2>
        <p>Configuración y preferencias</p>
      </div>
      
      <div className="profile-section">
        <h3>Apariencia</h3>
        <div className="setting-item">
          <div className="setting-info">
            <span className="setting-icon">🌙</span>
            <div>
              <h4>Modo Oscuro</h4>
              <p>Cambia la apariencia de la aplicación</p>
            </div>
          </div>
          <label className="toggle-switch">
            <input 
              type="checkbox" 
              checked={isDarkMode}
              onChange={onToggleDarkMode}
            />
            <span className="toggle-slider"></span>
          </label>
        </div>
      </div>
      
      <div className="profile-section">
        <h3>Audio</h3>
        <div className="setting-item">
          <div className="setting-info">
            <span className="setting-icon">🔊</span>
            <div>
              <h4>Volumen Principal</h4>
              <p>Ajusta el volumen de las rutas</p>
            </div>
          </div>
          <input type="range" className="volume-slider" defaultValue="75" />
        </div>
      </div>
      
      <div className="profile-section">
        <h3>Rutas</h3>
        <button className="setting-button" onClick={onShowCodeModal}>
          <span className="setting-icon">🔓</span>
          <div>
            <h4>Desbloquear Ruta</h4>
            <p>Ingresa un código para acceder a nuevas rutas</p>
          </div>
          <span className="arrow-icon">→</span>
        </button>
      </div>
      
      <div className="profile-section">
        <h3>Accesibilidad</h3>
        <div className="setting-item">
          <div className="setting-info">
            <span className="setting-icon">♿</span>
            <div>
              <h4>Subtítulos</h4>
              <p>Mostrar texto de los audios</p>
            </div>
          </div>
          <label className="toggle-switch">
            <input type="checkbox" />
            <span className="toggle-slider"></span>
          </label>
        </div>
        
        <div className="setting-item">
          <div className="setting-info">
            <span className="setting-icon">🔤</span>
            <div>
              <h4>Tamaño de Texto</h4>
              <p>Ajusta el tamaño de la letra</p>
            </div>
          </div>
          <select className="text-size-select" defaultValue="Normal">
            <option>Pequeño</option>
            <option>Normal</option>
            <option>Grande</option>
          </select>
        </div>
      </div>
      
      <div className="profile-section">
        <h3>Idioma</h3>
        <div className="setting-item">
          <div className="setting-info">
            <span className="setting-icon">🌍</span>
            <div>
              <h4>Idioma de la App</h4>
              <p>Cambia el idioma de la interfaz</p>
            </div>
          </div>
          <select className="language-select" defaultValue="Español">
            <option>Español</option>
            <option>English</option>
            <option>Français</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default ProfileView;
