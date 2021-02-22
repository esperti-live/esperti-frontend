import { useContext, useState, useEffect, useRef } from "react";
import axios from "axios";
import uniqBy from "lodash.uniqby"
import { Notification } from "../ts/interfaces";
import NotificationContext from "../contexts/NotificationContext";
import { usePubNub } from "pubnub-react";
import { useLocalStorage } from "../Hooks/useLocalStorage";
import AuthContext from "../contexts/AuthContext";
import { getOtherUserId, getUserInbox, getChannel } from "../utils/chat";
import { getToken } from "../utils/magic";
import { useNotifications } from "../Hooks/useNotifications";

/**
 * Given a list of by value types, return a list of the unique values
 * @param list
 */
const uniqueValues = (list) => {
  return list.filter((value, index, self) => {
    return self.indexOf(value) === index;
  });
};

/**
 * Given a list of messages return the unique IDs
 * @param messages
 */
const getUniqueProfiles = (messages) => {
  if (!messages) {
    return [];
  }

  //Get the messages, containing the ids we care about
  const values = messages.map((message) => message.message);
  const list = values.filter((message) => message !== "user.id"); //Remove dev string values
  const integers = list.map((message) => Number(message));

  //Unique
  return uniqueValues(integers);
};

/**
 * Given a list of IDs enrich the data so we can display it
 *  from: used to display name
 *  fromChannel: used to set chat
 * @param uniques
 */
const fromUniquesToNotifications = (uniques, user) => {
  return uniques.map((unique) => ({
    from: unique,
    fromChannel: getChannel(unique, user.id),
  }));
};

export default function NotificationProvider({ children }) {
  const pubnub = usePubNub();

  const { user } = useContext(AuthContext);

  const [notifications, dataLoading, notificationCount, setNotificationCount] = useNotifications();


  const addNotification = async (channel: string, message: string) => {
    const receiver = getOtherUserId(channel, user);
    //Send message to inbox-receiver
    pubnub.publish({
      message: {lastMessage: message, recipient: user.id},
      channel: getUserInbox(receiver),
    });

    //Push a chat to Strapi for later use
    try {
      const token = await getToken();

      axios({
        method: "POST",
        url: `${process.env.NEXT_PUBLIC_STRAPI_URL}/chats`,
        headers: { Authorization: `Bearer ${token}` },
        data: {
          lastMessage: message,
          recipient: receiver,
        },
      });
    } catch (err) {
      console.log("Exception in addNotification ", err);
    }

    //Public your own notification so you can see it. HACK
    // pubnub.publish({
    //   message: receiver,
    //   channel: getUserInbox(String(user.id)),
    // });
    //Issue with this hack is that it will increase counter on client.
    //You could reduce counter and live with this
    //Then add a context for profiles to attach profile id to name
    //This is not bad
  };

  useEffect(() => {
    if (user) {

    } else {
      pubnub.unsubscribeAll();
    }
  }, [user]);

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        addNotification,
        notificationCount,
        setNotificationCount
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
}


export const useNotificationsFromContext = () => {
  const {notifications} = useContext(NotificationContext)
  return notifications
}