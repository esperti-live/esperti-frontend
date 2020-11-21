import { useEffect, useRef, useState } from "react";
import { useChat } from "../Hooks/useChat";
import axios from "axios";

import styles from "../../styles/Chat.module.scss";
import { useRouter } from "next/router";

const ChatModal = ({ channel, user, expert }) => {
  const [input, setInput] = useState<string>("");
  const BottomDivRef = useRef(null);

  const { messages, subscribe, sendMessage } = useChat(channel);
  const router = useRouter();

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
      const receiverId = ids[0] == user.id ? ids[1] : ids[0];

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
        { expert_id: expert.id },
        {
          headers: { Authorization: `Bearer ${user.tokenId}` },
        }
      );

      const url = `/sessions/${res.data.slug}`;

      sendMessage(
        `<a href="${url}">SESSION CREATED: ${res.data.slug}</a>`,
        `inbox-${user.id}`
      );
      router.push(url);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={styles.chat}>
      <div className={styles.chatHead}>
        <h2>Chat {channel}</h2>
        {user.id !== expert.id && (
          <button onClick={createSessionHandler}>Create Session</button>
        )}
      </div>

      <div className={styles.messages}>
        {messages.map((msg) => (
          <div key={msg.time + Math.random()}>
            <strong>{msg.publisher}:</strong>
            {msg.message.includes('<a href="/sessions') ? (
              <span
                className={styles.message}
                dangerouslySetInnerHTML={{ __html: msg.message }}
              />
            ) : (
              <p className={styles.message}> {msg.message}</p>
            )}
          </div>
        ))}
        <div ref={BottomDivRef}></div>
      </div>

      <form onSubmit={formSubmitHandler}>
        <input
          type="text"
          onChange={(e) => setInput(e.target.value)}
          value={input}
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default ChatModal;
