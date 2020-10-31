import { useState } from "react";
import styles from "../../styles/Request.module.scss";
import { NewRequest } from "../../ts/interfaces";
import Autocomplete from "../Autocomplete";

interface RequestFormProps {
  formSubmit: (request: NewRequest) => void;
  tags: string[];
}

const initRequest: NewRequest = {
  description: "",
  tags: [],
  title: "",
};

export default function RequestForm({ formSubmit, tags }: RequestFormProps) {
  const [request, setRequest] = useState<NewRequest>(initRequest);

  const addTagHandler = (val: string) => {
    if (!request.tags.includes(val)) {
      const oldTags = [...request.tags];
      let updatedRequest = {
        ...request,
        tags: [...oldTags, val],
      };

      console.log("added tag", updatedRequest);
      setRequest(updatedRequest);
    }
  };

  const requestChangeHandler = (e, key: string) => {
    let updatedSkillValues = {
      ...request,
      [key]: e.target.value,
    };

    console.log("changing request values", updatedSkillValues);

    setRequest(updatedSkillValues);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    formSubmit(request);
  };

  return (
    <form onSubmit={submitHandler}>
      <input
        type="text"
        placeholder="Title"
        value={request.title}
        onChange={(e) => requestChangeHandler(e, "title")}
      />

      <textarea
        placeholder="Description"
        value={request.description}
        onChange={(e) => requestChangeHandler(e, "description")}
      ></textarea>

      <Autocomplete items={tags} itemClicked={addTagHandler} />

      <div className={styles.tags}>
        {request.tags.map((tag) => (
          <span key={tag}>{tag}</span>
        ))}
      </div>

      <button type="submit">Confirm</button>
    </form>
  );
}
