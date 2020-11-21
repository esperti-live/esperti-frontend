import { useContext, useState } from "react";
import styles from "../../styles/Button.module.scss";
import AuthContext from "../../contexts/AuthContext";
import { Expert } from "../../ts/interfaces";
import { getChannel } from "../../utils/chat";
import ChatModal from "../../components/Modal/ChatModal";

interface FloatingButtonProps {
  editMode: boolean;
  changeEditMode: () => void;
  profile: Expert;
}

const FloatingButton = ({
  changeEditMode,
  editMode,
  profile,
}: FloatingButtonProps) => {
  const { user } = useContext(AuthContext);
  const [showModal, setShowModal] = useState(false);

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
        {showModal && (
          <ChatModal
            closeModal={() => setShowModal(false)}
            channel={getChannel(user.id, profile.id)}
            user={user}
            expert={profile}
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
  } else {
    return null;
  }
};

export default FloatingButton;
