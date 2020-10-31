import React from "react";
import { useState, useContext } from "react";
import AuthContext from "../../contexts/AuthContext";

export default function LoginForm({ afterLogin }) {
  const [emailInput, setEmailInput] = useState<string>("");
  const { login, user } = useContext(AuthContext);

  const loginHandler = async (e) => {
    console.log("logging in", emailInput);
    e.preventDefault();
    const res = await login(emailInput);
    console.log(res);
    console.log(user);
    afterLogin();
  };

  return (
    <form onSubmit={loginHandler}>
      <input
        type="email"
        required
        onChange={(e) => setEmailInput(e.target.value)}
      />
      <button type="submit">Login</button>
    </form>
  );
}
