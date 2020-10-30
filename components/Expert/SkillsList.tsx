import { useState } from "react";
import SkillItem from "./SkillItem";
import AddSkillItem from "./AddSkillItem";
import styles from "../../styles/Expert.module.scss";
import { SkillsProp, Skills } from "../../ts/interfaces";

const SkillsList = ({ skills, editMode }: SkillsProp) => {
  const [skillsList, setSkillsList] = useState(skills);

  const addedSkillHandler = (addedSkill: Skills) => {
    console.log([addedSkill, ...skillsList]);
    setSkillsList((prevSkillsList) => [...prevSkillsList, addedSkill]);
  };

  return (
    <div className={styles.aboutSection}>
      <h5>Expertise</h5>
      <ul className={styles.expertise}>
        {skillsList.map((skill) => (
          <SkillItem key={skill.name} skill={skill} />
        ))}
        {editMode && <AddSkillItem skillAdded={addedSkillHandler} />}
      </ul>
    </div>
  );
};

export default SkillsList;
