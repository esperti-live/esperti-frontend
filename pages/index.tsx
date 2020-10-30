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
        <section className={styles.expertsGrid}>
          {FAKE_EXPERTS.map((expert) => (
            <ExpertCard
              key={expert.id}
              image_url={expert.image_url}
              name={expert.name}
              skills={expert.skills}
              title={expert.title}
            />
          ))}
        </section>
      </main>
    </>
  );
}
