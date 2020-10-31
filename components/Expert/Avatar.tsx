import { useState } from "react";
import styles from "../../styles/Avatar.module.scss";
import { AvatarProps } from "../../ts/interfaces";
import ExpertRating from "./ExpertRating";

const Avatar = ({ image_url, title, name, editMode }: AvatarProps) => {
  const [image, setImage] = useState<string | File>(image_url);
  const [userName, setUserName] = useState<string>(name);

  const onFileHandler = (e) => {
    console.log("file", e.target.files[0]);
    setImage(e.target.files[0]);
  };

  const updateHandler = () => {
    // send to backend
    console.log({ image, name: userName });
  };

  if (editMode) {
    return (
      <div className={styles.head}>
        <input
          type="file"
          className={styles.uploadAvatar}
          onChange={(e) => onFileHandler(e)}
        />
        <img
          src={typeof image == "string" ? image : URL.createObjectURL(image)}
          alt="Nik Vogrinec"
          className={styles.avatar}
        />
        <input
          type="text"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          className={`${styles.changeName} ${
            userName.length < 1 ? "invalid" : ""
          }`}
        />
        <span className="title">{title}</span>

        <button className={`saveButton`} onClick={updateHandler}>
          Save
        </button>
      </div>
    );
  } else {
    return (
      <div className={styles.head}>
        <img
          src={typeof image == "string" ? image : URL.createObjectURL(image)}
          alt="Nik Vogrinec"
          className={styles.avatar}
        />
        <h4>{userName}</h4>
        <span className={styles.title}>{title}</span>
        <ExpertRating />
      </div>
    );
  }
};

export default Avatar;
