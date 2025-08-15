// components/ARSurfaceIndicator.jsx - Modificado para lobo
import PropTypes from "prop-types";

const ARSurfaceIndicator = ({ surfaceDetected, hasWolf }) => {
   if (!surfaceDetected) return null;

   const getMessage = () => {
      if (hasWolf) {
         return "🐺 Lobo único colocado - Usa los controles para interactuar";
      }
      return "✅ Superficie detectada - Toca para colocar UN lobo";
   };

   const getBackgroundColor = () => {
      if (hasWolf) {
         return "rgba(255, 136, 0, 0.9)"; // Naranja cuando hay lobo
      }
      return "rgba(0, 255, 136, 0.9)"; // Verde cuando se puede colocar
   };

   return (
      <div
         style={{
            position: "absolute",
            top: "80px",
            left: "50%",
            transform: "translateX(-50%)",
            background: getBackgroundColor(),
            color: "white",
            padding: "10px 20px",
            borderRadius: "25px",
            fontSize: "16px",
            fontWeight: "bold",
            textAlign: "center",
            pointerEvents: "auto",
            border: "2px solid white",
            maxWidth: "90%",
         }}
      >
         {getMessage()}
      </div>
   );
};

ARSurfaceIndicator.propTypes = {
   surfaceDetected: PropTypes.bool.isRequired,
   hasWolf: PropTypes.bool.isRequired,
};

export default ARSurfaceIndicator;
