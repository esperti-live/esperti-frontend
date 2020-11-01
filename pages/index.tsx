import { useState, useContext, useEffect } from "react";
import Head from "next/head";
import styles from "../styles/Home.module.scss";
import ExpertCard from "../components/ExpertCard";
// import { FAKE_EXPERTS } from "../constants/placeholder";
import AuthContext from "../contexts/AuthContext";
import CheckEmailModal from "../components/Modal/CheckEmailModal";
import Link from "next/link";
import axios from "axios";
import { Expert } from "../ts/interfaces";

export default function Home({ profiles }) {
  const [emailInput, setEmailInput] = useState("");
  const { user, login } = useContext(AuthContext);
  const [viewModal, setViewModal] = useState(false);

  useEffect(() => {
    (async () => {
      const profiles = await axios.get("https://strapi.esperti.live/profiles");
      console.log(profiles);
    })();
  }, []);

  const loginHandler = async (e) => {
    e.preventDefault();
    setViewModal(true);
    login(emailInput).then((_) => setViewModal(false));
  };

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <section className={styles.jumbotron}>
          <h1>
            Expert Help. <br /> One click away
          </h1>
          <p>We bring you the top IT experts billed by the minute</p>

          {!user && (
            <>
              <div className={styles.signUp}>
                <form onSubmit={loginHandler}>
                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                    className={emailInput.length > 0 ? styles.active : ""}
                  />
                  {emailInput.length > 1 && (
                    <button
                      type="button"
                      className={styles.clearInput}
                      onClick={() => setEmailInput("")}
                    >
                      <img src="/images/clear_input.svg" alt="Clear input" />
                    </button>
                  )}

                  <button
                    className={styles.getHelp}
                    type="submit"
                    onClick={loginHandler}
                  >
                    Get Help Now
                  </button>
                </form>
              </div>
            </>
          )}

          {user && (
            <Link href="/new-request">
              <a className={styles.getHelp}>Get Help Now</a>
            </Link>
          )}
        </section>

        <section className={styles.steps}>
          <span>Just 3 simple steps to start</span>

          <div className={styles.step}>
            <span>Submit Your Request</span>
            <div className={styles.step_arrow}>
              <img src="/images/arrow_down.svg" alt="Submit your request" />
            </div>
          </div>
          <div className={styles.step}>
            <span>Select an Expert</span>
            <div className={styles.step_arrow}>
              <img src="/images/arrow_down.svg" alt="Select an Expert" />
            </div>
          </div>
          <div className={styles.step}>
            <span>Get Professional Help</span>
          </div>
        </section>

        <section className={styles.experts}>
          <h2>Get help from our experts</h2>
          <div className={styles.expertContainer}>
            {profiles.map((expert: Expert) => (
              <ExpertCard
                slug={expert.slug}
                key={expert.id}
                image_url={expert.image_url}
                name={expert.name}
                skills={expert.skills}
                title={expert.title}
              />
            ))}
          </div>
        </section>
      </main>

      {viewModal && <CheckEmailModal closeModal={() => setViewModal(false)} />}
    </>
  );
}

export const getStaticProps = async () => {
  const res = await axios.get("http://localhost:1337/profiles?_limit=5");

  return {
    props: {
      profiles: res.data,
    },
  };
};
