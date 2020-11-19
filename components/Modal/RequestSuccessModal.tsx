import React from "react";
import Modal from "../Modal";
import Link from "next/link";
import styles from "../../styles/Modal.module.scss";

const CheckEmailModal = ({ closeModal }) => {
  return (
    <Modal closeModal={closeModal}>
      <img src="/images/request_success.svg" alt="Request successfully added" />
      <h5>Your Request Submitted</h5>
      <p>You'll get an email once our experts answer on your question</p>
      <Link href="/my-requests">
        <a className={styles.btnPrimary}>Show All Requests</a>
      </Link>

      {/* <button
        className={styles.btnSecondary}
        onClick={() => closeModal()}
        type="button"
      >
        Submit Another Request
      </button> */}
    </Modal>
  );
};

export default CheckEmailModal;
