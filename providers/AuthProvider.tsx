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
import { useLocalStorage } from "../components/Hooks/useLocalStorage";

let m: Magic;
export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const pubnub = usePubNub();

  const { setItemToLS, getItemFromLS, removeItemFromLS } = useLocalStorage(
    "user"
  );

  const login = async (email: string) => {
    const userData = await authenticateUser(m, email);
    setUserAndData(userData);
  };

  const logout = (): void => {
    unauthenticateUser(m);
    removeItemFromLS();
    setUser("");
  };

  const persistUser = async () => {
    const userData = await persistAuthentication(m);
    setUserAndData(userData);
  };

  const setUserAndData = (data) => {
    pubnub.setUUID(data.id);
    pubnub.subscribe({
      channels: ["global"],
    });

    // save email to local storage
    setItemToLS(data.email);
    setUser({ ...data });
  };

  useEffect(() => {
    const email = getItemFromLS();
    if (email) {
      setUser({ email });
    }

    m = new Magic(process.env.NEXT_PUBLIC_MAGIC_PK);
    (async () => {
      if (await checkIfAuthenticated(m)) {
        persistUser();
      }
    })();
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout, persistUser }}>
      {children}
    </AuthContext.Provider>
  );
}
