import { useEffect, useState } from "react";
import { usePresence } from "../Hooks/usePresence";

import styles from "../../styles/components/OtherUserHeader.module.scss";

const OtherUserHeader = ({ image, name, rate, channel }) => {
  const [isOnline, setIsOnline] = useState(false);
  const [onlineUsers] = usePresence(channel);

  useEffect(() => {
    setIsOnline(onlineUsers.includes(name));
  }, [JSON.stringify(onlineUsers)]);

  return (
    <div className={styles.avatarHead}>
      {/* add this */}
      {/* <button className={styles.goBack}>
        <img src="/images/arrow_left.svg" />
      </button> */}
      <div className={styles.imageContainer}>
        <img src={image || "/images/profile-user.svg"} alt={name} />
        <div
          className={`${styles.onlineStatus} ${isOnline ? styles.active : ""} `}
        ></div>
      </div>
      <div className={styles.avatarRight}>
        <h3>{name}</h3>
        {rate && <span>{rate} EUR For 15 min call</span>}
      </div>
    </div>
  );
};

export default OtherUserHeader;
