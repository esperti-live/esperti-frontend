import { useRouter } from "next/router";
import { getToken } from "../../utils/magic";
import axios from "axios";

import styles from "../../styles/components/SessionControlls.module.scss";

export default function SessionControls({
  isUser,
  timerRunning,
  setTimerRunning,
  session,
  setSession,
  slug,
}) {
  const router = useRouter();

  const startSession = async () => {
    try {
      const tokenId = await getToken();
      await axios.post(
        `${process.env.NEXT_PUBLIC_STRAPI_URL}/sessions/${slug}/start`,
        { start_time: new Date() },
        {
          headers: { Authorization: `Bearer ${tokenId}` },
        }
      );
      setTimerRunning(true);
    } catch (err) {
      console.log(err);
    }
  };

  const endSession = async () => {
    try {
      const tokenId = await getToken();
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_STRAPI_URL}/sessions/${slug}/finish`,
        {},
        {
          headers: { Authorization: `Bearer ${tokenId}` },
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
