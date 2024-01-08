import Style from './modal-overlay.module.css';
import { ReactElement } from "react";

export default function ModalOverlay({children, closeModal}: { children: ReactElement, closeModal: () => void }) {
  const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
    closeModal();
  };

  return ( 
    <div className={Style.overlay} onClick={handleClick}>
      {children}
    </div>
  );

}
