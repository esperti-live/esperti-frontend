import { useState, useEffect } from "react";
import styles from "../../styles/Expert.module.scss";
import { AvatarProps } from "../../ts/interfaces";

const Avatar = ({ image_url, tag, name, editMode }: AvatarProps) => {
  const [image, setImage] = useState<string | File>("");
  const [userName, setUserName] = useState<string>("");

  const onFileHandler = (e) => {
    console.log("file", e.target.files[0]);
    setImage(e.target.files[0]);
  };

  const updateHandler = () => {
    // send to backend
    console.log({ image, name: userName });
  };

  useEffect(() => {
    setImage(image_url);
    setUserName(name);
  }, [image_url]);

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
          className={styles.changeName}
        />
        <span>{tag}</span>

        <button className={styles.saveButton} onClick={updateHandler}>
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
        <span>{tag}</span>
      </div>
    );
  }
};

export default Avatar;
