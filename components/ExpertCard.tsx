import styles from "../styles/Expert.module.scss";

export default function Card({ image_url, name, title, skills }) {
  return (
    <div className={styles.expertCard}>
      <img src={image_url} alt={name} />
      <h5 className={styles.expertName}>{name}</h5>
      <span className="title">{title}</span>
      <div className={styles.tags}>
        {skills.map((skill) => (
          <span key={skill}>{skill}</span>
        ))}
      </div>
    </div>
  );
}
