import { useContext, useState, useEffect, useRef } from "react";
import { Notification } from "../ts/interfaces";
import NotificationContext from "../contexts/NotificationContext";
import { usePubNub } from "pubnub-react";
import { useLocalStorage } from "../components/Hooks/useLocalStorage";
import AuthContext from "../contexts/AuthContext";
import { getOtherUserId, getUserInbox, getChannel} from "../utils/chat";

/**
 * Given a list of by value types, return a list of the unique values
 * @param list 
 */
const uniqueValues = (list) => {
  return list.filter((value, index, self) => {
    return self.indexOf(value) === index;
  })
}

/**
 * Given a list of messages return the unique IDs
 * @param messages 
 */
const getUniqueProfiles = (messages) => {
  //Get the messages, containing the ids we care about
  const values = messages.map(message => message.message)
  const list = values.filter(message => typeof message !== 'string') //Remove dev string values
  
  //Unique
  return uniqueValues(list)
}

/**
 * Given a list of IDs enrich the data so we can display it
 *  from: used to display name
 *  fromChannel: used to set chat
 * @param uniques 
 */
const fromUniquesToNotifications = (uniques, user) => {
  return uniques.map(unique => ({ from: unique, fromChannel: getChannel(unique, user.id) }))
}

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

    if(user && user.id) {
      loadNotifications() //This is an expensive decision, let's monitor usage
    }
  }, [notificationCount, user])

  const refreshNotificationCount = () => {

    setNotificationCount(lastMessageCount.current + 1)
  };


  const loadNotifications = async () => {
    const data = await pubnub.fetchMessages({
      channels: [`inbox-${user.id}`],
      count: 100
    })

    const messages = data.channels[`inbox-${user.id}`]
    const uniques = getUniqueProfiles(messages)

    //From unique channels, make them look nice
    setNotifications(fromUniquesToNotifications(uniques, user))
  }

  
  const addNotificationListener = () => {
    console.log("NotificationProvider addNotificationListener")
    const channelId = `inbox-${user.id}`
    pubnub.subscribe({
      channels: [channelId]
    })
    //Debug for subs
    console.log("pubnub", pubnub.getSubscribedChannels())

    pubnub.addListener({
      message: function (message) {
        console.log("message", message)
        if(message.channel === channelId) {
          refreshNotificationCount();
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
      <button onClick={loadNotifications}>Load Messages</button>
      {children}
    </NotificationContext.Provider>
  );
}
