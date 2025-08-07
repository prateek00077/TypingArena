import React from 'react';

const Leaderboard = ({ users = [] }) => {
  const sortedUsers = [...users].sort((a, b) => {
    if (b.wpm !== a.wpm) return b.wpm - a.wpm;
    return b.accuracy - a.accuracy;
  });

  return (
    <div className="bg-gray-100 p-2 mt-10 h-full font-serif rounded-lg shadow flex flex-col">
      <div className="sticky top-0 z-10 bg-gray-100">
        <h3 className="text-3xl font-bold text-gray-800 py-4 text-center border-b border-gray-200">
          Users Leaderboard
        </h3>
      </div>

      <div className="flex-1 overflow-y-auto px-7 py-4">
        {sortedUsers.length === 0 ? (
          <p className="text-center text-gray-600 mt-4">No participants yet.</p>
        ) : (
          sortedUsers.map((user, idx) => (
            <div
              key={user.userId || idx}
              className="w-full flex items-center justify-between bg-white rounded-xl shadow-sm p-4 border border-gray-300 mb-2"
            >
              <div className="flex flex-col">
                <span className="font-bold text-gray-800">{user.username}</span>
                <span className="text-sm text-gray-600">
                  WPM: <span className="text-green-700 font-mono">{user.wpm}</span>, Accuracy: <span className="text-blue-700 font-mono">{user.accuracy}%</span>
                </span>
              </div>
              <div className="text-right font-semibold text-lg text-purple-800">
                #{user.rank || idx + 1}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Leaderboard;

