import React, { useEffect, useState, useRef } from 'react';
import { generateRandomText } from '../utils/textGenerator';
import { calculateResults } from '../utils/calculateResults.js';   
import ResultModal from './ResultModel';
import ClockTimer from './ClockTimer.jsx';
import TypingArea from './TypingArea';

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
    <div className="flex h-screen pt-16 bg-gray-200 overflow-hidden justify-center items-center">
      {/* Left Typing Section - 70% */}
      <div className="w-[90%] flex flex-col items-start justify-center px-8">
        <TypingArea
          paragraph={text}
          userInput={userInput}
          onInputChange={handleChange}
          disabled={showResult}
        />

        {showResult && (() => {
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