import { useState } from "react";
import styles from "../../styles/Request.module.scss";
import { NewRequest, Tag } from "../../ts/interfaces";
import Autocomplete from "../Autocomplete";

interface RequestFormProps {
  formSubmit: (request: NewRequest) => void;
}

const initRequest: NewRequest = {
  description: "",
  title: "",
  tags: [],
};

export default function RequestForm({ formSubmit }: RequestFormProps) {
  const [request, setRequest] = useState<NewRequest>(initRequest);

  const addTagHandler = (tag: Tag) => {
    if (!request.tags.includes(tag)) {
      const oldTags = [...request.tags];
      let updatedRequest = {
        ...request,
        tags: [...oldTags, tag],
      };

      console.log("added tag", updatedRequest);
      setRequest(updatedRequest);
    }
  };

  const removeTagHandler = (tag: Tag) => {
    setRequest({
      ...request,
      tags: request.tags.filter((oldTag) => oldTag.id !== tag.id),
    });
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
      <label htmlFor="title">Add a title</label>
      <input
        name="title"
        type="text"
        placeholder="How we can help you?"
        value={request.title}
        onChange={(e) => requestChangeHandler(e, "title")}
      />

      <label htmlFor="description">Describe your request</label>
      <textarea
        name="description"
        placeholder="Give us more information"
        value={request.description}
        rows={5}
        onChange={(e) => requestChangeHandler(e, "description")}
      ></textarea>

      <label>Select tags</label>
      <Autocomplete itemClicked={addTagHandler} />

      <div className={styles.tags}>
        {request.tags.map((tag) => (
          <span key={tag.id}>
            {tag.name}{" "}
            <button type="button" onClick={() => removeTagHandler(tag)}>
              <img src="/images/remove_tag.svg" alt="Remove tag" />
            </button>
          </span>
        ))}
      </div>

      <button
        type="submit"
        className={styles.submit}
        disabled={
          !request.description || !request.title || !request.tags.length
        }
      >
        Confirm
      </button>
    </form>
  );
}
