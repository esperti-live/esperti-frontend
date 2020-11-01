import { useState, useContext } from "react";
import slugify from "slugify";

import { PLACEHOLDER_TAGS } from "../constants/placeholder";

import AuthContext from "../contexts/AuthContext";
import RequestForm from "../components/Request/RequestForm";
import { NewRequest } from "../ts/interfaces";

import styles from "../styles/Request.module.scss";
import CheckEmailModal from "../components/Modal/CheckEmailModal";
import RequestSuccessModal from "../components/Modal/RequestSuccessModal";

const newRequest = () => {
  const [step, setStep] = useState<number>(1);
  const [newRequest, setNewRequest] = useState<null | NewRequest>(null);
  const [showAuthModal, setShowAuthModal] = useState<boolean>(false);
  const [showRequestSuccess, setShowRequestSuccess] = useState<boolean>(false);
  const [emailInput, setEmailInput] = useState<string>("");

  const { login, user } = useContext(AuthContext);

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
      slug: slugify(request.title, { lower: true, strict: true }),
    };

    await console.log("sending request", data);
    setShowRequestSuccess(true);
  };

  const loginHandler = async (e) => {
    e.preventDefault();
    setShowAuthModal(true);
    const user = await login(emailInput);
    setShowAuthModal(false);
    postRequest(newRequest, user);
  };

  return (
    <div className={styles.newRequests}>
      <div className={styles.jumbotron}>
        <h1>Submit your request</h1>
        <h2>3 simple steps and we'll help you out</h2>
      </div>
      {/* {!user && step == 1 && <span>Step 1</span>}
      {!user && step == 2 && <span>Step 2</span>} */}
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
      {showAuthModal && (
        <CheckEmailModal closeModal={() => setShowAuthModal(false)} />
      )}
      {showRequestSuccess && (
        <RequestSuccessModal closeModal={() => setShowRequestSuccess(false)} />
      )}
    </div>
  );
};

export default newRequest;
