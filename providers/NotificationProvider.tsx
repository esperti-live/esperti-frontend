import { useContext, useState, useEffect, useRef } from "react";
import { Notification } from "../ts/interfaces";
import NotificationContext from "../contexts/NotificationContext";
import { usePubNub } from "pubnub-react";
import { useLocalStorage } from "../components/Hooks/useLocalStorage";
import AuthContext from "../contexts/AuthContext";
import { getOtherUserId, getUserInbox } from "../utils/chat";

export default function AuthProvider({ children }) {
  const [notifications, setNotifications] = useState<Notification[] | []>([]);
  const [notificationCount, setNotificationCount] = useState(0);
  const lastMessageCount = useRef(notificationCount);


  const { getItemFromLS } = useLocalStorage("notif_last_check");
  const pubnub = usePubNub();

  const { user } = useContext(AuthContext);

  /**
   * Use ref to keep counter updated, because pubnub is a closure
   */
  useEffect(() => {
    lastMessageCount.current = notificationCount
  }, [notificationCount])

  const refreshNotifications = () => {
    console.log("notificationCount", notificationCount)
    setNotificationCount(lastMessageCount.current + 1)
  };

  
  
  const addNotificationListener = () => {
    console.log("NotificationProvider addNotificationListener")
    const channelId = `inbox-${user.id}`
    pubnub.subscribe({
      channels: [channelId, '1-5']
    })
    //Debug for subs
    console.log("pubnub", pubnub.getSubscribedChannels())

    pubnub.addListener({
      message: function (message) {
        console.log("message", message)
        if(message.channel === channelId) {
          refreshNotifications();
        }        
      },
    });
  };

  const addNotification = (channel: string) => { 
    const receiver = getOtherUserId(channel, user)
    //Send message to inbox-receiver
    pubnub.publish({
      message: 'user.id',
      channel: getUserInbox(receiver),
    });
  };

  useEffect(() => {
    if(user) {
      addNotificationListener()
    } else {
      pubnub.unsubscribeAll()
    }
  }, [user])

  
  return (
    <NotificationContext.Provider
      value={{
        notifications,
        addNotification,
        notificationCount,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
}
