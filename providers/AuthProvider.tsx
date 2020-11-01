import { useState, useEffect } from "react";
import AuthContext from "../contexts/AuthContext";
import { Magic } from "magic-sdk";

let m: Magic;

interface User {
  email: string;
  tokenId: string;
}

export default function AuthProvider({ children }) {
  const [user, setUser] = useState<User | null>(null);

  const login = (email: string) => {
    console.log("logging in");
    return new Promise(async (resolve, reject) => {
      try {
        const res = await m.auth.loginWithMagicLink({ email, showUI: false });
        console.log(res);
        setUser({ tokenId: res, email });
        resolve({ email, tokenId: res });
      } catch (err) {
        console.log(err);
        reject();
      }
    });
  };

  const logout = async () => {
    console.log("logging out");
    try {
      m.user.logout();
      setUser(null);
    } catch (error) {
      console.log(error);
    }
  };

  const persistUser = async () => {
    try {
      const { email } = await m.user.getMetadata();
      const tokenId = await m.user.generateIdToken();
      setUser({ email, tokenId });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    m = new Magic("pk_test_635E3B2FA9831709");

    (async () => {
      try {
        const isLoggedIn = await m.user.isLoggedIn();
        console.log(await m.user);

        if (isLoggedIn) {
          persistUser();
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
