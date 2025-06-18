import React, { useEffect, useState, useRef } from 'react';
import { generateRandomText } from '../utils/textGenerator';
import { calculateResults } from '../utils/calculateResults.js';   
import ResultModal from './ResultModel';
import ClockTimer from './ClockTimer.jsx';

const TypingBox = () => {
  const [text, setText] = useState('');
  const [userInput, setUserInput] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [timer, setTimer] = useState(0);
  const [duration, setDuration] = useState(1);
  const timeoutRef = useRef(null);

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
    <div className="flex h-screen pt-16 bg-gray-200 dark:bg-gray-900 overflow-hidden justify-center items-center">
      {/* Left Typing Section - 70% */}
      <div className="w-[90%] flex flex-col items-start justify-center px-8">
        <div className={`w-full rounded-xl shadow-lg bg-white dark:bg-gray-800 p-8 mb-8 ${showResult ? 'opacity-40 pointer-events-none' : ''}`}>
          <div className="font-mono text-xl leading-relaxed tracking-wide min-h-32 text-gray-900 dark:text-gray-100 selection:bg-gray-300 dark:selection:bg-gray-700 break-words whitespace-pre-wrap">
            {text.split('').map((char, idx) => {
              const typedChar = userInput[idx];
              let color = 'text-gray-800 dark:text-gray-300';
              if (typedChar !== undefined) {
                color = typedChar === char ? 'text-green-600 dark:text-green-600' : 'text-red-500 dark:text-red-400';
              }
              return (
                <span key={idx} className={`transition-colors duration-150 ${color}`}>
                  {char}
                </span>
              );
            })}
          </div>

          <input
            type="text"
            className={`w-full mt-4 font-mono text-xl rounded-lg border px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gray-400 dark:focus:ring-gray-600 bg-gray-50 dark:bg-gray-700 shadow ${showResult ? 'opacity-40 pointer-events-none' : ''}`}
            value={userInput}
            onChange={handleChange}
            placeholder="Start typing here..."
            autoFocus
            spellCheck={false}
            disabled={showResult}
          />
        </div>

        {showResult && (() => {
          // Calculate time spent in seconds
          const timeSpentSeconds = duration * 60 - timer;
          const { wpm, accuracy, finalScore } = calculateResults(userInput, text, timeSpentSeconds);
          return (
            <ResultModal
              wpm={wpm}
              accuracy={accuracy}
              finalScore={finalScore}
              onRestart={handleRestart}
            />
          );
        })()}
      </div>

      {/* Right Timer Section - 30% */}
      <div className="w-[30%] flex items-center justify-center px-4">
        <ClockTimer
          timer={timer}
          setTimer={setTimer}
          startTime={startTime}
          showResult={showResult}
          duration={duration}
          timeoutRef={timeoutRef}
          setShowResult={setShowResult}
          setDuration={setDuration}
          handleRestart={handleRestart}
          handleCancel={() => setShowResult(true)}
        />
      </div>
    </div>
  );
};

export default TypingBox;