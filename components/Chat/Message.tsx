import Link from "next/link";
import React, { useContext } from "react";
import AuthContext from "../../contexts/AuthContext";

import styles from "../../styles/components/Message.module.scss";

const Message = ({ msg }) => {
  const { user } = useContext(AuthContext);
  /**
   * Formats message in case it is a session link
   * @param message
   * @returns formatted message
   */

  const formatMessage = (message: string) => {
    if (String(message).includes(":#$!sess")) {
      const sessionId = message.split(":")[0];
      return (
        <div className={`${styles.sessionLink}`}>
          <Link href={`/sessions/${sessionId}`}>
            <a className={styles.message}>Session created: {sessionId}</a>
          </Link>
        </div>
      );
    }

    return (
      <div
        className={`${
          msg.publisher === user.name ? styles.ownMessage : styles.otherMessage
        }`}
      >
        <p className={styles.message}> {message}</p>
      </div>
    );
  };

  return formatMessage(msg.message);
};

export default Message;
