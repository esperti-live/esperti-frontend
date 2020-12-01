import Head from "next/head";
import { useContext, useEffect, useState } from "react";
import { useNotifications } from "../components/Hooks/useNotifications";
import AuthContext from "../contexts/AuthContext";
import styles from "../styles/Notification.module.scss";
import Chat from "../components/Chat/Chat";
import { getChannel } from "../utils/chat";

export default function request() {
  const { user } = useContext(AuthContext);
  const [showChat, setShowChat] = useState(false);
  const [chatData, setChatData] = useState({
    channel: "",
    user: null,
    expert: null,
  });

  const notifications = useNotifications(user);
  console.log(notifications);

  console.log(user);
  useEffect(() => {
    if (!user) {
      console.log("no user");
    }
  }, []);
  // ADD LOADING LOGIC

  // if (!notifications.length) {
  //   return (
  //     <>
  //       <Head>
  //         <title>Esperti.live | Messages</title>
  //       </Head>
  //       <div className={styles.notificationContainer}>
  //         <p>Loading....</p>
  //       </div>
  //     </>
  //   );
  // } else {

  const openChatHandler = (notification) => {
    const formattedExpert = {
      id:
        user.type === "expert"
          ? user.id
          : Number(Object.keys(notification.people)[0]),
      name:
        user.type === "expert"
          ? user.name
          : Object.values(notification.people)[0],
    };
    const formattedUser = {
      id:
        user.type === "expert"
          ? Number(Object.keys(notification.people)[0])
          : user.id,
      name:
        user.type === "expert"
          ? Object.values(notification.people)[0]
          : user.id,
    };

    setChatData({
      channel: notification.chatId,
      user: formattedUser,
      expert: formattedExpert,
    });

    setShowChat(true);
  };

  if (showChat) {
    return (
      <Chat
        channel={chatData.channel}
        user={chatData.user}
        expert={chatData.expert}
      />
    );
  } else {
    return (
      <>
        <Head>
          <title>Esperti.live | Messages</title>
        </Head>
        <div className={styles.notificationContainer}>
          {notifications.reverse().map((notification) => (
            <button
              key={notification.chatId}
              onClick={() => openChatHandler(notification)}
              className={styles.notification}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <g fill="#1652f0">
                  <path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z"></path>
                </g>
              </svg>
              <div>
                <p>{Object.values(notification.people)[0]}</p>
                <h3>{notification.lastMessage}</h3>
              </div>
            </button>
          ))}
        </div>
      </>
    );
  }
}
// }
