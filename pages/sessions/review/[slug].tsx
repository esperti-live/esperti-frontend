import { useContext, useState, useEffect } from "react";
import StarRating from "../../../components/StarRating";

import axios from "axios";
import AuthContext from "../../../contexts/AuthContext";

import styles from "../../../styles/Review.module.scss";
import SessionContext from "../../../contexts/SessionContext";

const ReviewAndPay = () => {
  const [textarea, setTextarea] = useState("");
  const [rating, setRating] = useState(1);
  const { user } = useContext(AuthContext);
  const { session } = useContext(SessionContext);

  const formSubmitHandler = (e) => {
    e.preventDefault();
    const data = {
      rating,
      comment: textarea,
      session_id: session.id,
    };

    axios.post(`${process.env.NEXT_PUBLIC_STRAPI_URL}/reviews`, data, {
      headers: { Authorization: `Bearer ${user.tokenId}` },
    });
  };

  useEffect(() => {
    console.log(session);
  }, []);

  if (!user.tokenId) {
    return <p>Loading...</p>;
  }

  return (
    <section className={styles.review}>
      <h1>Review and Pay</h1>
      <div className={styles.info}>
        <p>{session.expertName}</p>
        <p>{session.totalTime} minutes</p>
        <p>
          <strong>${session.paymentTotal}</strong>
        </p>
      </div>
      <div className={styles.rate}>
        <div className={styles.starRating}>
          <StarRating
            rating={rating}
            updateHandler={(rating: number) => setRating(rating)}
          />
        </div>
        <form onSubmit={formSubmitHandler}>
          <textarea
            className="editInput"
            rows={5}
            onChange={(e) => setTextarea(e.target.value)}
            value={textarea}
          ></textarea>
          <button type="submit" className={styles.reviewButton}>
            Confirm & Pay
          </button>
        </form>
      </div>
    </section>
  );
};

export default ReviewAndPay;
