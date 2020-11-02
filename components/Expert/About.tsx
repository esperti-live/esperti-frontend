import { useContext, useState } from "react";
import { AboutProps } from "../../ts/interfaces";

import AuthContext from "../../contexts/AuthContext";

import styles from "../../styles/About.module.scss";
import axios from "axios";

export default function About({ bio, editMode, userId }: AboutProps) {
  const [bioInput, setBioInput] = useState(bio);
  const { user } = useContext(AuthContext);

  const saveHandler = () => {
    console.log("upading backend");
    axios.put(`${process.env.NEXT_PUBLIC_STRAPI_URL}/profiles/${userId}`, {
      bio: bioInput,
      headers: { Authorization: `Bearer ${user.tokenId}` },
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
