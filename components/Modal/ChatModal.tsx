import { useEffect, useRef, useState } from "react";
import { useChat } from "../Hooks/useChat";

import Modal from "../Modal";

import axios from "axios";

import styles from "../../styles/Chat.module.scss";
import { useRouter } from "next/router";

const ChatModal = ({ closeModal, channel, user, expert }) => {
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
    sendMessage(input);
    setInput("");
    BottomDivRef.current.scrollIntoView();
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

      sendMessage(`<a href="${url}">SESSION CREATED: ${res.data.slug}</a>`);
      router.push(url);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Modal closeModal={closeModal}>
      <div className={styles.chat}>
        <div className={styles.chatHead}>
          <h2>Chat</h2>
          {user.id !== expert.id && (
            <button onClick={createSessionHandler}>Create Session</button>
          )}
        </div>

        <div className={styles.messages}>
          {messages.map((msg) => (
            <div key={msg.time}>
              <strong>{msg.publisher}:</strong>
              {msg.message.includes('<a href="/sessions') ? (
                <span dangerouslySetInnerHTML={{ __html: msg.message }} />
              ) : (
                <span> {msg.message}</span>
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
    </Modal>
  );
};

export default ChatModal;
