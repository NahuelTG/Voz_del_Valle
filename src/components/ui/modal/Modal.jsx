// src/components/ui/Modal/Modal.jsx
import { useEffect } from "react";

import PropTypes from "prop-types";
import styles from "./Modal.module.css";

const Modal = ({ isOpen, onClose, children, className = "" }) => {
   useEffect(() => {
      if (isOpen) {
         document.body.style.overflow = "hidden";
      } else {
         document.body.style.overflow = "unset";
      }

      return () => {
         document.body.style.overflow = "unset";
      };
   }, [isOpen]);

   if (!isOpen) return null;

   return (
      <div className={styles.overlay} onClick={onClose}>
         <div className={`${styles.modal} ${className}`} onClick={(e) => e.stopPropagation()}>
            {children}
         </div>
      </div>
   );
};

Modal.propTypes = {
   isOpen: PropTypes.bool.isRequired,
   onClose: PropTypes.func.isRequired,
   children: PropTypes.node.isRequired,
   className: PropTypes.string,
};

export default Modal;
