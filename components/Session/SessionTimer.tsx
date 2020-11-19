import React, { useEffect, useState, useRef } from "react";

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
    const getHours = `0${Math.floor(displayTime / 3600)}`.slice(-2);

    return `${getHours} : ${getMinutes} : ${getSeconds}`;
  };

  return <h4>Current Session: {formatTime()}</h4>;
}
