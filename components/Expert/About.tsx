import { useState } from "react";
import styles from "../../styles/About.module.scss";
import { AboutProps } from "../../ts/interfaces";

export default function About({
  introduction,
  about,
  language,
  timezone,
  socials,
  editMode,
}: AboutProps) {
  const [introductionInput, setIntroductionInput] = useState(introduction);
  const [aboutInput, setAboutInput] = useState(about);

  const saveHandler = () => {
    console.log("sending to backend", {
      introduction: introductionInput,
      about: aboutInput,
    });
  };

  if (editMode) {
    return (
      <div className={styles.aboutSection}>
        <h5>About me</h5>

        <textarea
          className={styles.editIntroduction}
          onChange={(e) => setIntroductionInput(e.target.value)}
          value={introductionInput}
        ></textarea>

        <textarea
          className={styles.editIntroduction}
          onChange={(e) => setAboutInput(e.target.value)}
          value={aboutInput}
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
        <p className={styles.bold}>{introductionInput}</p>
        <p>{aboutInput}</p>
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
