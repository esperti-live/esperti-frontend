import { useState, useEffect, useContext, useRef } from "react";
import { usePubNub } from "pubnub-react";
import NotificationContext from "../../contexts/NotificationContext";

export const useChat = (channel) => {
  const [messages, setMessages] = useState([]);
  const { addNotification } = useContext(NotificationContext);
  const pubnub = usePubNub();

  useEffect(() => {
    fetchMessages();
    subscribe()
  }, []);

  const sendMessage = (message: string, receiverChannel: string) => {
    pubnub.publish({
      message,
      channel,
    });

    addNotification(channel);
  };

  const latestMessagesRef = useRef([]);
  useEffect(() => {
    latestMessagesRef.current = messages
  }, [messages])
  /*
    Subscribes to channel
  */
  const subscribe = () => {
    pubnub.subscribe({ channels: [channel] });
    addListener();
  };

  /*
    Listens to new messages that are coming in
  */
  const addListener = () => {
    pubnub.addListener({
      message: (message) => {
        const channelName = message.channel;
        
        if(channelName !== channel){
          return
        }

        const formattedMessage = {
          message: message.message,
          time: message.timetoken,
          publisher: message.publisher,
        };

        setMessages([...latestMessagesRef.current].concat(formattedMessage));
      },
    });
  };

  /*
    Checks if there are any old messages & sends them into state
  */
  const fetchMessages = () => {
    pubnub.fetchMessages(
      {
        channels: [channel],
        count: 1000,
      },
      (_, response: any) => {
        if (Object.keys(response.channels).length > 0) {
          const formattedMessage = response.channels[channel].map((msg) => ({
            message: msg.message,
            time: msg.timetoken,
            publisher: msg.uuid,
          }));

          setMessages(formattedMessage);
        }
      }
    );
  };

  return { messages, addListener, subscribe, sendMessage };
};
