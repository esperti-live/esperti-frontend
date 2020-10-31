import { useState } from "react";
import styles from "../../styles/About.module.scss";
import { AboutProps } from "../../ts/interfaces";

export default function About({
  bio,
  language,
  timezone,
  socials,
  editMode,
}: AboutProps) {
  const [bioInput, setBioInput] = useState(bio);

  const saveHandler = () => {
    console.log("sending to backend", {
      bio,
    });
  };

  if (editMode) {
    return (
      <div className={styles.aboutSection}>
        <h5>About me</h5>

        <textarea
          className={styles.editIntroduction}
          onChange={(e) => setBioInput(e.target.value)}
          value={bioInput}
        ></textarea>

        <div className={styles.extra}>
          <div>
            <span>{language}</span>
            <span>{timezone}</span>
          </div>

          <div>
            {socials.map((social) => (
              <span key={social}>{social}</span>
            ))}
          </div>
        </div>

        <button onClick={saveHandler} className={styles.saveButton}>
          Save
        </button>
      </div>
    );
  } else {
    return (
      <div className={styles.aboutSection}>
        <h5>About me</h5>
        <p>{bio}</p>
        <div className={styles.extra}>
          <div>
            <span>{language}</span>
            <span>{timezone}</span>
          </div>

          <div>
            {socials.map((social) => (
              <span key={social}>{social}</span>
            ))}
          </div>
        </div>
      </div>
    );
  }
}
