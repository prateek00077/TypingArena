import { FcClock } from "react-icons/fc";
import React, { useEffect, useState, useRef } from 'react';
import Leaderboard from './Leaderboard.jsx';
import TypingArea from "./TypingArea.jsx";

const BoardData = [
  { name: 'User1', wpm: 75, rank: 1 },
  { name: 'User2', wpm: 68, rank: 2 },
  { name: 'You', wpm: 66, rank: 3 },
  { name: 'User3', wpm: 62, rank: 4 },
  { name: 'User4', wpm: 60, rank: 5 },
  { name: 'User2', wpm: 68, rank: 2 },
  { name: 'You', wpm: 66, rank: 3 },
  { name: 'User3', wpm: 62, rank: 4 },
  { name: 'User4', wpm: 60, rank: 5 },
];

const TypingRoom = ({ paragraph, duration }) => {
  const [phase, setPhase] = useState("idle");
  const [timer, setTimer] = useState(0);
  const [userInput, setUserInput] = useState('');
  const intervalRef = useRef(null);

  useEffect(() => {
    if (phase === "waiting") {
      setTimer(30);
    } else if (phase === "typing") {
      setTimer(duration * 60);
    }
    if (phase !== "idle") {
      intervalRef.current = setInterval(() => {
        setTimer(prev => {
          if (prev === 1) {
            clearInterval(intervalRef.current);
            if (phase === "waiting") {
              setPhase("typing");
            } else if (phase === "typing") {
              setPhase("idle");
            }
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => clearInterval(intervalRef.current);
  }, [phase, duration]);

  const handleStart = () => {
    setPhase("waiting");
    setUserInput('');
  };

  const handleEnd = () => {
    setPhase("idle");
    setUserInput('');
    clearInterval(intervalRef.current);
  };

  return (
    <div className="h-screen  w-full overflow-hidden bg-gray-100 flex flex-row p-4 gap-4">
      {/* Left Side */}
      <div className="flex mt-20 flex-col w-2/3 items-center gap-4">
        <div className="h-20 flex items-center justify-center">
          {(phase === "waiting" || phase === "typing") && (
            <div className="flex flex-row gap-3 items-center">
              <h1 className="text-3xl text-gray-800 font-bold">
                {phase === "waiting" ? "Starts In" : "Ends In"}
              </h1>
              <FcClock className="text-5xl" />
              <div className="text-3xl font-bold text-red-700">{timer} sec</div>
            </div>
          )}
        </div>

        <TypingArea
          paragraph={paragraph || "Paragraph here"}
          userInput={userInput}
          onInputChange={(e) => setUserInput(e.target.value)}
          disabled={phase !== "typing"}
        />
      </div>

      {/* Right Side */}
      <div className="w-1/3 p-3 flex flex-col gap-4">
        <div className="flex-1 overflow-hidden">
          <Leaderboard users={BoardData} />
        </div>

        <div className="bg-gray-100 rounded-lg shadow p-4 space-y-3">
          <p className="text-lg text-center text-gray-700">
            <strong>Room ID:</strong> abc123
          </p>
          <div className="flex gap-2">
            <button
              className="flex-1 bg-gradient-to-r from-slate-900 to-slate-700 text-white rounded px-4 py-2"
              onClick={handleStart}
              disabled={phase !== "idle"}
            >
              Start
            </button>
            <button
              className="flex-1 bg-red-500 hover:bg-red-600 text-white rounded px-4 py-2"
              onClick={handleEnd}
            >
              End
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TypingRoom;
