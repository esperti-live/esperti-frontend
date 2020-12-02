import axios from "axios";
import { useRouter } from "next/router";
import { useState, useEffect, useContext } from "react";

import { getChannel, getOtherUserId } from "../../utils/chat";
import AuthContext from "../../contexts/AuthContext";
import { Session } from "../../ts/interfaces";

import Chat from "../../components/Chat/Chat";
import SessionStatus from "../../components/Session/SessionStatus";
import SessionTimer from "../../components/Session/SessionTimer";
import SessionControls from "../../components/Session/SessionControls";

import styles from "../../styles/Sessions.module.scss";
import OtherUserHeader from "../../components/Chat/OtherUserHeader";

export default function sessions() {
  const [timerRunning, setTimerRunning] = useState(false);
  const [persistTime, setPersistTime] = useState(0);
  const [validSession, setValidSession] = useState(true);
  const [session, setSession] = useState<Session | null>(null);

  const router = useRouter();
  const { slug } = router.query;
  const { user } = useContext(AuthContext);

  useEffect(() => {
    let checkInterval: any;
    (async () => {
      try {
        if (slug && user.id) {
          const session = await getFreshSession();

          if (!session.validSession || session.end_time) {
            // in case slug is wrong or session is already completed
            setValidSession(false);
          } else if (session.start_time !== null) {
            // this means session started, but never ended
            continueSession(session);
            setValidSession(true);
          } else if (
            user.id !== session.user_profile &&
            user.id !== session.expert_profile
          ) {
            router.push("/");
          } else {
            // if everything is ok ( session is brand new)
            setValidSession(true);
            clearInterval(checkInterval);
          }

          // checks if the person is an expert and add a ping to backend for
          // status of session (started / finished).
          if (session.expert_profile === user.id) {
            checkInterval = setInterval(getFreshSession, 5000);
          }
        }
      } catch (err) {
        setValidSession(false);
        console.log(err);
      }
    })();

    return () => clearInterval(checkInterval);
  }, [slug, user]);

  const getFreshSession = (): Promise<Session> => {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_STRAPI_URL}/sessions/${slug}`,
          {
            headers: { Authorization: `Bearer ${user.tokenId}` },
          }
        );
        setSession(res.data);
        resolve(res.data);
      } catch (err) {
        reject(err);
      }
    });
  };

  console.log(session);

  const continueSession = (session: Session) => {
    const timeNow = new Date().getTime() / 1000;
    const startTime = new Date(session.start_time).getTime() / 1000;
    // Calculate time from session start to current time
    const totalTime = Math.ceil(timeNow - startTime);

    setPersistTime(totalTime);
    setSession(session);
    setTimerRunning(true);
  };

  if (!validSession) {
    return (
      <section className={styles.sessions}>
        <p>This session is completed or invalid</p>
      </section>
    );
  } else if (
    !session ||
    !Object.keys(session).length ||
    !user ||
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
            <OtherUserHeader
              channel={getChannel(session.user_profile, session.expert_profile)}
              image={""}
              name={"placeholder"}
              rate={30}
            />
            <h1 className={styles.requestTitle}>
              Placeholder request title here
            </h1>
          </>
        )}
        <SessionTimer timerRunning={timerRunning} persistTime={persistTime} />
        {session.user_profile == user.id && (
          <SessionControls
            session={session}
            setSession={(session: Session) => setSession(session)}
            setTimerRunning={() => setTimerRunning(true)}
            slug={slug}
            isUser={session.user_profile == user.id}
            timerRunning={timerRunning}
          />
        )}

        <div>
          <SessionStatus
            isExpert={session.expert_profile == user.id}
            session={session}
          />
          <div className={styles.chat}>
            <Chat
              channel={getChannel(session.user_profile, session.expert_profile)}
              other={
                session.user_profile === user.id
                  ? session.expert_profile
                  : session.user_profile
              }
              expert={session.expert_profile}
              hideOther={true}
            />
          </div>
        </div>
      </section>
    );
  }
}
