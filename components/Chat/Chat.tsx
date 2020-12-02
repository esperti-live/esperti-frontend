import { useContext, useEffect, useRef, useState } from "react";
import { useChat } from "../Hooks/useChat";
import axios from "axios";
import Link from "next/link";

import styles from "../../styles/Chat.module.scss";
import { useRouter } from "next/router";
import OtherUserHeader from "./OtherUserHeader";
import AuthContext from "../../contexts/AuthContext";

const ChatModal = ({
  channel,
  other,
  expert,
  hideOther = false,
  showControlls = true,
}) => {
  const [input, setInput] = useState<string>("");
  const BottomDivRef = useRef(null);
  const { messages, subscribe, sendMessage } = useChat(channel);
  const router = useRouter();
  const { user: currentUser } = useContext(AuthContext);

  useEffect(() => {
    if (messages.length == 0) {
      subscribe();
    }

    /*
      Scrolls to the bottom of chat when there is a new message
     */
    BottomDivRef.current.scrollIntoView();
  }, [messages]);

  /*
      Runs when a user submits the form to send a message
  */
  const formSubmitHandler = (e) => {
    e.preventDefault();
    if (input) {
      const ids = channel.split("-");
      const receiverId = ids[0] == currentUser.id ? ids[1] : ids[0];

      sendMessage(input, `inbox-${receiverId}`);
      setInput("");
      BottomDivRef.current.scrollIntoView();
    }
  };

  /*
      Creates a session, sends a link in chat & redirects user to session
  */

  const createSessionHandler = async () => {
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_STRAPI_URL}/sessions`,
        { expert_id: other.id },
        {
          headers: { Authorization: `Bearer ${currentUser.tokenId}` },
        }
      );

      const url = `/sessions/${res.data.slug}`;
      sendMessage(
        `<a href="${url}">SESSION CREATED: ${res.data.slug}</a>`,
        `inbox-${currentUser.id}`
      );
      router.push(url);
    } catch (err) {
      console.log(err);
    }
  };

  const formatMessage = (message: string) => {
    if (String(message).includes('<a href="/sessions')) {
      return (
        <span
          className={styles.message}
          dangerouslySetInnerHTML={{ __html: message }}
        />
      );
    }

    return <p className={styles.message}> {message}</p>;
  };

  return (
    <div className={styles.chat}>
      {!hideOther && (
        <OtherUserHeader
          name={other.name}
          image={null}
          rate={expert?.rate}
          channel={channel}
        />
      )}

      <div className={styles.messagesContainer}>
        <div className={styles.messages}>
          {messages.map((msg) => (
            <div
              key={msg.time + Math.random()}
              className={`${
                msg.publisher === currentUser.name
                  ? styles.ownMessage
                  : styles.otherMessage
              }`}
            >
              {formatMessage(msg.message)}
            </div>
          ))}
          <div ref={BottomDivRef} className={styles.bottomItemChat}></div>
        </div>

        {currentUser.type === "customer" && showControlls && (
          <div className={styles.buttonContainer}>
            <button onClick={createSessionHandler}>+ Create Session</button>
            <Link href="/new-request">
              <a>Submit Request</a>
            </Link>
          </div>
        )}
      </div>

      <form onSubmit={formSubmitHandler} className={styles.sendMessage}>
        {/* add this */}
        {/* <input type="file" alt="Add file" /> */}
        <input
          type="text"
          onChange={(e) => setInput(e.target.value)}
          value={input}
          className={styles.messageInput}
        />
        <button type="submit">
          <img src="/images/send_message.svg" alt="Send message" />
        </button>
      </form>
    </div>
  );
};

export default ChatModal;
