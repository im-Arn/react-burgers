import Style from './modal-overlay.module.css';
import PropTypes from "prop-types";

export default function ModalOverlay({children, closeModal}) {
  const handleClick = (e) => {
    e.stopPropagation();
    closeModal();
  };

  return ( 
    <div className={Style.overlay} onClick={handleClick}>
      {children}
    </div>
  );

}

ModalOverlay.propTypes = {
  children: PropTypes.node.isRequired,
  closeModal: PropTypes.func.isRequired,
};