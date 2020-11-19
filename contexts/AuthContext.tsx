import { createContext } from "react";

interface User {
  email: string;
  tokenId: string;
  slug?: string;
  id: number;
  name?: string;
  type: string;
}

interface Auth {
  login: (email: string) => Promise<any>;
  logout: () => void;
  persistUser: () => Promise<any>;
  user: User;
}

const AuthContext = createContext({} as Auth);

export default AuthContext;
