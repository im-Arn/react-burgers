import Style from './modal.module.css';
import React from "react";
import PropTypes from "prop-types";
import { createPortal } from "react-dom";
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import ModalOverlay from "../modal-overlay/modal-overlay";

const modal = document.querySelector('#modal');

export default function Modal({children, closeModal}) {

  const handleClick = (evt) => evt.stopPropagation();

  React.useEffect(() => {
    const closePopupOnEsc = (evt) => {
      if (evt.key === 'Escape') {
        closeModal();
      }
    }

    document.addEventListener('keydown', closePopupOnEsc);

    return () => {
      document.removeEventListener('keydown', closePopupOnEsc);
    }
  }, [closeModal])

  return createPortal(
    <ModalOverlay closeModal={closeModal}>
      <div className={Style.modal} onClick={handleClick}>
        <button className={Style.icon} onClick={closeModal}>
          <CloseIcon type="primary" />
        </button>
        {children}
      </div>
    </ModalOverlay>,
    modal
  );
}

Modal.propTypes = {
  children: PropTypes.node.isRequired,
  closeModal: PropTypes.func.isRequired,
};