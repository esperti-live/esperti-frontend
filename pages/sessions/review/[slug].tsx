import { useContext, useState, useEffect, FormEvent } from "react";
import StarRating from "../../../components/StarRating";

import axios from "axios";
import AuthContext from "../../../contexts/AuthContext";

import styles from "../../../styles/Review.module.scss";
import SessionContext from "../../../contexts/SessionContext";
import { useRouter } from "next/router";

const ReviewAndPay = () => {
  const [textarea, setTextarea] = useState("");
  const [rating, setRating] = useState(1);
  const [validSession, setValidSession] = useState(false);
  const { user } = useContext(AuthContext);
  const { session, setCurrentSession } = useContext(SessionContext);

  const router = useRouter();
  const { slug } = router.query;

  const formSubmitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = {
      rating,
      comment: textarea,
      sessionId: session.id,
    };

    axios.post(`${process.env.NEXT_PUBLIC_STRAPI_URL}/reviews`, data, {
      headers: { Authorization: `Bearer ${user.tokenId}` },
    });
  };

  useEffect(() => {
    (async () => {
      try {
        if (slug && !session) {
          const res = await axios.get(
            `${process.env.NEXT_PUBLIC_STRAPI_URL}/sessions/${slug}`
          );

          if (!res.data.validSession) {
            setValidSession(false);
          } else {
            console.log(res);
            setValidSession(true);
            setCurrentSession(res.data);
          }
        }
      } catch (err) {
        console.log(err);
      }
    })();
  }, [slug]);

  if (!user || !user.tokenId) {
    return <p>Loading...</p>;
  } else if (!session) {
    return <p>Session could not be found or is already completed</p>;
  } else {
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
  }
};

export default ReviewAndPay;
