import styles from "../styles/components/modal/Modal.module.scss";

interface ModalProps {
  children: any;
  closeModal: () => void;
}

export default function Modal({ children, closeModal }: ModalProps) {
  return (
    <>
      <div className={styles.backdrop} onClick={closeModal}></div>
      <div className={styles.modal}>
        <button className={styles.modalClose} onClick={closeModal}>
          &#10006;
        </button>
        {children}
      </div>
    </>
  );
}
