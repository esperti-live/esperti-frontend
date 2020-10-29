import {useState, useEffect} from 'react';
import AuthContext from '../contexts/AuthContext';
import {Magic} from 'magic-sdk';

let m: Magic;

interface User  {
  email: string,
  tokenId: string
}

export default function AuthProvider({children}) {
  const [user, setUser] = useState<User | null>(null);

  const login = async (email: string) => {
    console.log('logging in');
    try {
     const res = await m.auth.loginWithMagicLink({email, showUI: true});
     setUser({tokenId: res, email});
    } catch(error) {
      console.log(error);
    }
  }

  const logout = async () => {
    console.log('logging out');
    try{
      m.user.logout();
    } catch(error) {
      console.log(error);
    }
  }

  const persistUser = async () => {
    try {
      const { email, publicAddress } = await m.user.getMetadata();
      setUser({ email, tokenId: publicAddress });
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    m = new Magic('pk_test_34B988B683181D01'); 

    (async () => {
      try {
        const isLoggedIn = m.user.isLoggedIn();

        if (isLoggedIn) {
          persistUser();
        }

      }
      catch(error) {
        console.log(error);
      }

    })();

  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>

  )
}
