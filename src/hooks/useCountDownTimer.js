import { useState, useRef, useEffect } from "react";

const useCountDownTimer = (initialTime) => {
  const [timeRemaining, setTimeRemaining] = useState(initialTime);
  const [isTimerActive, setIsTimerActive] = useState(false);
  const timeRef = useRef(null);

  //Start timer
  const startTimer = () => {
    if (isTimerActive) return;
    setIsTimerActive(true);
  };

  //Stop timer
  const stopTimer = () => {
    setIsTimerActive(false);
    clearInterval(timeRef.current);
  };

  //Reset timer
  const resetTimer = () => {
    stopTimer();
    setTimeRemaining(initialTime);
  };

  //Run timer
  useEffect(() => {
    if (!isTimerActive) return;

    timeRef.current = setInterval(() => {
      setTimeRemaining((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timeRef.current);
  }, [isTimerActive]);

  //Stop at 0
  useEffect(() => {
    if (timeRemaining <= 0) {
      stopTimer();
    }
  }, [timeRemaining]);

  return { timeRemaining, isTimerActive, startTimer, stopTimer, resetTimer };
};

export default useCountDownTimer;
