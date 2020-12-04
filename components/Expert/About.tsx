import { useState } from "react";
import { AboutProps } from "../../ts/interfaces";
import { getToken } from "../../utils/magic";

import axios from "axios";

import styles from "../../styles/components/About.module.scss";

export default function About({ bio, editMode, userId }: AboutProps) {
  const [bioInput, setBioInput] = useState(bio);

  const saveHandler = async () => {
    const tokenId = await getToken();
    axios.put(`${process.env.NEXT_PUBLIC_STRAPI_URL}/profiles/${userId}`, {
      bio: bioInput,
      headers: { Authorization: `Bearer ${tokenId}` },
    });
  };

  if (editMode) {
    return (
      <div className={styles.aboutSection}>
        <textarea
          className="editInput"
          rows={10}
          onChange={(e) => setBioInput(e.target.value)}
          value={bioInput}
        ></textarea>
        <button onClick={saveHandler} className="saveButton">
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
