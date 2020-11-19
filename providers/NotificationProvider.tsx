import { useContext, useState } from "react";
import { Notification } from "../ts/interfaces";
import NotificationContext from "../contexts/NotificationContext";
import { usePubNub } from "pubnub-react";
import { useLocalStorage } from "../components/Hooks/useLocalStorage";
import AuthContext from "../contexts/AuthContext";
import { MessageAction } from "../ts/interfaces";

export default function AuthProvider({ children }) {
  const [notifications, setNotifications] = useState<Notification[] | []>([]);
  const { getItemFromLS } = useLocalStorage("notif_last_check");
  const pubnub = usePubNub();

  const { user } = useContext(AuthContext);

  const refreshNotifications = () => {
    pubnub.getMessageActions(
      {
        channel: `inbox-${user.id}`,
        limit: 100,
      },
      (_, res) => {
        const formatedNotificationList = res.data.map((notification) => ({
          messageTime: notification.messageTimetoken,
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
            const messageSentTime = Number(formatedNotif.messageTime);
            if (notifIndex == -1 && messageSentTime > lastCheckTime) {
              cleanNotifications.push(formatedNotif);
            }
          });

          return cleanNotifications;
        });
      }
    );
  };

  const addNotificationListener = () => {
    pubnub.addListener({
      messageAction: (ma: MessageAction) => {
        const notification = {
          messageTime: ma.data.timetoken,
          from: ma.publisher,
          fromChannel: ma.data.value,
        };

        setNotifications((oldNotifications: Notification[]) => {
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
  };

  const addNotification = (receiverChannel: string, channel: string) => {
    pubnub.addMessageAction({
      channel: receiverChannel,
      messageTimetoken: new Date().getTime().toString(),
      action: {
        type: "new_message",
        value: channel,
      },
    });
  };

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        refreshNotifications,
        addNotificationListener,
        addNotification,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
}
