import styles from "../../styles/Chat.module.scss";

const OtherUserHeader = ({ image, name, rate }) => {
  return (
    <div className={styles.avatarHead}>
      <button className={styles.goBack}>
        <img src="/images/arrow_left.svg" />
      </button>
      <img src={image || "/images/profile-user.svg"} alt={name} />
      <div className={styles.avatarRight}>
        <h3>{name}</h3>
        {rate && <span>{rate} EUR For 15 min call</span>}
      </div>
    </div>
  );
};

export default OtherUserHeader;
