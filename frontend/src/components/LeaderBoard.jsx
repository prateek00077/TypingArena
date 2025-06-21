import React from 'react';

const Leaderboard = ({ users }) => (
<div className="bg-gray-100 rounded-lg shadow p-6 flex-1 overflow-y-auto">
    <h3 className="text-3xl font-bold text-gray-800 mb-6 text-center">Users Leaderboard</h3>
    <div className="flex flex-col items-center gap-4 w-full">
    {users.map((user, idx) => (
        <div
            key={idx + user.name}
            className="w-4/5 mx-auto flex items-center gap-4 bg-white rounded-xl shadow-md p-4 border border-gray-500"
        >
        <div className="flex-1">
            <div className="font-bold text-gray-800">{user.name}</div>
        </div>
        <div className="font-mono text-lg text-green-700">{user.rank} Rank</div>
        </div>
    ))}
    </div>
</div>
);

export default Leaderboard