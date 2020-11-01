import styles from "../styles/Modal.module.scss";

interface ModalProps {
  children: any;
  closeModal: () => void;
}

export default function Modal({ children, closeModal }: ModalProps) {
  return (
    <>
      <div className={styles.backdrop} onClick={closeModal}></div>
      <div className={styles.modal}>{children}</div>
    </>
  );
}
