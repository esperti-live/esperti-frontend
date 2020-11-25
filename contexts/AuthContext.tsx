import { createContext } from "react";
import { User } from "../ts/interfaces"


interface Auth {
  login: (email: string) => Promise<any>;
  logout: () => void;
  persistUser: () => Promise<any>;
  user: User;
}

const AuthContext = createContext({} as Auth);

export default AuthContext;
