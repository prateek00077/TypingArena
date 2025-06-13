import React, { useEffect } from 'react';
import { FcClock } from "react-icons/fc";
import { DurationChange } from '../components/DurationSelect';
const ClockTimer = ({
    timer,
    setTimer,
    startTime,
    showResult,
    duration,
    timeoutRef,
    setShowResult,
    setDuration
}) => {
useEffect(() => {
    let interval = null;
    if (startTime && !showResult) {
    interval = setInterval(() => {
        setTimer(Math.floor((Date.now() - startTime) / 1000));
    }, 1000);
      timeoutRef.current = setTimeout(() => setShowResult(true), duration * 60000);
    }
    return () => {
        clearInterval(interval);
        clearTimeout(timeoutRef.current);
    };
}, [startTime, showResult, duration, setTimer, setShowResult, timeoutRef]);

return (
    <div className="absolute top-6 right-10 flex flex-col items-center gap-1">
        <FcClock className="text-8xl" />
    <div className="text-xl font-mono bg-white/80 px-4 py-2 rounded shadow mt-2">
        {timer}s
    </div>
        <DurationChange
        duration={duration}
        setDuration={setDuration}
        startTime={startTime}
        showResult={showResult}
    />
    </div>
);
};

export default ClockTimer;