import Head from "next/head";

import { useContext, useEffect, useState } from "react";
import { useNotifications } from "../components/Hooks/useNotifications";

import AuthContext from "../contexts/AuthContext";
import Chat from "../components/Chat/Chat";

import styles from "../styles/pages/Messages.module.scss";
import { useRouter } from "next/router";

/**
 * Given a notification return my name and id
 * @param notification
 * @param user
 */
const getMyChatInfo = (notification, user) => {
  try {
    return notification.people[user.id];
  } catch (err) {
    return {
      id: "Not found",
      name: "Not found",
    };
  }
};

/**
 * Given a notification return the other person name and id
 * @param notification
 * @param user
 */
const getOtherChatInfo = (notification, user) => {
  try {
    const keys = Object.keys(notification.people);
    const myIndex = Object.keys(notification.people).findIndex(
      (key) => key === String(user.id)
    );
    const otherKey = myIndex === 0 ? keys[1] : keys[0]; //Get the opposite index
    return {
      id: Number(otherKey),
      name: notification.people[otherKey],
    };
  } catch (err) {
    console.log("Exception in findOtherPerson", err);
    return {
      id: "Not found",
      name: "Not found",
    };
  }
};

export default function Messages() {
  const { user } = useContext(AuthContext);
  const [showChat, setShowChat] = useState(false);
  const [chatData, setChatData] = useState({
    channel: "",
    me: null,
    other: null,
  });
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [notifications, dataLoading] = useNotifications(user);
  console.log("Messages notifications", notifications);
  console.log("Messages user", user);

  useEffect(() => {
    if (user && !dataLoading) {
      setLoading(false);
    }

    if (!user) {
      router.replace("/");
    }
  }, [user, dataLoading]);

  if (loading) {
    return (
      <>
        <Head>
          <title>Esperti.live | Messages</title>
        </Head>
        <div className={styles.notificationContainer}>
          <p>Loading....</p>
        </div>
      </>
    );
  } else {
    const other = console.log(
      "myChatInfo",
      getMyChatInfo(notifications[0], user)
    );
    console.log("findOtherPerson", getOtherChatInfo(notifications[0], user));

    const openChatHandler = (notification) => {
      setChatData({
        channel: notification.chatId,
        me: getMyChatInfo(notification, user),
        other: getOtherChatInfo(notification, user),
      });

      setShowChat(true);
    };

    const formatLastMessage = (notification) => {
      if (notification.lastMessage.includes(":#$!sess")) {
        return `New Session Created`;
      } else if (notification.lastMessage.length > 30) {
        return notification.lastMessage.slice(0, 30) + "...";
      }
      return notification.lastMessage;
    };

    if (showChat) {
      return (
        <Chat channel={chatData.channel} other={chatData.other} expert={null} />
      );
    } else {
      return (
        <>
          <Head>
            <title>Esperti.live | Messages</title>
          </Head>
          <div className={styles.notificationContainer}>
            {[...notifications].reverse().map((notification) => (
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
                  <p>{getOtherChatInfo(notification, user).name}</p>
                  <h3>{formatLastMessage(notification)}</h3>
                </div>
              </button>
            ))}
          </div>
        </>
      );
    }
  }
}
