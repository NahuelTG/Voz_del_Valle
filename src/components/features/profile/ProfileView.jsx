// src/components/features/profile/ProfileView.jsx
import PropTypes from "prop-types";

import Toggle from "../../ui/Toggle/Toggle";

import styles from "./ProfileView.module.css";

const ProfileView = ({ theme, onToggleTheme, onShowCodeModal }) => {
   return (
      <div className={styles.profileView}>
         <div className={styles.viewHeader}>
            <h2>Perfil</h2>
            <p>Configuración y preferencias</p>
         </div>

         {/* Modo Oscuro */}
         <div className={styles.section}>
            <h3>Apariencia</h3>
            <div className={styles.settingItem}>
               <div className={styles.settingInfo}>
                  <span className={styles.icon}>🌙</span>
                  <div>
                     <h4>Modo Oscuro</h4>
                     <p>Cambia la apariencia de la aplicación</p>
                  </div>
               </div>
               <Toggle checked={theme === "dark"} onChange={onToggleTheme} />
            </div>
         </div>

         {/* Volumen */}
         <div className={styles.section}>
            <h3>Audio</h3>
            <div className={styles.settingItem}>
               <div className={styles.settingInfo}>
                  <span className={styles.icon}>🔊</span>
                  <div>
                     <h4>Volumen Principal</h4>
                     <p>Ajusta el volumen de las rutas</p>
                  </div>
               </div>
               <input type="range" className={styles.slider} defaultValue="75" />
            </div>
         </div>

         {/* Desbloquear Ruta */}
         <div className={styles.section}>
            <h3>Rutas</h3>
            <button className={styles.settingButton} onClick={onShowCodeModal}>
               <div className={styles.settingInfo}>
                  <span className={styles.icon}>🔓</span>
                  <div>
                     <h4>Desbloquear Ruta</h4>
                     <p>Ingresa un código para acceder a nuevas rutas</p>
                  </div>
               </div>
               <span className={styles.arrow}>→</span>
            </button>
         </div>

         {/* Subtítulos */}
         <div className={styles.section}>
            <h3>Accesibilidad</h3>
            <div className={styles.settingItem}>
               <div className={styles.settingInfo}>
                  <span className={styles.icon}>♿</span>
                  <div>
                     <h4>Subtítulos</h4>
                     <p>Mostrar texto de los audios</p>
                  </div>
               </div>
               <Toggle checked={false} onChange={() => {}} />
            </div>
         </div>
      </div>
   );
};

ProfileView.propTypes = {
   theme: PropTypes.oneOf(["dark", "light"]).isRequired,
   onToggleTheme: PropTypes.func.isRequired,
   onShowCodeModal: PropTypes.func.isRequired,
};

export default ProfileView;
