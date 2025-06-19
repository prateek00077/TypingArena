import React from 'react';
import { useAppContext } from '../context/AppContext';

const Profile = () => {
  const { userStats } = useAppContext();

  const {
    username,
    email,
    avatar,
    wpm,
    accuracy,
    totalCharactersTyped,
    raceAttended,
    joinedDate,
  } = userStats;

  return (
    <div className=" h-screen  flex items-center justify-center  mb-0 bg-gray-100 dark:bg-gray-900 px-4 py-15 ">
      <div className="w-1/2 flex flex-col bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 space-y-6 ">
        {/* Header */}
        <div className='flex items-center justify-center mt-8  '>
          <h1 className=' dark:text-white text-black text-5xl font-bold'>
            Profile
          </h1>
        </div>
        <div className="flex flex-col items-center space-y-2">
          <img
            src={avatar}
            alt="User Avatar"
            className="w-24 h-24 rounded-full border-4 border-blue-500 dark:border-blue-400 shadow-md object-cover"
          />
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{username}</h2>
            <p className="text-sm text-gray-600 dark:text-gray-300">{email}</p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 text-sm text-gray-800 dark:text-gray-200 bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
          <div className="flex flex-col items-center">
            <span className="font-medium">WPM</span>
            <span>{wpm}</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="font-medium">Accuracy</span>
            <span>{accuracy}%</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="font-medium">Characters</span>
            <span>{totalCharactersTyped}</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="font-medium">Races</span>
            <span>{raceAttended}</span>
          </div>
          <div className="flex flex-col items-center col-span-2">
            <span className="font-medium">Joined</span>
            <span>{joinedDate}</span>
          </div>
        </div>

      <div className="space-y-2 mb-6">
  <button
    className="w-full py-2 text-sm rounded-lg border border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
  >
    Edit Profile
  </button>
  <button
    className="w-full py-2 text-sm rounded-lg border border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
  >
    Change Password
  </button>
  <button
    className="w-full py-2 text-sm rounded-lg border border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
  >
    Reset Stats
  </button>
  <button
    className="w-full py-2 text-sm rounded-lg border border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
  >
    Logout
  </button>
  <button
    className="w-full py-2 text-sm rounded-lg border border-red-500 text-red-600 dark:text-red-400 transition"
  >
    Delete Account
  </button>
</div>
      </div>
    </div>
  );
};

export default Profile;
