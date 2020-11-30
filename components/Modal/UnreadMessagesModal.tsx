import { useContext, useEffect, useState } from "react";
import { useLocalStorage } from "../Hooks/useLocalStorage";
import Modal from "../Modal";
import Chat from "../Chat";
import AuthContext from "../../contexts/AuthContext";
import styles from "../../styles/Notification.module.scss";

const UnreadMessagesModal = ({ closeModal, notifications }) => {

  console.log("UnreadMessagesModal notifications", notifications)

  const [displayModal, setDisplayModal] = useState("unread_messages");
  const [chatChannel, setChatChannel] = useState("");
  const { setItemToLS } = useLocalStorage("notif_last_check");
  const { user } = useContext(AuthContext);

  useEffect(() => {
    setItemToLS(new Date().getTime());
  }, []);

  const closeModalHandler = () => closeModal();

  const openChatHandler = (channel: string) => {
    setDisplayModal("chat");
    setChatChannel(channel);
  };

  const getExpertId = () => {
    if (user.type === "expert") {
      return user.id;
    }

    const ids = chatChannel.split("-");
    return Number(ids[0]) === user.id ? ids[1] : ids[0];
  };

  return (
    <>
      <Modal closeModal={closeModalHandler}>
        {displayModal == "unread_messages" && (
          <div className={styles.notificationContainer}>
            {notifications.reverse().map((notification) => (
              <button
                key={notification.from}
                onClick={() => openChatHandler(notification.fromChannel)}
                className={styles.notification}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <title>ic_message_24px</title>
                  <g fill="#1652f0">
                    <path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z"></path>
                  </g>
                </svg>
                <p>
                  {notification.from}
                </p>
              </button>
            ))}
          </div>
        )}

        {displayModal == "chat" && (
          <Chat
            channel={chatChannel}
            user={user}
            expert={{ id: getExpertId() }}
          />
        )}
      </Modal>
    </>
  );
};

export default UnreadMessagesModal;
