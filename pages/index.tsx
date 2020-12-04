import { useState, useContext } from "react";
import Head from "next/head";

import styles from "../styles/pages/Index.module.scss";

import ExpertCard from "../components/ExpertCard";
import CheckEmailModal from "../components/Modal/CheckEmailModal";

import AuthContext from "../contexts/AuthContext";

import Link from "next/link";
import axios from "axios";

import { Expert } from "../ts/interfaces";
import { usePresence } from "../components/Hooks/usePresence";
import { getExpertImage } from "../utils/format";

export default function Home({ profiles }) {
  const [emailInput, setEmailInput] = useState("");
  const { user, login } = useContext(AuthContext);
  const [viewModal, setViewModal] = useState(false);

  const [onlineUsers] = usePresence("global");

  const loginHandler = async (e) => {
    e.preventDefault();
    setViewModal(true);
    login(emailInput).then((_) => setViewModal(false));
  };

  return (
    <>
      <Head>
        <title>Esperti.live</title>
        <meta
          name="description"
          content="Expert Help is one click away. We bring you the top IT experts billed by the minute"
        />
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
                    required
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

                  <button className={styles.getHelp} type="submit">
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
                active={onlineUsers.includes(expert.name)}
                slug={expert.slug}
                key={expert.id}
                image_url={getExpertImage(expert)}
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
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/profiles?_limit=5&type=expert`
  );

  return {
    props: {
      profiles: res.data,
    },
  };
};
