import { useState, useContext, useEffect } from "react";
import slugify from "slugify";

import AuthContext from "../contexts/AuthContext";
import RequestForm from "../components/Request/RequestForm";
import { NewRequest } from "../ts/interfaces";

import styles from "../styles/Request.module.scss";
import CheckEmailModal from "../components/Modal/CheckEmailModal";
import RequestSuccessModal from "../components/Modal/RequestSuccessModal";
import axios from "axios";
import { useRouter } from "next/router";
import { getToken } from "../utils/magic";

const newRequest = () => {
  const [step, setStep] = useState<number>(1);
  const [newRequest, setNewRequest] = useState<null | NewRequest>(null);
  const [showAuthModal, setShowAuthModal] = useState<boolean>(false);
  const [showRequestSuccess, setShowRequestSuccess] = useState<boolean>(false);
  const [emailInput, setEmailInput] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const { login, user } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.replace("/");
    }
  }, []);

  const submitHandler = (request: NewRequest) => {
    if (!user) {
      setNewRequest(request);
      setStep(2);
    } else {
      postRequest(request, user);
    }
  };

  const postRequest = async (request: NewRequest, user) => {
    setLoading(true);
    const data = {
      title: request.title,
      description: request.description,
      profile: user.email,
      tags: request.tags,
      slug: slugify(request.title, { lower: true, strict: true }),
    };

    console.log("sending request", data);

    try {
      console.log(user);
      const token = await getToken();
      await axios.post(`${process.env.NEXT_PUBLIC_STRAPI_URL}/requests`, data, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setShowRequestSuccess(true);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  // old logic - redundant (REMOVE IN FUTURE)
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
          formSubmit={(request) => submitHandler(request)}
          loading={loading}
        />
      )}
      {step == 2 && (
        <form onSubmit={loginHandler}>
          <h5>
            Before we continue, please log in or register by entering your email
            address below!
          </h5>
          <input
            type="email"
            required
            onChange={(e) => setEmailInput(e.target.value)}
            placeholder="Email address"
          />
          <button type="submit" className={styles.submit}>
            Log In / Register
          </button>
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
