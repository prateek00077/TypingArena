import React, { useEffect, useState, useRef } from 'react';
import { FcClock } from "react-icons/fc";
import { useNavigate } from 'react-router-dom';
import Leaderboard from './Leaderboard.jsx';
import TypingArea from "./TypingArea.jsx";
import { useRoomContext } from '../context/RoomContext';
import { useAppContext } from '../context/AppContext';
import { useSocket } from '../context/SocketContext';
import RankCard from './RankCard.jsx';
import { calculateResults } from '../utils/calculateResults.js'; 

const TypingRoom = ({ paragraph }) => {
    const [phase, setPhase] = useState("idle");
    const [timer, setTimer] = useState(0);
    const [userInput, setUserInput] = useState('');
    const [liveLeaderboard, setLiveLeaderboard] = useState([]);
    const [showRankCard, setShowRankCard] = useState(false);

    const gameStartTimeRef = useRef(null);
    const gameEndTimeRef = useRef(null);
    
    const { room, leaveRoom, getRoomDetails } = useRoomContext();
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
            gameStartTimeRef.current = startTime;
            gameEndTimeRef.current = startTime + (room.duration || 1) * 60 * 1000;
            setPhase("waiting");
        };

        const handleGameEnd = async () => {
            setPhase("finished");
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
    }, [socket, room?._id, user?._id, navigate, room?.duration]);


    useEffect(() => {
        if (phase === "idle" || phase === "finished") {
            return;
        }

        let animationFrame;
        const updateTimer = () => {
            const now = Date.now();

            if (now < gameStartTimeRef.current) {
                const timeLeft = Math.max(0, Math.floor((gameStartTimeRef.current - now) / 1000));
                setTimer(timeLeft);
            } else if (now < gameEndTimeRef.current) {
                if (phase !== 'typing') setPhase('typing');
                const timeLeft = Math.max(0, Math.floor((gameEndTimeRef.current - now) / 1000));
                setTimer(timeLeft);
            } else {
                if (phase !== 'finished') {
                    if (userIsHost) {
                        socket.emit("endGame", { roomId: room._id });
                    }
                    setPhase('finished');
                }
            }

            if (phase !== 'finished') {
                animationFrame = requestAnimationFrame(updateTimer);
            }
        };

        animationFrame = requestAnimationFrame(updateTimer);
        return () => cancelAnimationFrame(animationFrame);
    }, [phase, userIsHost, room?._id, socket]);


    const handleInputChange = (e) => {
        const value = e.target.value;
        setUserInput(value);

        if (phase === "typing" && socket && paragraph) {
            const timeSpentSeconds = ((room?.duration || 1) * 60) - timer;
            const results = calculateResults(value, paragraph, timeSpentSeconds);
            socket.emit("updateProgress", {
                wpm: results.wpm,
                accuracy: results.accuracy,
            });
        }
    };
    
    useEffect(() => {
        return () => {
            if ((phase === "typing" || phase === "finished") && socket && room && user && paragraph) {
                const timeSpentSeconds = (room.duration || 1) * 60;
                const finalResults = calculateResults(userInput, paragraph, timeSpentSeconds);
                socket.emit("submitFinalResult", {
                    roomId: room._id,
                    userId: user._id,
                    username: user.username,
                    wpm: finalResults.wpm,
                    accuracy: finalResults.accuracy,
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