import { useState } from "react";
import { Session } from "../ts/interfaces";
import SessionContext from "../contexts/SessionContext";

export default function AuthProvider({ children }) {
  const [session, setSession] = useState<Session | null>(null);

  const setCurrentSession = (sess: Session) => setSession(sess);

  return (
    <SessionContext.Provider value={{ session, setCurrentSession }}>
      {children}
    </SessionContext.Provider>
  );
}
