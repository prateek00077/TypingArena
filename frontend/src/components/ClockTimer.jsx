import React, { useEffect } from 'react';
import { FcClock } from "react-icons/fc";
import { DurationChange } from './DurationSelect';
const ClockTimer = ({
    timer,
    setTimer,
    startTime,
    showResult,
    duration,
    timeoutRef,
    setShowResult,
    setDuration,
    handleRestart,    
    handleCancel
}) => {
    useEffect(() => {
        let interval = null;

        if (startTime && !showResult) {
            const endTime = startTime + duration * 60000;

            interval = setInterval(() => {
                const timeLeft = Math.max(0, Math.floor((endTime - Date.now()) / 1000));
                setTimer(timeLeft);
                if (timeLeft === 0) {
                    setShowResult(true);
                    clearInterval(interval);
                }
            }, 1000);

            timeoutRef.current = setTimeout(() => setShowResult(true), duration * 60000);
        }

        return () => {
            clearInterval(interval);
            clearTimeout(timeoutRef.current);
        };
    }, [startTime, showResult, duration, setTimer, setShowResult, timeoutRef]);

    const formatTime = (totalSeconds) => {
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;
        return `${minutes}:${String(seconds).padStart(2, '0')}`;
    };

    return (
        <div className="flex flex-col items-center gap-2">
            <FcClock className="text-8xl" />
            <div className="flex flex-col items-center bg-white/80 px-4 py-2 rounded shadow">
                <div className="text-xl font-mono">
                    {formatTime(startTime ? timer : duration * 60)}
                </div>
            </div>



            <DurationChange
                duration={duration}
                setDuration={setDuration}
                startTime={startTime}
                showResult={showResult}
            />

            {/* 🔘 Buttons */}
            <div className="mt-2">
                {!startTime && !showResult ? (
                    <div className="text-xs text-gray-500 italic">Type to start the test...</div>
                ) : (
                    <div className="flex gap-2">
                        <button
                            onClick={handleRestart}
                            className="px-4 py-1 bg-green-600 text-white rounded hover:bg-green-700 text-sm"
                        >
                            Restart
                        </button>
                        <button
                            onClick={handleCancel}
                            className="px-4 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-sm"
                        >
                            Cancel
                        </button>
                    </div>
                )}
            </div>

        </div>
    );
};

export default ClockTimer;
