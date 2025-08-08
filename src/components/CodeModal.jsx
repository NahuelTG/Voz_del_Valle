import React, { useState } from 'react';

const CodeModal = ({ onClose, onUnlock, isDarkMode }) => {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    // Simular verificación del código
    setTimeout(() => {
      const success = onUnlock(code.toUpperCase());
      if (success) {
        onClose();
      } else {
        setError('Código incorrecto. Inténtalo de nuevo.');
      }
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="modal-overlay">
      <div className="code-modal">
        <div className="modal-header">
          <h3>Desbloquear Ruta</h3>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>
        
        <div className="modal-content">
          <div className="unlock-icon">🔓</div>
          <p>Ingresa el código que recibiste para desbloquear una nueva ruta</p>
          
          <form onSubmit={handleSubmit}>
            <div className="code-input-group">
              <input
                type="text"
                className="code-input"
                placeholder="Ingresa tu código"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                maxLength="20"
                autoFocus
              />
            </div>
            
            {error && <div className="error-message">{error}</div>}
            
            <div className="modal-actions">
              <button 
                type="button" 
                className="modal-button secondary"
                onClick={onClose}
              >
                Cancelar
              </button>
              <button 
                type="submit" 
                className="modal-button primary"
                disabled={!code.trim() || isLoading}
              >
                {isLoading ? 'Verificando...' : 'Desbloquear'}
              </button>
            </div>
          </form>
          
          <div className="code-hints">
            <p className="hint-title">Códigos de ejemplo:</p>
            <div className="hint-codes">
              <code>MEMORIA2024</code>
              <code>ECOS2024</code>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodeModal;
