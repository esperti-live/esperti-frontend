import React, { useState } from "react";

import styles from "../../styles/components/SendMessage.module.scss";

const SendMessage = ({ currentUser, channel, sendMessage, BottomDivRef }) => {
  const [input, setInput] = useState<string>("");

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

  return (
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
  );
};

export default SendMessage;
