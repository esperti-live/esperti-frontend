import { useState } from "react";
import styles from "../../styles/About.module.scss";
import { Skills } from "../../ts/interfaces";

const newSkill = {
  name: "",
  description: "",
  endorsements: 0,
  experience: 0,
  image_url: "/images/placeholder.png",
  tags: [],
};

interface AddSkillItem {
  skillAdded: (skill: Skills) => void;
}

export default function AddSkillItem({ skillAdded }) {
  const [skillValues, setSkillValues] = useState<Skills>(newSkill);

  const skillUpdateHandler = (e, key: string) => {
    let updatedSkillValues = {
      ...skillValues,
      [key]: e.target.value,
    };

    console.log(updatedSkillValues);

    setSkillValues(updatedSkillValues);
  };

  const addSkillHandler = () => {
    const skill: Skills = {
      description: skillValues.description,
      name: skillValues.name,
    };

    // add skill to list locally
    skillAdded(skill);

    // reset inputs
    setSkillValues(newSkill);

    // send to backend
    console.log("sending to backend", skill);
  };

  return (
    <li className={styles.skillsEdit}>
      <div className={styles.image}>
        <img src="/images/placeholder.png" alt="Add skill image" />
      </div>

      <div className={styles.skillsRight}>
        <input
          type="text"
          value={skillValues.name}
          onChange={(e) => skillUpdateHandler(e, "name")}
          placeholder="Skill name"
          className="editInput"
        />

        <textarea
          value={skillValues.description}
          onChange={(e) => skillUpdateHandler(e, "description")}
          className="editInput"
          placeholder="Enter your description"
        ></textarea>

        <button className={styles.addButton} onClick={addSkillHandler}>
          Add new skill
        </button>
      </div>
    </li>
  );
}
