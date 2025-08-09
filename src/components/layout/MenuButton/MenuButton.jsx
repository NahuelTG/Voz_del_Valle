// src/components/layout/MenuButton/MenuButton.jsx
import PropTypes from "prop-types";

import styles from "./MenuButton.module.css";

const MenuButton = ({ onClick, isOpen }) => {
   return (
      <button className={`${styles.menuButton} ${isOpen ? styles.open : ""}`} onClick={onClick} aria-label="Abrir menú">
         <span className={styles.hamburgerLine}></span>
         <span className={styles.hamburgerLine}></span>
         <span className={styles.hamburgerLine}></span>
      </button>
   );
};

MenuButton.propTypes = {
   onClick: PropTypes.func.isRequired,
   isOpen: PropTypes.bool.isRequired,
};

export default MenuButton;
