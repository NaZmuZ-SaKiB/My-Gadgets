"use client";

import { useEffect, useState } from "react";

const CountDownTimer = () => {
  const [time, setTime] = useState<number>(
    new Date("2026-12-01").getTime() - Date.now()
  );

  useEffect(() => {
    setTimeout(() => {
      setTime(time - 1000);
    }, 1000);
  }, [time]);

  const getTime = () => {
    const total_seconds = Math.floor(time / 1000);
    const total_minutes = Math.floor(total_seconds / 60);
    const total_hours = Math.floor(total_minutes / 60);
    const days = Math.floor(total_hours / 24);

    const seconds = total_seconds % 60;
    const minutes = total_minutes % 60;
    const hours = total_hours % 24;

    return {
      days,
      hours,
      minutes,
      seconds,
    };
  };

  return (
    <div className="flex w-full gap-2 xs:gap-4 font-semibold">
      <div className="countdown-timer-item">
        <span>{getTime().days}</span>
        <span>Days</span>
      </div>
      <div className="countdown-timer-item">
        <span>{getTime().hours}</span>
        <span>Hours</span>
      </div>
      <div className="countdown-timer-item">
        <span>{getTime().minutes}</span>
        <span>Mins</span>
      </div>
      <div className="countdown-timer-item max-[300px]:hidden">
        <span>{getTime().seconds}</span>
        <span>Sec</span>
      </div>
    </div>
  );
};

export default CountDownTimer;
