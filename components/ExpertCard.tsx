import Link from "next/link";
import { usePubNub } from "pubnub-react";

import styles from "../styles/components/ExpertCard.module.scss";

export default function Card({ image_url, name, title, skills, slug, active }) {
  const pubnub = usePubNub();

  return (
    <article className={styles.expertCard}>
      <div className={styles.expertAvatar}>
        <img src={image_url} alt={name} />
        <div className={styles.onlineBadge}>
          <div style={{ backgroundColor: active ? "#1ddc76" : "gray" }}></div>
        </div>
      </div>
      <h5 className={styles.name}>{name}</h5>
      <span className={styles.title}>{title}</span>
      {/* <div className={styles.tags}>
        {skills.slice(0, 3).map((skill) => (
          <span key={skill} className={styles.tags}>
            {skill}
          </span>
        ))}
      </div> */}
      {/* <button type="button" className={styles.viewProfile}>
        View Profile
      </button> */}

      <Link href={`/expert/${slug}`}>
        <a className={styles.viewProfile}>View Profile</a>
      </Link>
    </article>
  );
}
