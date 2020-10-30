import { useContext } from "react";
import styles from "../../styles/Button.module.scss";
import AuthContext from "../../contexts/AuthContext";

interface FloatingButtonProps {
  editMode: boolean;
  changeEditMode: () => void;
}
const usersAccount = true; // placeholder

const FloatingButton = ({ changeEditMode, editMode }: FloatingButtonProps) => {
  const { user } = useContext(AuthContext);
  // todo: check if current account is your account

  if (usersAccount && editMode) {
    return (
      <button
        type="button"
        className={styles.expertFloatingButton}
        onClick={changeEditMode}
      >
        Save
      </button>
    );
  } else if (usersAccount) {
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