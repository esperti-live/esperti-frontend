import { useState, useEffect } from "react";
import AuthContext from "../contexts/AuthContext";
import { usePubNub } from "pubnub-react";
import {
  authenticateUser,
  unauthenticateUser,
  persistAuthentication,
  checkIfAuthenticated,
} from "../utils/authentication";
import { Magic } from "magic-sdk";

let m: Magic;
export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [userLoading, setUserLoading] = useState(false);
  const pubnub = usePubNub();

  const login = async (email: string) => {
    const userData = await authenticateUser(m, email);
    setUserAndData(userData);
  };

  const logout = (): void => {
    unauthenticateUser(m);
    setUser("");
  };

  const persistUser = async () => {
    setUserLoading(true);
    const userData = await persistAuthentication(m);
    setUserLoading(false);
    setUserAndData(userData);
  };

  const setUserAndData = (data) => {
    pubnub.setUUID(data.id);
    pubnub.subscribe({
      channels: ["global"],
    });
    setUser({ ...data });
  };

  useEffect(() => {
    m = new Magic(process.env.NEXT_PUBLIC_MAGIC_PK);
    (async () => {
      if (await checkIfAuthenticated(m)) {
        persistUser();
      }
    })();
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, login, logout, persistUser, userLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
}
