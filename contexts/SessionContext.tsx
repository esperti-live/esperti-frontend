import { createContext } from "react";
import { Session } from "../ts/interfaces";

interface SessionContext {
  session: Session;
  setCurrentSession: (sess: Session) => void;
}

const SessionContext = createContext({} as SessionContext);

export default SessionContext;
