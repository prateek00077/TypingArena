import React, { useEffect, useState, useRef } from 'react';
import { FcClock } from "react-icons/fc";
import { useNavigate } from 'react-router-dom';
import Leaderboard from './Leaderboard.jsx';
import TypingArea from "./TypingArea.jsx";
import { useRoomContext } from '../context/RoomContext';
import { useAppContext } from '../context/AppContext';
import { useSocket } from '../context/SocketContext';
import RankCard from './RankCard.jsx';

const TypingRoom = ({ paragraph }) => {
    const [phase, setPhase] = useState("idle");
    const [timer, setTimer] = useState(0);
    const [userInput, setUserInput] = useState('');
    const [liveLeaderboard, setLiveLeaderboard] = useState([]);
    const [showRankCard, setShowRankCard] = useState(false);
    const intervalRef = useRef(null);
    const [startTime, setStartTime] = useState(null);

    const { room, leaveRoom,getRoomDetails } = useRoomContext();
    const { user } = useAppContext();
    const socket = useSocket();
    const navigate = useNavigate();

    const userIsHost = String(room?.host) === String(user?._id);

    useEffect(() => {
        if (!socket || !room?._id || !user?._id) {
            navigate('/room');
            return;
        }

        socket.emit("joinRoom", { roomId: room._id, userId: user._id, username: user.username });

        const handleGameStart = ({ startTime }) => {
        setPhase("waiting");
        setStartTime(startTime); // server time in ms
        };

        
        const handleGameEnd = async () => {
        setPhase("finished");
        clearInterval(intervalRef.current);
        if (room?._id) {
        await getRoomDetails(room._id);
        }
        setShowRankCard(true);
};
        const handleLeaderboardUpdate = (updatedUsers) => {
            setLiveLeaderboard(updatedUsers);
        };
        
        socket.on('gameStart', handleGameStart);
        socket.on('gameEnd', handleGameEnd);
        socket.on('leaderboardUpdate', handleLeaderboardUpdate);

        return () => {
            socket.off('gameStart', handleGameStart);
            socket.off('gameEnd', handleGameEnd);
            socket.off('leaderboardUpdate', handleLeaderboardUpdate);
        };
    }, [socket, room?._id, user?._id, navigate]);

useEffect(() => {
    let animationFrame;

    const updateTimer = () => {
        if (phase === "waiting" && startTime) {
            const timeLeft = Math.max(0, Math.floor((startTime - Date.now()) / 1000));
            setTimer(timeLeft);
            if (timeLeft <= 0) {
                setPhase("typing");
                const typingEndTime = Date.now() + (room?.duration || 1) * 60 * 1000;
                setStartTime(typingEndTime); // reuse same state for typing end time
            }
        } else if (phase === "typing" && startTime) {
            const timeLeft = Math.max(0, Math.floor((startTime - Date.now()) / 1000));
            setTimer(timeLeft);
            if (timeLeft <= 0) {
                if (userIsHost) {
                    socket.emit("endGame", { roomId: room._id });
                }
                setPhase("finished");
            }
        }

        animationFrame = requestAnimationFrame(updateTimer);
    };

    updateTimer();

    return () => cancelAnimationFrame(animationFrame);
}, [phase, startTime, userIsHost, room?.duration, room?._id, socket]);



    const calculateWPM = (typed) => {
    const elapsed = ((room?.duration || 1) * 60) - timer;
    if (elapsed <= 0) return 0;

    const words = typed.trim().split(/\s+/).filter(Boolean).length;
    return Math.round((words / elapsed) * 60);
};


    const calculateAccuracy = (typed, para) => {
    if (!typed) return 100;
    const correctChars = typed.split('').filter((char, i) => char === para[i]).length;
    const total = Math.max(typed.length, para.length); // penalize for missing
    return Math.round((correctChars / total) * 100);
};


    const handleInputChange = (e) => {
        const value = e.target.value;
        setUserInput(value);

        if (phase === "typing" && socket) {
            socket.emit("updateProgress", {
                wpm: calculateWPM(value),
                accuracy: calculateAccuracy(value, paragraph),
            });
        }
    };
    
    useEffect(() => {
        return () => {
            if ((phase === "typing" || phase === "finished") && socket && room && user) {
                socket.emit("submitFinalResult", {
                    roomId: room._id,
                    userId: user._id,
                    username: user.username,
                    wpm: calculateWPM(userInput),
                    accuracy: calculateAccuracy(userInput, paragraph),
                });
            }
        };
    }, [phase, socket, room, user, userInput, paragraph]);

    const handleStart = () => {
        if (userIsHost && socket) {
            socket.emit("startGame", { roomId: room._id });
        }
    };

    const handleEnd = () => {
        if (userIsHost && socket) {
            socket.emit("endGame", { roomId: room._id });
        }
    };
    return (
    <div className="h-screen w-full overflow-hidden bg-gray-100 dark:bg-gray-900 flex flex-row p-4 gap-4">
        {showRankCard && <RankCard onClose={() => navigate('/room')} />}

      {/* Left Side: Typing Section */}
    <div className="flex mt-20 flex-col w-2/3 items-center gap-4">
        <div className="h-20 flex items-center justify-center">
        {(phase === "waiting" || phase === "typing") && (
            <div className="flex flex-row gap-3 items-center">
            <h1 className="text-3xl text-gray-800 dark:text-gray-100 font-bold">
                {phase === "waiting" ? "Starts In" : "Time Left"}
            </h1>
            <FcClock className="text-5xl" />
            <div className="text-3xl font-bold text-red-700 dark:text-red-400">{timer}s</div>
            </div>
        )}
        </div>
        <TypingArea
            paragraph={paragraph || "Loading paragraph..."}
            userInput={userInput}
            onInputChange={handleInputChange}
            disabled={phase !== "typing"}
        />
        </div>

      {/* Right Side: Leaderboard + Controls */}
        <div className="w-1/3 p-3 flex flex-col gap-4">
        <div className="flex-1 overflow-hidden">
            <Leaderboard users={liveLeaderboard} />
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 space-y-3">
            <p className="text-lg text-center text-gray-700 dark:text-gray-200">
            <strong>Room ID:</strong> {room?._id || 'N/A'}
            </p>
            <div className="flex gap-2">
            {userIsHost ? (
                <>
                <button
                    className="flex-1 bg-gradient-to-r from-slate-900 to-slate-700 text-white rounded px-4 py-2 disabled:opacity-50"
                    onClick={handleStart}
                    disabled={phase !== "idle"}
                >
                    Start Game
                </button>
                <button
                    className="flex-1 bg-red-500 hover:bg-red-600 text-white rounded px-4 py-2"
                    onClick={handleEnd}
                >
                    End Game
                </button>
                </>
            ) : (
                <button
                className="w-full bg-gradient-to-r from-slate-900 to-slate-700 text-white rounded px-4 py-2"
                onClick={() => {
                    if (leaveRoom) leaveRoom(room._id);
                    navigate("/room");
                }}
                >
                Leave Room
                </button>
            )}
            </div>
        </div>
        </div>
    </div>
);
};

export default TypingRoom;