import React, { FormEvent, useState } from "react";

import styles from "../../styles/components/RateExpert.module.scss";
import StarRating from "../StarRating";

const RateExpert = ({ submitHandler }) => {
  const [textarea, setTextarea] = useState("");
  const [rating, setRating] = useState(0);

  const formSubmitHandler = (e: FormEvent) => {
    e.preventDefault();
    submitHandler(textarea, rating);
  };

  return (
    <>
      {/* <div className={styles.starRating}> */}
      <StarRating
        rating={rating}
        updateHandler={(rating: number) => setRating(rating)}
      />
      {/* </div> */}
      <form onSubmit={formSubmitHandler} className={styles.rateExpert}>
        <textarea
          rows={3}
          onChange={(e) => setTextarea(e.target.value)}
          value={textarea}
          placeholder="Tell us more about your experience"
        ></textarea>
        <button
          disabled={!textarea.length || rating < 1}
          type="submit"
          className={styles.reviewButton}
        >
          Confirm & Pay
        </button>
      </form>
    </>
  );
};

export default RateExpert;
