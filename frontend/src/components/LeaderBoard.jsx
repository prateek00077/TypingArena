import React from 'react';

const Leaderboard = ({ users }) => (
    <div className="bg-gray-100 rounded-lg shadow p-0  flex flex-col h-[560px]">
    <div className="sticky top-0 z-10 bg-gray-100 rounded-lg">
        <h3 className="text-3xl font-bold text-gray-800 py-4 mb-0 text-center border-b border-gray-200">
        Users Leaderboard
        </h3>
    </div>
    <div className="flex-1 flex flex-col items-center gap-4 w-full overflow-y-auto py-4">
        {users.map((user, idx) => (
        <div
            key={idx + user.name}
            className="w-4/5 mx-auto flex items-center gap-4 bg-white rounded-xl  shadow-md p-4 border border-gray-500"
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

export default Leaderboard;