import { useContext, useState } from "react";
import { Notification } from "../ts/interfaces";
import NotificationContext from "../contexts/NotificationContext";
import { usePubNub } from "pubnub-react";
import { useLocalStorage } from "../components/Hooks/useLocalStorage";
import AuthContext from "../contexts/AuthContext";

export default function AuthProvider({ children }) {
  const [notifications, setNotifications] = useState<Notification[] | []>([]);
  const [notificationCount, setNotificationCount] = useState(0);
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

        const cleanNotifications = [];
        setNotifications((_) => {
          formatedNotificationList.filter((formatedNotif) => {
            const notifIndex = cleanNotifications.findIndex(
              (el) => el.from === formatedNotif.from
            );
            const lastCheckTime = new Date(getItemFromLS()).getTime();
            const messageSentTime = Number(formatedNotif.messageTime);
            if (notifIndex == -1) {
              cleanNotifications.push({
                ...formatedNotif,
                newMsg: messageSentTime > lastCheckTime,
              });
            }
          });
          return cleanNotifications;
        });

        const newNotifCount = cleanNotifications.filter(
          (notif) => notif.newMsg == true
        ).length;
        setNotificationCount(newNotifCount);
      }
    );
  };

  const addNotificationListener = () => {
    pubnub.addListener({
      messageAction: function () {
        this.refreshNotifications();
      },
    });
  };

  const addNotification = (receiverChannel: string, channel: string) => {
    pubnub.getMessageActions(
      {
        channel: `inbox-${receiverChannel.split("-")[1]}`,
        limit: 100,
      },
      (_, res) => {
        const oldNotificationIndex = res.data.findIndex(
          (notif) => notif.value == channel
        );

        if (oldNotificationIndex !== -1) {
          pubnub.removeMessageAction({
            channel: `inbox-${receiverChannel.split("-")[1]}`,
            actionTimetoken: res.data[oldNotificationIndex].actionTimetoken,
            messageTimetoken: res.data[oldNotificationIndex].messageTimetoken,
          });
        }

        pubnub.addMessageAction({
          channel: receiverChannel,
          messageTimetoken: new Date().getTime().toString(),
          action: {
            type: "new_message",
            value: channel,
          },
        });
      }
    );
  };
  return (
    <NotificationContext.Provider
      value={{
        notifications,
        refreshNotifications,
        addNotificationListener,
        addNotification,
        notificationCount,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
}
