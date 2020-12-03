import { useContext, useState, useEffect } from "react";
import StarRating from "../../../components/StarRating";

import axios from "axios";
import AuthContext from "../../../contexts/AuthContext";

import styles from "../../../styles/Review.module.scss";
import SessionContext from "../../../contexts/SessionContext";
import { useRouter } from "next/router";
import ExpertHeadshot from "../../../components/Expert/ExpertHeadshot";

const ReviewAndPay = () => {
  const [loadingSession, setLoadingSession] = useState(false);
  const { user } = useContext(AuthContext);
  const { session, setCurrentSession } = useContext(SessionContext);

  const router = useRouter();
  const { slug } = router.query;

  /**
   * Calculates total time
   * @return formatted time string mm:ss
   */

  const calculateTotalTime = () => {
    const { totalTime } = session;
    return `${totalTime}:00`;
  };

  useEffect(() => {
    if (slug && !session && user.tokenId) {
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
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_STRAPI_URL}/sessions/${slug}/summary`,
        {
          headers: { Authorization: `Bearer ${user.tokenId}` },
        }
      );

      if (!res.data.completed) {
        setCurrentSession(null);
      } else {
        // if session is valid then continue
        setCurrentSession(res.data);
      }
    } catch (err) {
      console.log("fetchAndSetSession Error", err);
    } finally {
      setLoadingSession(false);
    }
  };

  if (!user?.tokenId || loadingSession) {
    return <p>Loading...</p>;
  } else if (!session && !loadingSession) {
    return <p>Session could not be found</p>;
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
            <StarRating rating={session.review.rating} updateHandler={null} />
          </div>
          <p>{session.review.comment}</p>
        </div>
      </section>
    );
  }
};

export default ReviewAndPay;
