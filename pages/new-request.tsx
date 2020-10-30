import { useState, useContext } from "react";

import Autocomplete from "../components/Autocomplete";

import { PLACEHOLDER_TECHNOLOGIES } from "../constants/placeholder";
import { useRouter } from "next/router";
import { NewRequest } from "../ts/interfaces";

import AuthContext from "../contexts/AuthContext";

import styles from "../styles/Request.module.scss";

const initRequest: NewRequest = {
  description: "",
  tags: [],
  title: "",
};

const newRequest = () => {
  const [dropdownSearch, setDropdownSearch] = useState<string>("");
  const [request, setRequest] = useState<NewRequest>(initRequest);
  const router = useRouter();

  const { user } = useContext(AuthContext);

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!user) {
      return router.push("/login");
    }

    // send request
    await console.log("sending request", request);
    router.push("/requests");
  };

  const addTagHandler = (val: string) => {
    const oldTags = [...request.tags];

    let updatedRequest = {
      ...request,
      tags: [...oldTags, val],
    };

    console.log("added tag", updatedRequest);
    setDropdownSearch("");
    setRequest(updatedRequest);
  };

  const requestChangeHandler = (e, key: string) => {
    let updatedSkillValues = {
      ...request,
      [key]: e.target.value,
    };

    console.log("changing request values", updatedSkillValues);

    setRequest(updatedSkillValues);
  };

  return (
    <div className={styles.newRequests}>
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

        <input
          type="text"
          value={dropdownSearch}
          onChange={(e) => setDropdownSearch(e.target.value)}
          placeholder="Tags"
        />
        <Autocomplete
          items={PLACEHOLDER_TECHNOLOGIES}
          input={dropdownSearch}
          itemClicked={addTagHandler}
        />

        <div className={styles.tags}>
          {request.tags.map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </div>

        <button type="submit">Confirm</button>
      </form>
    </div>
  );
};

export default newRequest;
