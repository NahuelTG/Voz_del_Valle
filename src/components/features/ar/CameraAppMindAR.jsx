// CameraAppMindAR.jsx - Con navegación mejorada
import { useState, useMemo } from "react";
import { useNavigate } from "react-router";

import useMindarThree from "../../../hooks/useMindarThree.js";
import { ARModelFactory } from "../../../models/ARModelFactory.js";

function CameraAppMindAR() {
   const navigate = useNavigate();
   const [capturedPhoto, setCapturedPhoto] = useState(null);

   // 🎯 Crear modelo usando Factory Pattern
   const wolfModel = useMemo(() => {
      return ARModelFactory.createModel("wolf", {
         // 🐺 Configuraciones específicas para este lobo
         scale: { x: 1, y: 1, z: 1 },
         position: { x: 0, y: -0.25, z: 0 },
         rotation: { x: 0, y: Math.PI * 0.8, z: 0 },
         animationSpeed: 1.5,
         eyeGlow: true,
         howlOnAppear: true,
      });
   }, []);

   // 🎯 Usar el hook con el modelo configurado
   const {
      loading,
      isTracking,
      error,
      sceneRef,
      captureCanvasRef,
      captureBasicPhoto,
      capturePhotoWithAR,
      savePhoto,
      quickSaveAR,
      triggerModelAction,
   } = useMindarThree(wolfModel, "/assets/models/wolf/wolf.mind");

   const handleBackHome = () => {
      navigate("/");
   };

   const handleBasicCapture = () => {
      const photo = captureBasicPhoto();
      if (photo) {
         setCapturedPhoto(photo);
      }
   };

   const handleCaptureWithAR = () => {
      const photo = capturePhotoWithAR();
      if (photo) {
         setCapturedPhoto(photo);
      }
   };

   const handleQuickSaveAR = () => {
      const saved = quickSaveAR();
      if (saved) {
         alert("¡Foto AR del lobo capturada y guardada!");
      }
   };

   // 🎬 Función para hacer que el lobo aúlle
   const handleWolfHowl = () => {
      if (isTracking) {
         triggerModelAction("playHowlAnimation");
         // Aquí podrías también reproducir un sonido
         console.log("🐺 ¡El lobo está aullando!");
      }
   };

   const handleSavePhoto = (format = "jpeg") => {
      if (capturedPhoto) {
         const saved = savePhoto(capturedPhoto, format, 0.95);
         if (saved) {
            alert(`¡Foto guardada como ${format.toUpperCase()}!`);
            setCapturedPhoto(null);
         }
      }
   };

   // Mostrar error si hay algún problema
   if (error) {
      return (
         <div
            style={{
               width: "100vw",
               height: "100dvh",
               display: "flex",
               flexDirection: "column",
               alignItems: "center",
               justifyContent: "center",
               backgroundColor: "#000",
               color: "white",
               padding: "20px",
               textAlign: "center",
            }}
         >
            <h2>❌ Error en AR del Lobo</h2>
            <p>{error}</p>
            <button
               onClick={() => window.location.reload()}
               style={{
                  padding: "12px 24px",
                  backgroundColor: "#44ff44",
                  color: "white",
                  border: "none",
                  borderRadius: "25px",
                  fontSize: "16px",
                  cursor: "pointer",
                  marginTop: "20px",
               }}
            >
               🔄 Recargar
            </button>
            <button
               onClick={handleBackHome}
               style={{
                  padding: "12px 24px",
                  backgroundColor: "#ff4444",
                  color: "white",
                  border: "none",
                  borderRadius: "25px",
                  fontSize: "16px",
                  cursor: "pointer",
                  marginTop: "10px",
               }}
            >
               ← Volver al Mapa
            </button>
         </div>
      );
   }

   return (
      <div
         ref={sceneRef}
         style={{
            width: "100vw",
            height: "100dvh",
            position: "absolute",
            top: 0,
            left: 0,
            overflow: "hidden",
         }}
      >
         {/* Loading screen */}
         {loading && (
            <div
               style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "rgba(20, 20, 20, 0.95)",
                  color: "white",
                  zIndex: 10,
                  fontFamily: "system-ui, Avenir, Helvetica, Arial, sans-serif",
               }}
            >
               <div
                  style={{
                     width: "60px",
                     height: "60px",
                     marginBottom: "24px",
                     border: "4px solid #EAB308",
                     borderTop: "4px solid transparent",
                     borderRadius: "50%",
                     animation: "spin 1s linear infinite",
                  }}
               />
               <p style={{ fontSize: "1.3em", fontWeight: "600", marginBottom: "12px" }}>🐺 Cargando Lobo AR...</p>
               <p style={{ fontSize: "1em", color: "#D1D5DB" }}>Configurando modelo del valle...</p>

               <style>{`
                  @keyframes spin {
                     0% { transform: rotate(0deg); }
                     100% { transform: rotate(360deg); }
                  }
               `}</style>
            </div>
         )}

         {/* Controles básicos - Solo mostrar cuando no esté cargando */}
         {!loading && (
            <>
               {/* Controles superiores */}
               <div
                  style={{
                     position: "absolute",
                     top: "20px",
                     left: "20px",
                     right: "20px",
                     zIndex: 1000,
                     display: "flex",
                     justifyContent: "space-between",
                     alignItems: "center",
                  }}
               >
                  <button
                     onClick={handleBackHome}
                     style={{
                        padding: "12px 20px",
                        backgroundColor: "rgba(0, 0, 0, 0.8)",
                        color: "white",
                        border: "none",
                        borderRadius: "25px",
                        fontSize: "16px",
                        cursor: "pointer",
                        backdropFilter: "blur(10px)",
                     }}
                  >
                     ← Volver al Mapa
                  </button>

                  {/* 🎬 Botón para hacer aullar al lobo */}
                  {isTracking && (
                     <button
                        onClick={handleWolfHowl}
                        style={{
                           padding: "12px 20px",
                           backgroundColor: "rgba(255, 100, 0, 0.8)",
                           color: "white",
                           border: "none",
                           borderRadius: "25px",
                           fontSize: "16px",
                           cursor: "pointer",
                           backdropFilter: "blur(10px)",
                        }}
                     >
                        🐺 Aullar
                     </button>
                  )}

                  {/* Indicador de tracking */}
                  <div
                     style={{
                        padding: "8px 16px",
                        backgroundColor: isTracking ? "rgba(0, 255, 0, 0.8)" : "rgba(255, 0, 0, 0.8)",
                        color: "white",
                        borderRadius: "15px",
                        fontSize: "14px",
                        backdropFilter: "blur(10px)",
                     }}
                  >
                     {isTracking ? "🐺 Lobo Detectado" : "🔍 Buscar Target del Lobo"}
                  </div>
               </div>

               {/* Botones de captura */}
               <div
                  style={{
                     position: "absolute",
                     bottom: "100px",
                     left: "50%",
                     transform: "translateX(-50%)",
                     zIndex: 1000,
                     display: "flex",
                     gap: "20px",
                     alignItems: "center",
                  }}
               >
                  {/* 🎯 Captura rápida AR */}
                  <button
                     onClick={handleQuickSaveAR}
                     style={{
                        width: "50px",
                        height: "50px",
                        borderRadius: "50%",
                        backgroundColor: "rgba(255, 255, 255, 0.2)",
                        border: "2px solid white",
                        cursor: "pointer",
                        fontSize: "20px",
                        color: "white",
                        backdropFilter: "blur(10px)",
                     }}
                  >
                     💾
                  </button>

                  {/* 🎯 Captura con AR del lobo */}
                  <button
                     onClick={handleCaptureWithAR}
                     style={{
                        width: "50px",
                        height: "50px",
                        borderRadius: "50%",
                        backgroundColor: isTracking ? "rgba(0, 255, 136, 0.3)" : "rgba(255, 136, 0, 0.3)",
                        border: `2px solid ${isTracking ? "#00ff88" : "#ff8800"}`,
                        cursor: "pointer",
                        fontSize: "20px",
                        color: isTracking ? "#00ff88" : "#ff8800",
                        backdropFilter: "blur(10px)",
                     }}
                  >
                     🐺
                  </button>

                  {/* Captura básica (sin AR) */}
                  <button
                     onClick={handleBasicCapture}
                     style={{
                        width: "70px",
                        height: "70px",
                        borderRadius: "50%",
                        backgroundColor: "rgba(255, 255, 255, 0.9)",
                        border: "4px solid rgba(255, 255, 255, 0.3)",
                        cursor: "pointer",
                        fontSize: "24px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        boxShadow: "0 0 20px rgba(0, 0, 0, 0.5)",
                        backdropFilter: "blur(10px)",
                     }}
                  >
                     📷
                  </button>
               </div>

               {/* Mensaje de instrucciones */}
               <div
                  style={{
                     position: "absolute",
                     bottom: "30px",
                     left: "50%",
                     transform: "translateX(-50%)",
                     zIndex: 1000,
                     textAlign: "center",
                     color: "white",
                     backgroundColor: "rgba(0, 0, 0, 0.7)",
                     padding: "15px 25px",
                     borderRadius: "20px",
                     backdropFilter: "blur(10px)",
                  }}
               >
                  <p style={{ margin: 0, fontSize: "16px" }}>
                     {isTracking
                        ? "🎉 ¡Lobo del Valle activo! Toca 'Aullar' para interactuar"
                        : "📱 Apunta la cámara al target para activar el lobo AR"}
                  </p>
               </div>
            </>
         )}

         {/* Canvas oculto para captura */}
         <canvas ref={captureCanvasRef} style={{ display: "none" }} />

         {/* Modal de foto capturada */}
         {capturedPhoto && (
            <div
               style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  backgroundColor: "rgba(0, 0, 0, 0.9)",
                  zIndex: 2000,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "20px",
               }}
            >
               <h3 style={{ color: "white", marginBottom: "20px", fontSize: "24px" }}>🐺 Foto del Lobo del Valle</h3>

               <img
                  src={capturedPhoto}
                  alt="Foto AR capturada"
                  style={{
                     maxWidth: "90%",
                     maxHeight: "60%",
                     objectFit: "contain",
                     borderRadius: "15px",
                     boxShadow: "0 10px 30px rgba(0, 0, 0, 0.5)",
                  }}
               />

               <div
                  style={{
                     marginTop: "30px",
                     display: "flex",
                     gap: "15px",
                     flexWrap: "wrap",
                     justifyContent: "center",
                  }}
               >
                  <button
                     onClick={() => setCapturedPhoto(null)}
                     style={{
                        padding: "12px 24px",
                        backgroundColor: "#ff4444",
                        color: "white",
                        border: "none",
                        borderRadius: "25px",
                        fontSize: "16px",
                        cursor: "pointer",
                        backdropFilter: "blur(10px)",
                     }}
                  >
                     ✕ Descartar
                  </button>

                  <button
                     onClick={() => handleSavePhoto("jpeg")}
                     style={{
                        padding: "12px 24px",
                        backgroundColor: "#44ff44",
                        color: "white",
                        border: "none",
                        borderRadius: "25px",
                        fontSize: "16px",
                        cursor: "pointer",
                        backdropFilter: "blur(10px)",
                     }}
                  >
                     💾 Guardar JPG
                  </button>

                  <button
                     onClick={() => handleSavePhoto("png")}
                     style={{
                        padding: "12px 24px",
                        backgroundColor: "#4444ff",
                        color: "white",
                        border: "none",
                        borderRadius: "25px",
                        fontSize: "16px",
                        cursor: "pointer",
                        backdropFilter: "blur(10px)",
                     }}
                  >
                     🖼️ Guardar PNG
                  </button>
               </div>
            </div>
         )}
      </div>
   );
}

export default CameraAppMindAR;
