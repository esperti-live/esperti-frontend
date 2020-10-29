import {createContext} from 'react';


interface User {
  email: string,
  tokenId: string
}

interface Auth {
  login: (email: string) => {};
  logout: () => {};
  user: User;
}

const AuthContext = createContext({} as Auth);

export default AuthContext;