import { useState } from "react";
import SkillItem from "./SkillItem";
import AddSkillItem from "./AddSkillItem";
import styles from "../../styles/About.module.scss";
import { SkillsProp, Skills } from "../../ts/interfaces";

const SkillsList = ({ skills, editMode }: SkillsProp) => {
  const [skillsList, setSkillsList] = useState(skills);
  const [showAddSkill, setShowAddSkill] = useState(false);

  const addedSkillHandler = (addedSkill: Skills) => {
    console.log([addedSkill, ...skillsList]);
    setSkillsList((prevSkillsList) => [...prevSkillsList, addedSkill]);
    setShowAddSkill(false);
  };

  const removeItemHandler = (item: string) => {
    setSkillsList((prevSkills) =>
      prevSkills.filter((skill) => skill.name !== item)
    );
  };

  return (
    <div className={styles.aboutSection}>
      <h5>Expertise</h5>
      <ul className={styles.expertise}>
        {skillsList.map((skill) => (
          <SkillItem
            key={skill.name}
            skill={skill}
            editMode={editMode}
            removeItem={removeItemHandler}
          />
        ))}

        {editMode && showAddSkill && (
          <AddSkillItem skillAdded={addedSkillHandler} />
        )}
      </ul>
      {editMode && (
        <button type="button" onClick={() => setShowAddSkill(true)}>
          Add Skill
        </button>
      )}
    </div>
  );
};

export default SkillsList;
