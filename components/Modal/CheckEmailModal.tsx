import React from "react";
import Modal from "../Modal";
import Link from "next/link";

const CheckEmailModal = ({ closeModal }) => {
  return (
    <Modal closeModal={closeModal}>
      <img src="/images/check_email.svg" alt="Check your Email" />
      <h5>Check your Email!</h5>
      <p>Click the link in the email we just sent you to continue</p>
      <span>Made a typo?</span>
      <Link href="/login">
        <a>Change email</a>
      </Link>
    </Modal>
  );
};

export default CheckEmailModal;
