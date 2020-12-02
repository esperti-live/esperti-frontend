import React, { useEffect, useState, useRef } from "react";
import styles from "../../styles/Sessions.module.scss";
export default function SessionTimer({ timerRunning, persistTime }) {
  const [displayTime, setDisplayTime] = useState(0);
  const timer = useRef(null);

  useEffect(() => {
    if (timerRunning) {
      timer.current = setInterval(() => {
        setDisplayTime((oldTime) => oldTime + 1);
      }, 1000);
    } else {
      clearInterval(timer.current);
    }
  }, [timerRunning]);

  useEffect(() => {
    if (persistTime > 0) {
      setDisplayTime(persistTime);
    }
  }, [persistTime]);

  useEffect(() => {
    return () => clearInterval(timer.current);
  }, []);

  const formatTime = () => {
    const getSeconds = `0${displayTime % 60}`.slice(-2);
    const getMinutes = `0${Math.floor(displayTime / 60) % 60}`.slice(-2);

    return `${getMinutes}:${getSeconds}`;
  };

  return <h4 className={styles.counter}>{formatTime()}</h4>;
}
