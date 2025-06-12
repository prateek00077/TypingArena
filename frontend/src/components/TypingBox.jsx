import React, { useEffect, useState, useRef } from 'react';
import { generateRandomText } from '../utils/textGenerator';
// import typingSpeedCalculator from '../utils/typingSpeedCalculator';
import ResultModal from './ResultModel';
import { FcClock } from "react-icons/fc";

const TypingBox = () => {
  const [text, setText] = useState('');
  const [userInput, setUserInput] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [timer, setTimer] = useState(0);
  const [duration, setDuration] = useState(1);
  const timeoutRef = useRef(null);

  useEffect(() => {
   // Reset test when duration changes
    setText(generateRandomText(100));
    setUserInput('');
    setShowResult(false);
    setStartTime(null);
    setTimer(0);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  }, [duration]);

  useEffect(() => {
    // Start timer interval and auto-finish timeout when typing starts
    let interval = null;
    if (startTime && !showResult) {
      interval = setInterval(() => {
        setTimer(Math.floor((Date.now() - startTime) / 1000));
      }, 1000);
      timeoutRef.current = setTimeout(() => setShowResult(true), duration * 60000);
    }
    // Cleanup both interval and timeout on dependency change/unmount
    return () => {
      clearInterval(interval);
      clearTimeout(timeoutRef.current);
    };
  }, [startTime, showResult, duration]);

  const handleChange = (e) => {
    if (!startTime) setStartTime(Date.now());
    const value = e.target.value;
    setUserInput(value);

    // Show result when all text is typed 
    if (value.length === text.length) {
      // your result function
      setShowResult(true);
    }
  };

  const handleRestart = () => {
    setText(generateRandomText(100));
    setUserInput('');
    setShowResult(false);
    setStartTime(null);
    setTimer(0);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  };

  return (
    <div className="flex flex-col items-center min-h-[50vh] justify-center bg-gradient-to-b from-gray-50 to-gray-200 relative">
      {/* Centered clock and timer */}
      <div className="absolute top-6 right-10 flex flex-col items-center gap-1">
        <FcClock className="text-8xl" />
        <div className="text-xl font-mono bg-white/80 px-4 py-2 rounded shadow mt-2">
          {timer}s
        </div>
        <div className="flex items-center gap-2 mt-2">
          <label className="font-mono text-lg">Duration:</label>
          <select
            className="font-mono px-2 py-1 rounded border"
            value={duration}
            onChange={e => setDuration(Number(e.target.value))}
            disabled={startTime !== null && !showResult}
          >
            <option value={0.5}>30 sec</option>
            <option value={1}>1 min</option>
            <option value={2}>2 min</option>
            <option value={3}>3 min</option>
            <option value={4}>4 min</option>
            <option value={5}>5 min</option>
            <option value={10}>10 min</option>
          </select>
        </div>
      </div>
      {showResult && (
        <ResultModal
          wpm="-"
          accuracy="-"
          finalScore="-"
          onRestart={handleRestart}
        />
      )}

      <div className={`w-full max-w-5xl rounded-xl shadow-lg bg-white/90 p-8 mb-8 ${showResult ? 'opacity-40 pointer-events-none' : ''}`}>
        <div className="font-mono text-xl leading-relaxed tracking-wide min-h-32 text-gray-900 selection:bg-gray-300 break-words whitespace-pre-wrap">
          {text.split('').map((char, idx) => {
            const typedChar = userInput[idx];
            let color = 'text-gray-800';
            if (typedChar !== undefined) {
              color = typedChar === char ? 'text-green-600' : 'text-red-500';
            }
            return (
              <span key={idx} className={`transition-colors duration-150 ${color}`}>
                {char}
              </span>
            );
          })}
        </div>
      </div>

      <input
        type="text"
        className={`w-full max-w-5xl font-mono text-xl rounded-lg border px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gray-400 bg-gray-50 shadow ${showResult ? 'opacity-40 pointer-events-none' : ''}`}
        value={userInput}
        onChange={handleChange}
        placeholder="Start typing here..."
        autoFocus
        spellCheck={false}
        disabled={showResult}
      />
    </div>
  );
};

export default TypingBox;