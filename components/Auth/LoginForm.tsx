import { useRouter } from "next/router";
import React from "react";
import { useState, useContext } from "react";
import AuthContext from "../../contexts/AuthContext";
import CheckEmailModal from "../Modal/CheckEmailModal";

export default function LoginForm() {
  const [emailInput, setEmailInput] = useState<string>("");
  const { login, user } = useContext(AuthContext);
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();

  const loginHandler = async (e) => {
    e.preventDefault();
    setShowModal(true);
    await login(emailInput).then((_) => setShowModal(false));
    router.back();
  };

  return (
    <>
      <form onSubmit={loginHandler}>
        <input
          type="email"
          required
          onChange={(e) => setEmailInput(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
      {showModal && <CheckEmailModal closeModal={() => setShowModal(false)} />}
    </>
  );
}
