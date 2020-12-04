import { useContext, useState, useEffect, FormEvent } from "react";
import { useRouter } from "next/router";
import { getToken } from "../../../utils/magic";

import StarRating from "../../../components/StarRating";
import AuthContext from "../../../contexts/AuthContext";
import ExpertHeadshot from "../../../components/Expert/ExpertHeadshot";

import axios from "axios";

import styles from "../../../styles/pages/Review.module.scss";

const ReviewAndPay = () => {
  const [textarea, setTextarea] = useState("");
  const [rating, setRating] = useState(0);
  const [validSession, setValidSession] = useState(null);
  const [loadingSession, setLoadingSession] = useState(false);
  const { user } = useContext(AuthContext);
  const [session, setSession] = useState(null);

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

      const tokenId = await getToken();
      await axios.post(`${process.env.NEXT_PUBLIC_STRAPI_URL}/reviews`, data, {
        headers: { Authorization: `Bearer ${tokenId}` },
      });
      router.push(`/sessions/${slug}/summary`);
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
    if (slug && user.email) {
      fetchAndSetSession();
    }
  }, [slug, user]);

  /**
   * In case there is no session -> user refreshed the page and
   * session is not available in context then fetch it and check
   * for validity
   *
   * @return void
   */
  const fetchAndSetSession = async () => {
    setLoadingSession(true);
    try {
      const tokenId = await getToken();
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_STRAPI_URL}/sessions/${slug}`,
        {
          headers: { Authorization: `Bearer ${tokenId}` },
        }
      );

      if (!res.data.validSession) {
        // if invalid display invalid message (valid -> not completed && exists)
        setValidSession(false);
      } else {
        // if session is valid then continue
        setValidSession(true);
        console.log(res.data);
        setSession(res.data);
      }
    } catch (err) {
      console.log("fetchAndSetSession Error", err);
    } finally {
      setLoadingSession(false);
    }
  };

  if (!user?.email || loadingSession) {
    return <p>Loading...</p>;
  } else if (validSession === false || (!session && !loadingSession)) {
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
            name={session.expert_profile.name}
            title={session.expert_profile.title}
            image={session.expert_profile.image}
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
        </div>
      </section>
    );
  }
};

export default ReviewAndPay;
