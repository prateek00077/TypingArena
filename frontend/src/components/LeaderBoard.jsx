import React from 'react';
import { useRoomContext } from '../context/RoomContext';

const Leaderboard = () => {
  const { room } = useRoomContext();

  // Use participants array from room
  const users = room?.participants || [];

  return (
    <div className="bg-gray-100 p-2 mt-10 h-full font-serif rounded-lg shadow flex flex-col">
      <div className="sticky top-0 z-10 bg-gray-100">
        <h3 className="text-3xl font-bold text-gray-800 py-4 text-center border-b border-gray-200">
          Users Leaderboard
        </h3>
      </div>
      <div className="flex-1 overflow-y-auto px-7 py-4">
        {users.map((user, idx) => (
          <div
            key={user.userId}
            className="w-full flex items-center gap-4 bg-white rounded-xl shadow-sm p-4 border border-gray-300 mb-2"
          >
            <div className="flex-1 font-bold text-gray-800">
              {user.username}
            </div>
            <div className="font-mono text-lg text-green-700">{user.rank} Rank</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Leaderboard;