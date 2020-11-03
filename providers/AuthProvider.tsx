import { useState, useEffect } from "react";
import AuthContext from "../contexts/AuthContext";
import { Magic } from "magic-sdk";
import axios from "axios";

let m: Magic;
const getProfileData = async (token) => {
  try {
    const req = await axios.get(
      `${process.env.NEXT_PUBLIC_STRAPI_URL}/profiles/my`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    console.log(req);
    return { slug: req.data.slug, id: req.data.id };
  } catch (err) {
    return "";
  }
};

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [userLoading, setUserLoading] = useState(false);

  const login = (email: string) => {
    console.log("logging in");
    return new Promise(async (resolve, reject) => {
      try {
        const token = await m.auth.loginWithMagicLink({ email, showUI: false });

        console.log("here");
        const data = await getProfileData(token);

        setUser({ tokenId: token, email, ...data });
        resolve({ email, tokenId: token });
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
    return new Promise(async (resolve, reject) => {
      try {
        const { email } = await m.user.getMetadata();
        const tokenId = await m.user.generateIdToken();
        const data = await getProfileData(tokenId);

        console.log(tokenId);
        setUser({ email, tokenId, ...data });
        resolve({ email, tokenId, ...data });
        setUserLoading(false);
      } catch (err) {
        console.log(err);
        reject(err);
      }
    });
  };

  useEffect(() => {
    m = new Magic(process.env.NEXT_PUBLIC_MAGIC_PK);

    (async () => {
      try {
        const isLoggedIn = await m.user.isLoggedIn();
        console.log("User is loggedin", await m.user);

        if (isLoggedIn) {
          setUserLoading(true);
          persistUser();
        }
      } catch (error) {
        console.log(error);
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
