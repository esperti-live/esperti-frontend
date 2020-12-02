import { useContext, useState, useEffect, FormEvent } from "react";
import StarRating from "../../../components/StarRating";

import axios from "axios";
import AuthContext from "../../../contexts/AuthContext";

import styles from "../../../styles/Review.module.scss";
import SessionContext from "../../../contexts/SessionContext";
import { useRouter } from "next/router";
import ExpertHeadshot from "../../../components/Expert/ExpertHeadshot";

const ReviewAndPay = () => {
  const [textarea, setTextarea] = useState("");
  const [rating, setRating] = useState(1);
  const [validSession, setValidSession] = useState(false);
  const { user } = useContext(AuthContext);
  const { session, setCurrentSession } = useContext(SessionContext);

  const router = useRouter();
  const { slug } = router.query;

  const formSubmitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const data = {
        rating,
        comment: textarea,
        sessionId: session.id,
      };

      await axios.post(`${process.env.NEXT_PUBLIC_STRAPI_URL}/reviews`, data, {
        headers: { Authorization: `Bearer ${user.tokenId}` },
      });
      router.push("/sessions/completed");
    } catch (err) {
      console.log("submitReview Error", err);
    }
  };

  /**
   * Calculates total time
   * @return formatted time string mm:ss
   */

  const calculateTotalTime = () => {
    const { totalTime } = session;
    return `${totalTime}:00`;
  };

  useEffect(() => {
    (async () => {
      try {
        if (slug && !session && user.tokenId) {
          const res = await axios.get(
            `${process.env.NEXT_PUBLIC_STRAPI_URL}/sessions/${slug}`,
            {
              headers: { Authorization: `Bearer ${user.tokenId}` },
            }
          );

          if (!res.data.validSession) {
            setValidSession(false);
          } else {
            setValidSession(true);
            setCurrentSession(res.data);
          }
        }
      } catch (err) {
        console.log(err);
      }
    })();
  }, [slug, user]);

  if (!user || !user.tokenId) {
    return <p>Loading...</p>;
  } else if (!session || !validSession) {
    return <p>Session could not be found or is already completed</p>;
  } else {
    return (
      <section className={styles.review}>
        <div className={styles.info}>
          <h1>Session Summary</h1>

          <div className={styles.totals}>
            <div className={styles.time}>
              <small>Total time</small>
              <p>{calculateTotalTime()}</p>
            </div>

            <div className={styles.payment}>
              <small>Total to pay</small>
              <p>{session.paymentTotal}€</p>
            </div>
          </div>
        </div>

        <div className={styles.rate}>
          <h2>How would you rate our expert</h2>
          <ExpertHeadshot
            name={"Placeholder Name"}
            title={"Professional Noob"}
            image={""}
          />
          <div className={styles.starRating}>
            <StarRating
              rating={rating}
              updateHandler={(rating: number) => setRating(rating)}
            />
          </div>
          <form onSubmit={formSubmitHandler} className={styles.rateExpert}>
            <textarea
              rows={3}
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
