import { useContext } from "react";
import styles from "../../styles/Button.module.scss";
import AuthContext from "../../contexts/AuthContext";
import { Expert } from "../../ts/interfaces";

interface FloatingButtonProps {
  editMode: boolean;
  changeEditMode: () => void;
  profile: Expert;
}

const isUserProfile = true;

const FloatingButton = ({
  changeEditMode,
  editMode,
  profile,
}: FloatingButtonProps) => {
  const { user } = useContext(AuthContext);
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
      <button type="button" className={styles.expertFloatingButton}>
        Message
      </button>
    );
  }
};

export default FloatingButton;
