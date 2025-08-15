// components/ARSurfaceIndicator.jsx - Indicador genérico para cualquier modelo
import PropTypes from "prop-types";

const ARSurfaceIndicator = ({ surfaceDetected, hasModel, modelConfig }) => {
   if (!surfaceDetected) return null;

   const getMessage = () => {
      if (hasModel) {
         return `${modelConfig.icon} ${modelConfig.name} colocado - Usa los controles para interactuar`;
      }
      return `✅ Superficie detectada - Toca para colocar ${modelConfig.name}`;
   };

   const getBackgroundColor = () => {
      if (hasModel) {
         return "rgba(255, 136, 0, 0.9)"; // Naranja cuando hay modelo
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
   hasModel: PropTypes.bool.isRequired,
   modelConfig: PropTypes.shape({
      icon: PropTypes.node.isRequired,
      name: PropTypes.string.isRequired,
   }).isRequired,
};

export default ARSurfaceIndicator;
