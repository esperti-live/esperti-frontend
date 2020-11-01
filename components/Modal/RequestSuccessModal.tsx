import React from "react";
import Modal from "../Modal";
import Link from "next/link";
import styles from "../../styles/Modal.module.scss";
import { useRouter } from "next/router";

const CheckEmailModal = ({ closeModal }) => {
  const router = useRouter();
  return (
    <Modal closeModal={closeModal}>
      <img src="/images/request_success.svg" alt="Request successfully added" />
      <h5>Your Request Submitted</h5>
      <p>You'll get an email once our experts answer on your question</p>
      <Link href="/requests">
        <a className={styles.btnPrimary}>Show All Requests</a>
      </Link>

      <button
        className={styles.btnSecondary}
        onClick={() => router.reload()}
        type="button"
      >
        Submit Another Request
      </button>
    </Modal>
  );
};

export default CheckEmailModal;
