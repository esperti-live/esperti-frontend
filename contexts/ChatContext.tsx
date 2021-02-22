import { createContext } from "react";

interface ChatContext {
  chat: {
    channel: string,
    expert: {
      rate
    },
    other: any
  },
  openChat: (other: any, expert?: any) => void,
  closeChat: () => void,
}

const ChatContext = createContext({} as ChatContext);

export default ChatContext;
