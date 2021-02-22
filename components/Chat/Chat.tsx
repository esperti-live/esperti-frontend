import { useContext, useEffect, useRef } from "react";
import { useChat } from "../Hooks/useChat";
import { useRouter } from "next/router";
import { getToken } from "../../utils/magic";

import Link from "next/link";
import axios from "axios";
import OtherUserHeader from "./OtherUserHeader";
import AuthContext from "../../contexts/AuthContext";

import styles from "../../styles/components/Chat.module.scss";
import SendMessage from "./SendMessage";
import Message from "./Message";

const Chat = ({
  channel,
  other,
  expert,
  hideOther = false,
  showControlls = true,
}) => {
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
      Creates a session, sends a link in chat & redirects user to session
  */

  const createSessionHandler = async () => {
    try {
      const tokenId = await getToken();
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_STRAPI_URL}/sessions`,
        { expert_id: other.id },
        {
          headers: { Authorization: `Bearer ${tokenId}` },
        }
      );

      const session = res.data.slug;

      // this is used to identity that we are sending a session id
      const identifier = ":#$!sess";

      sendMessage(session + identifier, `inbox-${currentUser.id}`);
      router.push(`/sessions/${res.data.slug}`);
    } catch (err) {
      console.log(err);
    }
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
            <Message msg={msg} key={msg.time + Math.random()} />
          ))}
          <div ref={BottomDivRef} className={styles.bottomItemChat}></div>
        </div>

        {currentUser.type === "customer" && showControlls && (
          <div className={styles.buttonContainer}>
            <button onClick={createSessionHandler}>+ Create Session</button>
          </div>
        )}
      </div>

      <SendMessage
        channel={channel}
        currentUser={currentUser}
        sendMessage={sendMessage}
        BottomDivRef={BottomDivRef}
      />
    </div>
  );
};

export default Chat;
