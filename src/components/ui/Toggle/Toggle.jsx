// src/components/ui/Toggle/Toggle.jsx
import PropTypes from "prop-types";
import styles from "./Toggle.module.css";

const Toggle = ({ checked, onChange, ...props }) => {
   return (
      <label className={styles.toggle}>
         <input type="checkbox" checked={checked} onChange={onChange} {...props} />
         <span className={styles.slider}></span>
      </label>
   );
};

Toggle.propTypes = {
   checked: PropTypes.bool.isRequired,
   onChange: PropTypes.func.isRequired,
};

export default Toggle;
