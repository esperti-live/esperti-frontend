import axios from "axios";
import { useRouter } from "next/router";
import { useRef, useState, useEffect, useContext } from "react";
import { Context } from "vm";
import LoadingSpinner from "../../components/LoadingSpinner";
import AuthContext from "../../contexts/AuthContext";
import styles from "../../styles/Sessions.module.scss";

export default function sessions() {
  const [time, setTime] = useState(0);
  const [timerRunning, setTimerRunning] = useState(false);
  const [displayTime, setDisplayTime] = useState(`0`);
  const [validSession, setValidSession] = useState(true);
  const [session, setSession] = useState({});

  const router = useRouter();
  const { slug } = router.query;

  const { user } = useContext(AuthContext);

  const timer = useRef(null);

  const formatTime = () => {
    const getSeconds = `0${time % 60}`.slice(-2);
    const getMinutes = `0${Math.floor(time / 60) % 60}`.slice(-2);
    const getHours = `0${Math.floor(time / 3600)}`.slice(-2);

    return `${getHours} : ${getMinutes} : ${getSeconds}`;
  };

  useEffect(() => setDisplayTime(formatTime()), [time]);

  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_STRAPI_URL}/sessions/${slug}`
        );

        if (!res.data.validSession) {
          setValidSession(false);
        } else {
          setSession(res.data);
          setValidSession(true);
        }
      } catch (err) {
        console.log(err);
      }
    })();
  }, [slug]);

  const startTimer = async () => {
    setTimerRunning(true);
    timer.current = setInterval(() => {
      setTime((oldTime) => oldTime + 1);
    }, 1000);

    console.log(user);
    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_STRAPI_URL}/sessions/${slug}/start`,
        { start_time: new Date() },
        {
          headers: { Authorization: `Bearer ${user.tokenId}` },
        }
      );
    } catch (err) {
      console.log(err);
    }
  };

  const endTimer = async () => {
    clearInterval(timer.current);
    setTimerRunning(false);

    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_STRAPI_URL}/sessions/${slug}/complete`,
      {},
      {
        headers: { Authorization: `Bearer ${user.tokenId}` },
      }
    );

    console.log("ending session", res.data);
  };

  if (!validSession) {
    return (
      <section className={styles.sessions}>
        <p>This session is completed or invalid</p>
      </section>
    );
  } else if (
    !Object.keys(session).length ||
    !Object.keys(user).length ||
    !user.id
  ) {
    return (
      <>
        <section className={styles.sessions}>
          <p>Loading...</p>
        </section>
      </>
    );
  } else if (validSession) {
    return (
      <section className={styles.sessions}>
        {session.user_profile == user.id && (
          <>
            <h1>Live Session: {slug}</h1>
            <h4>Current Session: {displayTime}</h4>

            {!timerRunning && (
              <button onClick={startTimer} className={styles.startBtn}>
                Start Session
              </button>
            )}

            {timerRunning && (
              <button onClick={endTimer} className={styles.stopBtn}>
                End Session
              </button>
            )}
            <hr />
          </>
        )}
        <div>
          <h2>Chat</h2>
          <p>chat here...</p>
        </div>
      </section>
    );
  }
}
