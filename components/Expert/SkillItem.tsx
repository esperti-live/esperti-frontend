import styles from "../../styles/Expert.module.scss";
import { SkillProp } from "../../ts/interfaces";

export default function SkillItem({ skill }: SkillProp) {
  return (
    <li className={styles.skill}>
      <div className={styles.image}>
        <img src={skill.image_url} alt="react" />
      </div>

      <div>
        <h6>React</h6>
        <div className={styles.experience}>
          <span>{skill.experience}</span> years experience |{" "}
          <span>{skill.endorsements}</span> endorsements
        </div>

        <p className={styles.description}>{skill.description}</p>

        <ul className={styles.additional}>
          {skill.technologies.map((technology) => (
            <li key={technology}>{technology}</li>
          ))}
        </ul>
      </div>
    </li>
  );
}
