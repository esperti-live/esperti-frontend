import SkillItem from "./SkillItem";
import styles from "../../styles/Expert.module.scss";
import { SkillsProp } from "../../ts/interfaces";

const SkillsList = ({ skills }: SkillsProp) => {
  return (
    <div className={styles.aboutSection}>
      <h5>Expertise</h5>
      <ul className={styles.expertise}>
        {skills.map((skill) => (
          <SkillItem skill={skill} />
        ))}
      </ul>
    </div>
  );
};

export default SkillsList;
