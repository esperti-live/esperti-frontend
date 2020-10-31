import { useState, useContext } from "react";
import Head from "next/head";
import styles from "../styles/Home.module.scss";
import ExpertCard from "../components/ExpertCard";
import { FAKE_EXPERTS } from "../constants/placeholder";
import AuthContext from "../contexts/AuthContext";

export default function Home() {
  const [homeInput, setHomeInput] = useState("");
  const { user } = useContext(AuthContext);

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
            <div className={styles.signUp}>
              <input
                type="email"
                placeholder="Enter your email"
                value={homeInput}
                onChange={(e) => setHomeInput(e.target.value)}
                className={homeInput.length > 0 ? styles.active : ""}
              />
              {homeInput.length > 1 && (
                <button onClick={() => setHomeInput("")}>
                  <img src="/images/clear_input.svg" alt="Clear input" />
                </button>
              )}
            </div>
          )}

          <button className={styles.getHelp}>Get Help Now</button>
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
            {FAKE_EXPERTS.map((expert) => (
              <ExpertCard
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
    </>
  );
}
