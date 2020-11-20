import styles from "../../styles/About.module.scss";
import { SkillProp } from "../../ts/interfaces";

export default function SkillItem({ skill, removeItem, editMode }: SkillProp) {
  const removeItemHandler = () => {
    removeItem(skill.name);
  };

  return (
    <li className={styles.skill}>
      <img src="/images/skills_icon.svg" alt={skill.name} />

      <div className={styles.skillContent}>
        <h6>{skill.name}</h6>
        {/* <div className={styles.experience}>
          <span>{skill.experience}</span> years experience
        </div> */}

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
          className={styles.removeItem}
          onClick={removeItemHandler}
        >
          <img src="/images/remove_tag.svg" alt="Remove skill" />
        </button>
      )}
    </li>
  );
}
