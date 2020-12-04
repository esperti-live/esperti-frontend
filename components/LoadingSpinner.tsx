import React from "react";
import styles from "../styles/components/LoadingSpinner.module.scss";

export default function LoadingSpinner() {
  return (
    <div className={styles.spinner}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
}
