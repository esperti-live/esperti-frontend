import React from "react";
import styles from "../../styles/Expert.module.scss";
import { AboutProps } from "../../ts/interfaces";

export default function About({
  introduction,
  about,
  language,
  timezone,
  socials,
}: AboutProps) {
  return (
    <div className={styles.aboutSection}>
      <h5>About me</h5>
      <p className={styles.bold}>{introduction}</p>
      <p>{about}</p>
      <div className={styles.extra}>
        <div>
          <span>{language}</span>
          <span>{timezone}</span>
        </div>

        <div>
          {socials.map((social) => (
            <span>{social}</span>
          ))}
        </div>
      </div>
    </div>
  );
}
