import styles from "../../styles/Sessions.module.scss";
import axios from "axios";
import { useRouter } from "next/router";
import AuthContext from "../../contexts/AuthContext";
import { useContext } from "react";
export default function SessionControls({
  isUser,
  timerRunning,
  setTimerRunning,
  session,
  setSession,
  slug,
}) {
  const router = useRouter();
  const { user } = useContext(AuthContext);

  const startSession = async () => {
    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_STRAPI_URL}/sessions/${slug}/start`,
        { start_time: new Date() },
        {
          headers: { Authorization: `Bearer ${user.tokenId}` },
        }
      );
      setTimerRunning(true);
    } catch (err) {
      console.log(err);
    }
  };

  const endSession = async () => {
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_STRAPI_URL}/sessions/${slug}/finish`,
        {},
        {
          headers: { Authorization: `Bearer ${user.tokenId}` },
        }
      );
      setSession(res.data);
      router.push(`/sessions/review/${session.slug}`);
    } catch (err) {
      console.log(err);
    }
  };

  if (isUser) {
    return (
      <div className={styles.controlls}>
        {!timerRunning && (
          <button onClick={startSession} className={styles.startBtn}>
            Start Session
          </button>
        )}
        {timerRunning && (
          <button onClick={endSession} className={styles.stopBtn}>
            End Session
          </button>
        )}
        <div className={`${!timerRunning && styles.hiddenLinks}`}>
          {timerRunning && (
            <>
              <a
                target="_blank"
                rel="noreferrer noopener"
                href="https://meet.google.com/new"
              >
                Google Meet
              </a>
              <a
                target="_blank"
                rel="noreferrer noopener"
                href="https://codeshare.io/new"
              >
                Codeshare
              </a>
            </>
          )}
        </div>
      </div>
    );
  } else {
    return <></>;
  }
}
