import { useContext, useEffect, useState } from "react";
import { useLocalStorage } from "../Hooks/useLocalStorage";
import Modal from "../Modal";
import Chat from "../Chat";
import AuthContext from "../../contexts/AuthContext";
import expert from "../../pages/expert/[slug]";

const ChatModal = ({ closeModal, notifications }) => {
  const [displayModal, setDisplayModal] = useState("unread_messages");
  const [chatChannel, setChatChannel] = useState("");
  const { setItemToLS } = useLocalStorage("notif_last_check");
  const { user } = useContext(AuthContext);

  useEffect(() => {
    setItemToLS(new Date().getTime());
  }, []);

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
      <Modal closeModal={closeModal}>
        {displayModal == "unread_messages" && (
          <div style={{ overflowY: "scroll", height: "350px" }}>
            {notifications.reverse().map((notification) => (
              <button
                key={notification.from}
                onClick={() => openChatHandler(notification.fromChannel)}
              >
                New message from {notification.from}
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

export default ChatModal;
