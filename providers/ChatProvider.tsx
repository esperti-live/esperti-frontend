import {useState, useContext} from 'react'

import AuthContext from "../contexts/AuthContext";
import ChatContext from "../contexts/ChatContext";

import Chat from "../components/Chat/Chat";
import Modal from "../components/Modal"

import {getChannel} from "../utils/chat"

const EMPTY_CHAT = null

export default function ChatProvider({ children }) {
  const {user} = useContext(AuthContext)
  const [chat, setChat] = useState(EMPTY_CHAT)

  const openChat = (other: any, expert?: any) => {
    const channel = getChannel(other.id, user.id)

    setChat({
      channel,
      other,
      expert
    })
  }
  const closeChat = () => {
    setChat(EMPTY_CHAT)
  }

  return (
    <ChatContext.Provider
      value={{chat, openChat, closeChat}}
    >
      {chat &&
        <Modal closeModal={() => closeChat()}>
          <Chat
            channel={chat.channel}
            other={chat.other}
            expert={chat.expert}
          />
        </Modal>
      }
      {children}
    </ChatContext.Provider>
  );
}

export const useOpenChat = () => {
  const {openChat} = useContext(ChatContext)

  return openChat
}