import { useState } from "react";
import styles from "../../styles/Expert.module.scss";
import Autocomplete from "../Autocomplete";
import { Skills } from "../../ts/interfaces";

const PLACEHOLDER_TECHNOLOGIES = [
  "React",
  "Redux",
  "GraphQL",
  "Laravel",
  "Html",
  "Css",
  "Javascript",
  "Vue",
  "Node",
  "Express",
  "Strapi",
];

interface AddSkillItem {
  skillAdded: (skill: Skills) => void;
}

export default function AddSkillItem({ skillAdded }) {
  const [technologies, setTechnologies] = useState<string[]>([]);
  const [input, setInput] = useState<string>("");

  const [description, setDescription] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [yearsExperience, setYearsExperience] = useState<number | null>(null);
  const [endorsements, setEndorsements] = useState<number | null>(null);

  const addHandler = (val: string) => {
    setInput("");
    setTechnologies((technologies) => [...technologies, val]);
  };

  const saveHandler = () => {
    const skill: Skills = {
      description,
      endorsements,
      experience: yearsExperience,
      image_url: "/images/placeholder.png",
      name,
      technologies,
    };

    // updates skill list locally
    skillAdded(skill);

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
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={styles.addName}
        />

        <div className={styles.experience}>
          <span>
            <input
              type="number"
              value={yearsExperience}
              min={1}
              max={99}
              onChange={(e) => setYearsExperience(Number(e.target.value))}
            />
          </span>{" "}
          years experience |{" "}
          <span>
            <input
              type="number"
              value={endorsements}
              min={1}
              max={99}
              onChange={(e) => setEndorsements(Number(e.target.value))}
            />
          </span>{" "}
          endorsements
        </div>

        <textarea
          className={styles.description}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>

        <div className={styles.addTechnology}>
          {technologies.length < 3 && (
            <div>
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
              <Autocomplete
                items={PLACEHOLDER_TECHNOLOGIES}
                input={input}
                itemClicked={addHandler}
              />
            </div>
          )}
          <ul className={styles.additional}>
            {technologies.map((technology) => (
              <li key={technology}>{technology}</li>
            ))}
          </ul>
        </div>

        <button className={styles.saveButton} onClick={saveHandler}>
          Add
        </button>
      </div>
    </li>
  );
}
