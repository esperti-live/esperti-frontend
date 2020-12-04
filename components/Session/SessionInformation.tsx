import styles from "../../styles/components/SessionInformation.module.scss";

const SessionInformation = ({ session }) => {
  /**
   * Calculates total time
   * @return formatted time string mm:ss
   */

  const calculateTotalTime = () => {
    const { totalTime } = session;
    return `${totalTime}:00`;
  };

  return (
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
  );
};

export default SessionInformation;
