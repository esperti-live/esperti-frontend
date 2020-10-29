import React from "react";
import styles from "../../styles/Expert.module.scss";
import { AvatarProps } from "../../ts/interfaces";

const Avatar = ({ image_url, tag, name }: AvatarProps) => {
  return (
    <div className={styles.head}>
      <img src={image_url} alt="Nik Vogrinec" className={styles.avatar} />
      <h4>{name}</h4>
      <span>{tag}</span>
    </div>
  );
};

export default Avatar;
