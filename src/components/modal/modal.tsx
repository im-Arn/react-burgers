import Style from "./modal.module.css";
import { useEffect, ReactElement } from "react";
import { createPortal } from "react-dom";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import ModalOverlay from "../modal-overlay/modal-overlay";

const modal: HTMLElement | null = document.querySelector('#modal');

export default function Modal({ children, closeModal }: { children: ReactElement, closeModal: () => void }) {

  const handleClick = (evt: React.MouseEvent<HTMLDivElement, MouseEvent>) => evt.stopPropagation();

  useEffect(() => {
    const closePopupOnEsc = (evt: KeyboardEvent) => {
      if (evt.key === 'Escape') {
        closeModal();
      }
    }

    document.addEventListener('keydown', closePopupOnEsc);

    return () => {
      document.removeEventListener('keydown', closePopupOnEsc);
    }
  }, []) // eslint-disable-line
  // TODO: пустой массив необходим для единоразового срабатывания useEffect

  if (!modal) return null;

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
