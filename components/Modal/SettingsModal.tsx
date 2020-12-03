import React, { useContext } from "react";
import Modal from "../Modal";
import styles from "../../styles/Settings.module.scss";
import AuthContext from "../../contexts/AuthContext";

const CheckEmailModal = ({ closeModal }) => {
  const { logout, user } = useContext(AuthContext);

  const closeModalHandler = () => {
    closeModal();
    logout();
  };

  return (
    <Modal closeModal={closeModal}>
      <div className={styles.settings}>
        <img src="/images/profile-user-big.svg" alt={user.email} />
        <p>You are logged in as</p>
        <span>{user.email}</span>

        <button
          type="button"
          onClick={closeModalHandler}
          className={styles.logoutBtn}
        >
          Logout
        </button>

        <button
          onClick={() => console.log("delete account clicked")}
          className={styles.deleteAccountBtn}
        >
          Delete Account
        </button>
      </div>
    </Modal>
  );
};

export default CheckEmailModal;
