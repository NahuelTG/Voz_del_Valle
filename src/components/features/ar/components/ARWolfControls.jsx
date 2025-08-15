// components/ARWolfControls.jsx
import PropTypes from "prop-types";

const ARWolfControls = ({ surfaceDetected, hasWolf, onAddWolf, onRemoveWolf, onTriggerHowl, onExit }) => {
   return (
      <>
         {/* Indicador de lobo presente */}
         {hasWolf && (
            <div
               style={{
                  position: "absolute",
                  top: "20px",
                  right: "20px",
                  background: "rgba(0, 0, 0, 0.8)",
                  color: "white",
                  padding: "8px 16px",
                  borderRadius: "20px",
                  fontSize: "14px",
                  fontWeight: "bold",
                  border: "2px solid rgba(255, 255, 255, 0.3)",
                  pointerEvents: "auto",
               }}
            >
               🐺 Lobo Único Activo
            </div>
         )}

         {/* Botón salir */}
         <button
            onClick={onExit}
            style={{
               position: "absolute",
               top: "20px",
               left: "20px",
               background: "rgba(255, 68, 68, 0.9)",
               color: "white",
               border: "2px solid white",
               padding: "8px 16px",
               borderRadius: "20px",
               fontSize: "14px",
               cursor: "pointer",
               fontWeight: "bold",
               pointerEvents: "auto",
            }}
         >
            ❌ Salir
         </button>

         {/* Botones inferiores */}
         <div
            style={{
               position: "absolute",
               bottom: "30px",
               left: "50%",
               transform: "translateX(-50%)",
               display: "flex",
               gap: "20px",
               alignItems: "center",
               pointerEvents: "auto",
            }}
         >
            {/* Botón colocar lobo - Solo si no hay lobo */}
            {!hasWolf && (
               <button
                  onClick={onAddWolf}
                  disabled={!surfaceDetected}
                  style={{
                     width: "70px",
                     height: "70px",
                     borderRadius: "50%",
                     background: surfaceDetected ? "rgba(0, 255, 136, 0.9)" : "rgba(100, 100, 100, 0.6)",
                     border: `3px solid ${surfaceDetected ? "#00ff88" : "#666"}`,
                     color: "white",
                     fontSize: "24px",
                     cursor: surfaceDetected ? "pointer" : "not-allowed",
                     fontWeight: "bold",
                     boxShadow: "0 4px 15px rgba(0,0,0,0.5)",
                  }}
                  title="Colocar lobo único"
               >
                  🐺
               </button>
            )}

            {/* Botón hacer aullar - Solo si hay lobo */}
            {hasWolf && (
               <button
                  onClick={onTriggerHowl}
                  style={{
                     width: "60px",
                     height: "60px",
                     borderRadius: "50%",
                     background: "rgba(255, 136, 0, 0.9)",
                     border: "3px solid #ff8800",
                     color: "white",
                     fontSize: "20px",
                     cursor: "pointer",
                     fontWeight: "bold",
                     boxShadow: "0 4px 15px rgba(0,0,0,0.5)",
                  }}
               >
                  🎵
               </button>
            )}

            {/* Botón remover el lobo - Solo si hay lobo */}
            {hasWolf && (
               <button
                  onClick={onRemoveWolf}
                  style={{
                     width: "50px",
                     height: "50px",
                     borderRadius: "50%",
                     background: "rgba(255, 68, 68, 0.9)",
                     border: "3px solid #ff4444",
                     color: "white",
                     fontSize: "20px",
                     cursor: "pointer",
                     fontWeight: "bold",
                     boxShadow: "0 4px 15px rgba(0,0,0,0.5)",
                  }}
                  title="Remover el lobo"
               >
                  🗑️
               </button>
            )}
         </div>
      </>
   );
};

ARWolfControls.propTypes = {
   surfaceDetected: PropTypes.bool.isRequired,
   hasWolf: PropTypes.bool.isRequired,
   onAddWolf: PropTypes.func.isRequired,
   onRemoveWolf: PropTypes.func.isRequired,
   onTriggerHowl: PropTypes.func.isRequired,
   onExit: PropTypes.func.isRequired,
};

export default ARWolfControls;
