import { createContext } from "react";

interface User {
  email: string;
  tokenId: string;
  slug?: string;
}

interface Auth {
  login: (email: string) => Promise<any>;
  logout: () => {};
  user: User;
}

const AuthContext = createContext({} as Auth);

export default AuthContext;
