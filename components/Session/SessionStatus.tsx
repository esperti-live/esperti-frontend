import styles from "../../styles/components/SessionStatus.module.scss";

export default function SessionStatus({ isExpert, session }) {
  if (isExpert) {
    return (
      <div className={styles.sessionStatus}>
        {!session.start_time && (
          <p className={styles.inactive}>Session has not started yet.</p>
        )}
        {session.start_time && !session.end_time && (
          <p className={styles.active}>Session has started.</p>
        )}
        {session.end_time && (
          <p className={styles.inactive}>Session has ended.</p>
        )}
      </div>
    );
  } else {
    return <></>;
  }
}
