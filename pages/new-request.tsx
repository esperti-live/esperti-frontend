import { useState, useContext } from "react";
import slugify from "slugify";

import { PLACEHOLDER_TAGS } from "../constants/placeholder";
import { useRouter } from "next/router";

import AuthContext from "../contexts/AuthContext";
import RequestForm from "../components/Request/RequestForm";
import { NewRequest } from "../ts/interfaces";

import styles from "../styles/Request.module.scss";

const newRequest = () => {
  const [step, setStep] = useState<number>(1);
  const [newRequest, setNewRequest] = useState<null | NewRequest>(null);

  const [emailInput, setEmailInput] = useState<string>("");
  const { login, user } = useContext(AuthContext);

  const router = useRouter();

  const submitHandler = (request: NewRequest) => {
    if (!user) {
      setNewRequest(request);
      setStep(2);
    } else {
      postRequest(request, user);
    }
  };

  const postRequest = async (request: NewRequest, user) => {
    const data = {
      title: request.title,
      description: request.description,
      profile: user.email,
      tags: request.tags,
      slug: slugify(request.title),
    };

    console.log("sending request", data);
    router.push("/requests");
  };

  const loginHandler = async (e) => {
    e.preventDefault();
    const user = await login(emailInput);
    postRequest(newRequest, user);
  };

  return (
    <div className={styles.newRequests}>
      {!user && step == 1 && <span>Step 1</span>}
      {!user && step == 2 && <span>Step 2</span>}
      {step == 1 && (
        <RequestForm
          tags={PLACEHOLDER_TAGS}
          formSubmit={(request) => submitHandler(request)}
        />
      )}
      {step == 2 && (
        <form onSubmit={loginHandler}>
          <input
            type="email"
            required
            onChange={(e) => setEmailInput(e.target.value)}
          />
          <button type="submit">Login</button>
        </form>
      )}
    </div>
  );
};

export default newRequest;
