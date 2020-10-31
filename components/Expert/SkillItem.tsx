import styles from "../../styles/About.module.scss";
import { SkillProp } from "../../ts/interfaces";

export default function SkillItem({ skill, removeItem, editMode }: SkillProp) {
  const removeItemHandler = () => {
    console.log("Removing Item", skill.name);
    removeItem(skill.name);
  };

  return (
    <li className={styles.skill}>
      <img src={skill.image_url} alt="react" />

      <div>
        <h6>{skill.name}</h6>
        <div className={styles.experience}>
          <span>{skill.experience}</span> years experience
        </div>

        <p className={styles.description}>{skill.description}</p>

        {/* <ul className={styles.additional}>
          {skill.tags.map((tag) => (
            <li key={tag}>{tag}</li>
          ))}
        </ul> */}
      </div>

      {editMode && (
        <button
          type="button"
          className={styles.editButton}
          onClick={removeItemHandler}
        >
          X
        </button>
      )}
    </li>
  );
}
