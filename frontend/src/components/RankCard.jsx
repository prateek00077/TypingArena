import React, { useEffect, useState } from 'react';
import { useRoomContext } from '../context/RoomContext';
import { useAppContext } from '../context/AppContext';

const RankCard = ({ onClose }) => {
    const { room } = useRoomContext();
    const { user } = useAppContext();
    const [participants, setParticipants] = useState([]);
    
    useEffect(() => {
        // Use the 'room' object from the context, which is now up-to-date
        if (room && room.participants) {
            const sorted = [...room.participants]
                .sort((a, b) => {
                    if (b.wpm !== a.wpm) {
                        return b.wpm - a.wpm; // Sort by WPM
                    }
                    return b.accuracy - a.accuracy; // Then by Accuracy
                })
                .map((p, i) => ({ ...p, rank: i + 1 }));
            setParticipants(sorted);
        }
    }, [room]);

    const handleBack = () => {
        if (onClose) onClose();
    };

    return (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-70 flex items-center justify-center">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl mx-4 h-auto max-h-[80vh] flex flex-col">
                <div className="p-6 border-b">
                    <h2 className="text-3xl font-bold text-gray-800 text-center">Race Results</h2>
                </div>

                <div className="flex-1 overflow-y-auto p-6">
                    <table className="w-full border-collapse text-left">
                        <thead>
                            <tr className="bg-gray-200 text-slate-800">
                                <th className="p-3">Rank</th>
                                <th className="p-3">Username</th>
                                <th className="p-3">WPM</th>
                                <th className="p-3">Accuracy</th>
                            </tr>
                        </thead>
                        <tbody>
                            {participants.length > 0 ? (
                                participants.map((p) => (
                                    <tr
                                        key={p.userId}
                                        className={`border-t ${String(p.userId) === String(user?._id) ? 'bg-blue-100 font-bold' : ''}`}
                                    >
                                        <td className="p-3">{p.rank}</td>
                                        <td className="p-3">{p.username}</td>
                                        <td className="p-3">{p.wpm ?? '—'}</td>
                                        <td className="p-3">{p.accuracy != null ? `${p.accuracy}%` : '—'}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="4" className="text-center p-4 text-gray-500">
                                        No participant data found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
                
                <div className="p-6 border-t flex justify-center">
                    <button
                        onClick={handleBack}
                        className="px-6 py-2 bg-gradient-to-r from-slate-900 to-slate-700 text-white rounded-xl transition"
                    >
                        Back to Rooms
                    </button>
                </div>
            </div>
        </div>
    );
};

export default RankCard;