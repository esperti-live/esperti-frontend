import { useEffect, useState } from "react";
import styles from "../styles/Autocomplete.module.scss";

export default function Autocomplete({ items, input, itemClicked }) {
  const [filteredItems, setfilteredItems] = useState<string[]>([]);

  useEffect(() => {
    if (!input) {
      return setfilteredItems([]);
    }

    const list = items.filter((item) => item.toLowerCase().includes(input));
    setfilteredItems(list);

    console.log("here");
  }, [input]);

  return (
    <ul className={styles.technologyDropdown}>
      {filteredItems.map((item) => (
        <li onClick={() => itemClicked(item)}>{item}</li>
      ))}
    </ul>
  );
}
