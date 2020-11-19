import { useContext, useEffect, useState } from "react";
import styles from "../../styles/Navigation.module.scss";
import AuthContext from "../../contexts/AuthContext";
import Link from "next/link";
import UnreadMessagesModal from "../Modal/UnreadMessagesModal";
import { usePubNub } from "pubnub-react";
import { MessageActionEvent } from "pubnub";
import { useLocalStorage } from "../Hooks/useLocalStorage";

const Navigation = () => {
  const { user } = useContext(AuthContext);
  const [viewMessagesModal, setViewMessagesModal] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const pubnub = usePubNub();
  const { getItemFromLS } = useLocalStorage("notif_last_check");

  useEffect(() => {
    if (user && user.id) {
      pubnub.getMessageActions(
        {
          channel: `inbox-${user.id}`,
          limit: 100,
        },
        (_, res) => {
          const formatedNotificationList = res.data.map((notification) => ({
            messageTime: notification.actionTimetoken,
            from: notification.uuid,
            fromChannel: notification.value,
          }));

          setNotifications((_) => {
            const cleanNotifications = [];
            formatedNotificationList.filter((formatedNotif) => {
              const notifIndex = cleanNotifications.findIndex(
                (el) => el.from === formatedNotif.from
              );

              const lastCheckTime = new Date(getItemFromLS()).getTime();
              const messageSentTime = new Date(
                formatedNotif.messageTime
              ).getTime();
              if (notifIndex == -1 && messageSentTime > lastCheckTime) {
                cleanNotifications.push(formatedNotif);
              }
            });

            return cleanNotifications;
          });
        }
      );
    }
  }, [user]);

  useEffect(() => {
    pubnub.addListener({
      messageAction: (ma: MessageActionEvent) => {
        const notification = {
          messageTime: ma.data.actionTimetoken,
          from: ma.publisher,
          fromChannel: ma.data.value,
        };

        setNotifications((oldNotifications) => {
          const indexOfOldNotification = oldNotifications.findIndex(
            (oldNotif) => oldNotif.from == ma.publisher
          );

          if (indexOfOldNotification !== -1) {
            const notifications = [...oldNotifications];
            // updaing old notification (if needed)
            notifications[indexOfOldNotification] = { ...notification };
            return notifications;
          }
          return [...oldNotifications, notification];
        });
      },
    });
  }, []);

  return (
    <>
      <nav className={styles.navigation}>
        <div className={styles.innerNavigation}>
          <Link href="/">
            <a>
              <img src="/images/logo.svg" alt="Esperti" />
            </a>
          </Link>
          <button onClick={() => setViewMessagesModal(true)}>Messages</button>
          {user && (
            <Link href="/settings">
              <div className={styles.user}>
                <img src="/images/user_profile.svg" alt="Avatar" />
                <span>{user.name}</span>
              </div>
            </Link>
          )}
          {!user && (
            <Link href="/login">
              <a className={styles.loginButton}>
                Log In <img src="/images/arrow_right.svg" alt="log in" />
              </a>
            </Link>
          )}
        </div>
      </nav>
      {viewMessagesModal && (
        <UnreadMessagesModal
          closeModal={() => setViewMessagesModal(false)}
          notifications={notifications}
        />
      )}
    </>
  );
};

export default Navigation;
