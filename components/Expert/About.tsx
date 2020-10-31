import { useState } from "react";
import styles from "../../styles/About.module.scss";
import { AboutProps } from "../../ts/interfaces";

export default function About({ bio, editMode }: AboutProps) {
  const [bioInput, setBioInput] = useState(bio);

  const saveHandler = () => {
    console.log("sending to backend", {
      bioInput,
    });
  };

  if (editMode) {
    return (
      <div className={styles.aboutSection}>
        <textarea
          className={styles.editIntroduction}
          onChange={(e) => setBioInput(e.target.value)}
          value={bioInput}
        ></textarea>
        <button onClick={saveHandler} className={styles.saveButton}>
          Save
        </button>
      </div>
    );
  } else {
    return (
      <div className={styles.aboutSection}>
        <p>{bio}</p>
      </div>
    );
  }
}
