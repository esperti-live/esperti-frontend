import { useState, useEffect, useContext } from "react";
import { usePubNub } from "pubnub-react";
import NotificationContext from "../../contexts/NotificationContext";

export const useChat = (channel) => {
  const [messages, setMessages] = useState([]);
  const { addNotification } = useContext(NotificationContext);
  const pubnub = usePubNub();

  useEffect(() => {
    fetchMessages();
  }, []);

  const sendMessage = (message: string, receiverChannel: string) => {
    pubnub.publish({
      message,
      channel,
    });

    addNotification(receiverChannel, channel);
  };

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
        console.log(message);
        const formattedMessage = {
          message: message.message,
          time: message.timetoken,
          publisher: message.publisher,
        };

        setMessages((oldMessages) => oldMessages.concat(formattedMessage));
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
        count: 100,
      },
      (_, response: any) => {
        if (Object.keys(response.channels).length > 0) {
          console.log(response.channels);
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
