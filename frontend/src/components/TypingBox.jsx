import React, { useEffect, useState, useRef } from 'react';
import { generateRandomText } from '../utils/textGenerator';
import ResultModal from './ResultModel';
import ClockTimer from '../utils/ClockTimer.jsx';

const TypingBox = () => {
  const [text, setText] = useState('');
  const [userInput, setUserInput] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [timer, setTimer] = useState(0);
  const [duration, setDuration] = useState(1);
  const timeoutRef = useRef(null);

  // Reset test when duration changes
    useEffect(() => {
    setText(generateRandomText(100));
    setUserInput('');
    setShowResult(false);
    setStartTime(null);
    setTimer(0);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  }, [duration]);

  const handleChange = (e) => {
    if (!startTime) setStartTime(Date.now());
    const value = e.target.value;
    setUserInput(value);
    if (value.length === text.length) {
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
      <ClockTimer
        timer={timer}
        setTimer={setTimer}
        startTime={startTime}
        showResult={showResult}
        duration={duration}
        timeoutRef={timeoutRef}
        setShowResult={setShowResult}
        setDuration={setDuration}
      />
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