// src/components/layout/BottomNavigation/BottomNavigation.jsx
import PropTypes from "prop-types";

import { NAVIGATION_ITEMS } from "../../../utils/constants";

import styles from "./BottomNavigation.module.css";

const BottomNavigation = ({ currentView, onViewChange }) => {
   return (
      <nav className={styles.navigation}>
         {NAVIGATION_ITEMS.map((item) => (
            <button
               key={item.id}
               className={`${styles.navItem} ${currentView === item.id ? styles.active : ""}`}
               onClick={() => onViewChange(item.id)}
            >
               <span className={styles.navIcon}>{item.icon}</span>
               <span className={styles.navLabel}>{item.label}</span>
            </button>
         ))}
      </nav>
   );
};

BottomNavigation.propTypes = {
   currentView: PropTypes.string.isRequired,
   onViewChange: PropTypes.func.isRequired,
};

export default BottomNavigation;
