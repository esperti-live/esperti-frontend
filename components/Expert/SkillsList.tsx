import { useState } from "react";
import SkillItem from "./SkillItem";
import AddSkillItem from "./AddSkillItem";
import styles from "../../styles/About.module.scss";
import { SkillsProp, Skill } from "../../ts/interfaces";

const SkillsList = ({ skills, editMode, userId }: SkillsProp) => {
  const [skillsList, setSkillsList] = useState(skills);
  const [showAddSkill, setShowAddSkill] = useState(false);

  const addedSkillHandler = (addedSkill: Skill) => {
    console.log([...skillsList, addedSkill]);
    setSkillsList((prevSkillsList) => [addedSkill, ...prevSkillsList]);
    setShowAddSkill(false);
  };

  const removeItemHandler = (item: string) => {
    setSkillsList((prevSkills) =>
      prevSkills.filter((skill) => skill.name !== item)
    );
  };

  return (
    <ul className={styles.expertise}>
      {editMode && (
        <button
          type="button"
          className={styles.addItem}
          onClick={() => setShowAddSkill(true)}
        >
          Add Skill
        </button>
      )}
      {editMode && showAddSkill && (
        <AddSkillItem skillAdded={addedSkillHandler} userId={userId} />
      )}
      {skillsList.map((skill) => (
        <SkillItem
          key={skill.name}
          skill={skill}
          editMode={editMode}
          removeItem={removeItemHandler}
        />
      ))}
    </ul>
  );
};

export default SkillsList;
