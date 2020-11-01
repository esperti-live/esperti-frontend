import { useContext, useState } from "react";
import styles from "../../styles/About.module.scss";
import { Skill } from "../../ts/interfaces";
import axios from "axios";
import AuthContext from "../../contexts/AuthContext";

const newSkill = {
  name: "",
  description: "",
  profile: null, // change this
  image_url: "/images/placeholder.png",
  tags: [],
};

export default function AddSkillItem({ skillAdded, userId }) {
  const [skillValues, setSkillValues] = useState<Skill>(newSkill);
  const { user } = useContext(AuthContext);
  const skillUpdateHandler = (e, key: string) => {
    let updatedSkillValues = {
      ...skillValues,
      [key]: e.target.value,
    };

    console.log(updatedSkillValues);

    setSkillValues(updatedSkillValues);
  };

  const addSkillHandler = () => {
    const skill: Skill = {
      description: skillValues.description,
      name: skillValues.name,
      profile: userId, // change this
    };

    // add skill to list locally
    skillAdded(skill);

    // reset inputs
    setSkillValues(newSkill);

    // send to backend
    console.log("sending to backend", skill);
    axios.post("http://localhost:1337/skills", skill, {
      headers: { Authorization: `Bearer ${user.tokenId}` },
    });
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
