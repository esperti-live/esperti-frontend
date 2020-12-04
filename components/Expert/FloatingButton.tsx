import { useContext } from "react";
import { Expert } from "../../ts/interfaces";

import AuthContext from "../../contexts/AuthContext";

import styles from "../../styles/components/Button.module.scss";

interface FloatingButtonProps {
  editMode: boolean;
  changeEditMode: () => void;
  profile: Expert;
  showChat: () => void;
}

const FloatingButton = ({
  changeEditMode,
  editMode,
  profile,
  showChat,
}: FloatingButtonProps) => {
  const { user } = useContext(AuthContext);

  if (user && user.slug == profile.slug && editMode) {
    return (
      <button
        type="button"
        className={styles.expertFloatingButton}
        onClick={changeEditMode}
      >
        Stop Editing
      </button>
    );
  } else if (user && user.slug == profile.slug) {
    //Show noting if it's your profile for now
    return <></>;
  } else if (user && user.id) {
    return (
      <>
        <button
          type="button"
          className={styles.expertFloatingButton}
          onClick={showChat}
        >
          Message
        </button>
      </>
    );
  } else {
    return null;
  }
};

export default FloatingButton;
