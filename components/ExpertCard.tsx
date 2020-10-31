import styles from "../styles/Expert.module.scss";

export default function Card({ image_url, name, title, skills }) {
  return (
    <article className={styles.expertCard}>
      <img src={image_url} alt={name} />
      <h5 className={styles.expertName}>{name}</h5>
      <span className="title">{title}</span>
      <div className={styles.tags}>
        {skills.slice(0, 3).map((skill) => (
          <span key={skill}>{skill}</span>
        ))}
      </div>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis labore
        quam deserunt, voluptatum illo quaerat! Provident minima delectus
        perferendis rem.
      </p>
    </article>
  );
}
