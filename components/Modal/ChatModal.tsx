import { useEffect, useRef, useState } from "react";
import Modal from "../Modal";
import styles from "../../styles/Chat.module.scss";
import { useChat } from "../Hooks/useChat";

const ChatModal = ({ closeModal, channel }) => {
  const [input, setInput] = useState<string>("");
  const BottomDivRef = useRef(null);

  const { messages, subscribe, sendMessage } = useChat(channel);

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

  console.log(messages);

  return (
    <Modal closeModal={closeModal}>
      <div className={styles.chat}>
        <h2>Chat</h2>

        <div className={styles.messages}>
          {messages.map((msg) => (
            <div key={msg.time}>
              <strong>{msg.publisher}:</strong> {msg.message}
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
