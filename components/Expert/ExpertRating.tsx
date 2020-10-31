import React from "react";
import styles from "../../styles/Avatar.module.scss";

export default function ExpertRating() {
  return (
    <div className={styles.rating}>
      <span>5.0</span>
      <div className={styles.starsContainer}>
        <img src="/images/star.svg" alt="Rating star" />
        <img src="/images/star.svg" alt="Rating star" />
        <img src="/images/star.svg" alt="Rating star" />
        <img src="/images/star.svg" alt="Rating star" />
        <img src="/images/star.svg" alt="Rating star" />
      </div>
      <small>27 Reviews</small>
    </div>
  );
}
