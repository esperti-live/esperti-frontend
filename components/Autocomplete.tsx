import { useEffect, useState } from "react";
import styles from "../styles/Autocomplete.module.scss";

export default function Autocomplete({ items, itemClicked }) {
  const [filteredItems, setFilteredItems] = useState<string[]>([]);
  const [input, setInput] = useState("");

  const itemClickHandler = (item: string) => {
    console.log("clicked", item);
    setInput("");
    itemClicked(item);
  };

  useEffect(() => {
    if (!input) {
      return setFilteredItems([]);
    }
    console.log(input);
    const list = items.filter((item: string) =>
      item.toLowerCase().includes(input)
    );
    setFilteredItems(list);
  }, [input]);

  return (
    <div className={styles.autocomplete}>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Tags"
      />
      {filteredItems.length >= 1 && (
        <ul className={styles.tagDropdown}>
          {filteredItems.map((item) => (
            <li onClick={() => itemClickHandler(item)} key={item}>
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
