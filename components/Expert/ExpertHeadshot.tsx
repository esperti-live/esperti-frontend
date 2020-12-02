import styles from "../../styles/Review.module.scss";

const ExpertHeadshot = ({ image, name, title }) => {
  return (
    <div className={styles.expertHeadshot}>
      <img src={image ? image : "/images/profile-user.svg"} alt={name} />
      <h4>{name}</h4>
      <span>{title}</span>
    </div>
  );
};

export default ExpertHeadshot;
