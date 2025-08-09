// src/components/ui/Button/Button.jsx
import PropTypes from "prop-types";
import styles from "./Button.module.css";

const VARIANTS = {
   primary: "primary",
   secondary: "secondary",
   locked: "locked",
};

const Button = ({ children, variant = VARIANTS.primary, className = "", disabled = false, onClick, ...props }) => {
   const classes = [styles.button, styles[variant], className].filter(Boolean).join(" ");

   return (
      <button className={classes} disabled={disabled} onClick={onClick} {...props}>
         {children}
      </button>
   );
};

Button.VARIANTS = VARIANTS;

Button.propTypes = {
   children: PropTypes.node.isRequired,
   variant: PropTypes.oneOf(Object.values(VARIANTS)),
   className: PropTypes.string,
   disabled: PropTypes.bool,
   onClick: PropTypes.func,
};
export default Button;
