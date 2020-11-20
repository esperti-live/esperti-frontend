import axios from "axios";
import { useEffect, useState } from "react";
import styles from "../styles/Autocomplete.module.scss";
import { Tag } from "../ts/interfaces";

export default function Autocomplete({ itemClicked }) {
  const [filteredItems, setFilteredItems] = useState<Tag[]>([]);
  const [tagsList, setTagsList] = useState<Tag[]>([]);
  const [input, setInput] = useState<string>("");

  const itemClickHandler = (item: Tag) => {
    setInput("");
    itemClicked(item);
  };

  useEffect(() => {
    if (!input) {
      return setFilteredItems([]);
    }
    const list = tagsList.filter((item: Tag) =>
      item.name.toLowerCase().includes(input)
    );
    setFilteredItems(list);
  }, [input]);

  useEffect(() => {
    (async () => {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_STRAPI_URL}/tags`);
      setTagsList(res.data);
    })();
  }, []);

  return (
    <div className={styles.autocomplete}>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Add tags"
        className={styles.autocompleteInput}
      />
      {filteredItems.length >= 1 && (
        <ul className={styles.tagDropdown}>
          {filteredItems.map((item) => (
            <li
              onClick={() => itemClickHandler(item)}
              key={item.id}
              tabIndex={0}
            >
              {item.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
