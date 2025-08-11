// src/components/features/code/CodeModal.jsx
import { useState } from "react";
import PropTypes from "prop-types";

import Modal from "../../ui/modal/Modal.jsx";
import Button from "../../ui/button/Button.jsx";

import styles from "./CodeModal.module.css";

const EXAMPLE_CODES = ["MEMORIA2024", "ECOS2024"];

const CodeModal = ({ isOpen, onClose, onUnlock }) => {
   const [code, setCode] = useState("");
   const [error, setError] = useState("");
   const [isLoading, setIsLoading] = useState(false);

   const handleSubmit = async (e) => {
      e.preventDefault();
      setIsLoading(true);
      setError("");

      // Simular verificación del código
      setTimeout(() => {
         const success = onUnlock(code.toUpperCase());
         if (success) {
            setCode("");
            setError("");
            onClose();
         } else {
            setError("Código incorrecto. Inténtalo de nuevo.");
         }
         setIsLoading(false);
      }, 1000);
   };

   const handleClose = () => {
      setCode("");
      setError("");
      onClose();
   };

   return (
      <Modal isOpen={isOpen} onClose={handleClose}>
         <div className={styles.header}>
            <h3>Desbloquear Ruta</h3>
            <button className={styles.closeButton} onClick={handleClose}>
               ✕
            </button>
         </div>

         <div className={styles.content}>
            <div className={styles.unlockIcon}>🔓</div>
            <p>Ingresa el código que recibiste para desbloquear una nueva ruta</p>

            <form onSubmit={handleSubmit}>
               <div className={styles.inputGroup}>
                  <input
                     type="text"
                     className={styles.codeInput}
                     placeholder="Ingresa tu código"
                     value={code}
                     onChange={(e) => setCode(e.target.value)}
                     maxLength="20"
                     autoFocus
                  />
               </div>

               {error && <div className={styles.errorMessage}>{error}</div>}

               <div className={styles.actions}>
                  <Button type="button" variant={Button.VARIANTS.secondary} onClick={handleClose}>
                     Cancelar
                  </Button>
                  <Button type="submit" variant={Button.VARIANTS.primary} disabled={!code.trim() || isLoading}>
                     {isLoading ? "Verificando..." : "Desbloquear"}
                  </Button>
               </div>
            </form>

            <div className={styles.hints}>
               <p className={styles.hintTitle}>Códigos de ejemplo:</p>
               <div className={styles.hintCodes}>
                  {EXAMPLE_CODES.map((exampleCode) => (
                     <code key={exampleCode}>{exampleCode}</code>
                  ))}
               </div>
            </div>
         </div>
      </Modal>
   );
};

CodeModal.propTypes = {
   isOpen: PropTypes.bool.isRequired,
   onClose: PropTypes.func.isRequired,
   onUnlock: PropTypes.func.isRequired,
};

export default CodeModal;
