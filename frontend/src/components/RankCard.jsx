import React from 'react';
import { useRoomContext } from '../context/RoomContext';
import { useAppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';

const RankCard = ({ onClose }) => {
    const { room } = useRoomContext();
    const { user } = useAppContext();
    const navigate = useNavigate();

    const participants = room?.participants || [];

    const getDisplayRank = (p, idx) =>
    typeof p.rank === 'number' && !Number.isNaN(p.rank) ? p.rank : idx + 1;

    const handleBack = () => {
    if (typeof onClose === 'function') {
    onClose();
    } else {
    navigate('/room');
    }
};


    return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-70 flex items-center justify-center pt-12">
        <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-3xl mx-4 max-h-[90vh] overflow-y-auto text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Race Results</h2>

        {participants.length === 0 ? (
            <p className="text-gray-700">No participants found.</p>
        ) : (
            <table className="w-full border-collapse text-left">
            <thead>
            <tr className="bg-gray-200 text-slate-800">
                <th className="p-2">Rank</th>
                <th className="p-2">Username</th>
                <th className="p-2">WPM</th>
                <th className="p-2">Accuracy</th>
            </tr>
            </thead>
            <tbody>
                {participants.map((p, idx) => (
                <tr
                    key={p.userId}
                    className={
                    String(p.userId) === String(user?._id)
                        ? 'border-t text-slate-800 bg-gray-100 font-semibold'
                        : 'border-t'
                    }
                >
                    <td className="p-2">{getDisplayRank(p, idx)}</td>
                    <td className="p-2">{p.username}</td>
                    <td className="p-2">{p.wpm ?? '—'}</td>
                    <td className="p-2">
                    {p.accuracy != null ? `${p.accuracy}%` : '—'}
                </td>
                </tr>
            ))}
            </tbody>
        </table>
        )}

        <div className="mt-6 flex justify-center gap-4">
        <button
            onClick={handleBack}
            className="px-5 py-2 bg-gradient-to-r from-slate-900 to-slate-700 text-white rounded-xl  transition"
        >
            🔙 Back to Room
        </button>
        </div>
    </div>
    </div>
);
};

export default RankCard;
