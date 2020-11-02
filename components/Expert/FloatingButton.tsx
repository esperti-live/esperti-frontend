import { useContext, useState } from "react";
import styles from "../../styles/Button.module.scss";
import AuthContext from "../../contexts/AuthContext";
import { Expert } from "../../ts/interfaces";
import SendMessageModal from "../Modal/SendMessageModal";

interface FloatingButtonProps {
  editMode: boolean;
  changeEditMode: () => void;
  profile: Expert;
}

const isUserProfile = false;

const FloatingButton = ({
  changeEditMode,
  editMode,
  profile,
}: FloatingButtonProps) => {
  const { user } = useContext(AuthContext);
  const [showModal, setShowModal] = useState(false);
  // todo: check if current account is your account

  if (isUserProfile && editMode) {
    return (
      <button
        type="button"
        className={styles.expertFloatingButton}
        onClick={changeEditMode}
      >
        Stop Editing
      </button>
    );
  } else if (isUserProfile) {
    return (
      <button
        type="button"
        className={styles.expertFloatingButton}
        onClick={changeEditMode}
      >
        Edit
      </button>
    );
  } else {
    return (
      <>
        {showModal && (
          <SendMessageModal
            closeModal={() => setShowModal(false)}
            profile={profile}
          />
        )}
        <button
          type="button"
          className={styles.expertFloatingButton}
          onClick={() => setShowModal(true)}
        >
          Message
        </button>
      </>
    );
  }
};

export default FloatingButton;
