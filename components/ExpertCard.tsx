import styles from "../styles/Expert.module.scss";

export default function Card({ image_url, name, title, skills }) {
  return (
    <article className={styles.expertCard}>
      <img src={image_url} alt={name} />
      <h5 className={styles.name}>{name}</h5>
      <span className={styles.title}>{title}</span>
      <div className={styles.tags}>
        {skills.slice(0, 3).map((skill) => (
          <span key={skill} className={styles.tags}>
            {skill}
          </span>
        ))}
      </div>
      <button type="button" className={styles.button}>
        Chat Now
      </button>
    </article>
  );
}
