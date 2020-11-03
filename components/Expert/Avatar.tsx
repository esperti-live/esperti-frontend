import { useState } from "react";
import styles from "../../styles/Avatar.module.scss";
import { AvatarProps } from "../../ts/interfaces";
import ExpertRating from "./ExpertRating";
import { getImageUrl } from "../../utils/format";

const Avatar = ({ image, title, name, editMode }: AvatarProps) => {
  const [localImage, setLocalImage] = useState<string | File>(image);
  const [userName, setUserName] = useState<string>(name);

  const onFileHandler = (e) => {
    console.log("file", e.target.files[0]);
    setLocalImage(e.target.files[0]);
  };

  const updateHandler = () => {
    // send to backend
    console.log({ localImage, name: userName });
  };

  if (editMode) {
    return (
      <div className={styles.head}>
        <input
          type="file"
          className="editInput"
          onChange={(e) => onFileHandler(e)}
        />
        <img
          src={getImageUrl(localImage)}
          alt={userName}
          className={styles.avatar}
        />
        <input
          type="text"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          className={`editInput ${userName.length < 1 ? "invalid" : ""}`}
        />
        <span className="title">{title}</span>

        {/* <ExpertRating /> */}
        <button className={`saveButton`} onClick={updateHandler}>
          Save
        </button>

        <div className={styles.pillHeader}>
          <div>
            <span>10 EUR</span>
            <small>For 10 min call</small>
          </div>
          <div>
            <span>94</span>
            <small>Sessions / Jobs</small>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className={styles.head}>
        <img
          src={getImageUrl(localImage)}
          alt={userName}
          className={styles.avatar}
        />
        <h4>{userName}</h4>
        <span className={styles.title}>{title}</span>
        <ExpertRating />

        <div className={styles.pillHeader}>
          <div>
            <span>10 EUR</span>
            <small>For 10 min call</small>
          </div>
          <div>
            <span>94</span>
            <small>Sessions / Jobs</small>
          </div>
        </div>
      </div>
    );
  }
};

export default Avatar;
