import Head from "next/head";
import styles from "../styles/Home.module.scss";
import ExpertCard from "../components/ExpertCard";
import { FAKE_EXPERTS } from "../constants/placeholder";
export default function Home() {
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

          <input type="email" placeholder="Enter your email" />

          <button>Get Help Now</button>
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
