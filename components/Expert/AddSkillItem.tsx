import { useState } from "react";
import styles from "../../styles/About.module.scss";
import Autocomplete from "../Autocomplete";
import { Skills } from "../../ts/interfaces";
import { PLACEHOLDER_TAGS } from "../../constants/placeholder";

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

  const addTagHandler = (val: string) => {
    const oldTags = [...skillValues.tags];

    let updatedSkillValues = {
      ...skillValues,
      tags: [...oldTags, val],
    };

    console.log(updatedSkillValues);
    setSkillValues(updatedSkillValues);
  };

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
      tags: skillValues.tags,
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
          className={styles.addName}
        />

        <textarea
          className={styles.description}
          value={skillValues.description}
          onChange={(e) => skillUpdateHandler(e, "description")}
        ></textarea>

        <div className={styles.addTag}>
          {skillValues.tags.length < 3 && (
            <Autocomplete
              items={PLACEHOLDER_TAGS}
              itemClicked={addTagHandler}
            />
          )}
          <ul className={styles.additional}>
            {skillValues.tags.map((tag) => (
              <li key={tag}>{tag}</li>
            ))}
          </ul>
        </div>

        <button className={styles.saveButton} onClick={addSkillHandler}>
          Add
        </button>
      </div>
    </li>
  );
}
