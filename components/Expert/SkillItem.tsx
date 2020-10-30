import styles from "../../styles/About.module.scss";
import { SkillProp } from "../../ts/interfaces";

export default function SkillItem({ skill }: SkillProp) {
  return (
    <li className={styles.skill}>
      <div className={styles.image}>
        <img src={skill.image_url} alt="react" />
      </div>

      <div>
        <h6>{skill.name}</h6>
        <div className={styles.experience}>
          <span>{skill.experience}</span> years experience |{" "}
          <span>{skill.endorsements}</span> endorsements
        </div>

        <p className={styles.description}>{skill.description}</p>

        <ul className={styles.additional}>
          {skill.tags.map((tag) => (
            <li key={tag}>{tag}</li>
          ))}
        </ul>
      </div>
    </li>
  );
}
