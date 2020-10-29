import { useState, useContext } from "react";
import AuthContext from "../contexts/AuthContext";

export default function login() {
  const [emailInput, setEmailInput] = useState<string>("");
  const { login } = useContext(AuthContext);

  const loginHandler = (e) => {
    console.log("logging in", emailInput);
    e.preventDefault();
    login(emailInput);
  };

  return (
    <div>
      login page
      <form onSubmit={loginHandler}>
        <input
          type="email"
          required
          onChange={(e) => setEmailInput(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
