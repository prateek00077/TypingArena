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
    <div className="flex mt-[40px] justify-center items-center h-screen bg-gray-200 dark:bg-gray-900">
      <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg max-w-xl space-y-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 text-center">Profile</h2>

        {/* User Info */}
        <div className="flex flex-col items-center space-y-4">
          <img
            src={avatar}
            alt="User Avatar"
            className="w-20 h-20 rounded-full shadow-lg"
          />
          <div className="text-center">
            <p className="text-xl font-semibold text-gray-900 dark:text-gray-100">{username}</p>
            <p className="text-sm text-gray-600 dark:text-gray-300">{email}</p>
          </div>
        </div>

        {/* Additional Stats */}
        <div className="justify-center items-center flex dark:bg-gray-800">
          <div className="space-y-4 text-center">
            <div className="flex justify-between items-center">
              <p className="text-sm font-medium text-gray-800 dark:text-gray-200">WPM:</p>
              <p className="text-gray-700 dark:text-gray-300">{wpm}</p>
            </div>
            <div className="flex justify-between items-center">
              <p className="text-sm font-medium text-gray-800 dark:text-gray-200">Accuracy:</p>
              <p className="text-gray-700 dark:text-gray-300">{accuracy}</p>
            </div>
            <div className="flex justify-between items-center">
              <p className="text-sm font-medium text-gray-800 dark:text-gray-200">Total Characters Typed:</p>
              <p className="text-gray-700 dark:text-gray-300">{totalCharactersTyped}</p>
            </div>
            <div className="flex justify-between items-center">
              <p className="text-sm font-medium text-gray-800 dark:text-gray-200">Races Attended:</p>
              <p className="text-gray-700 dark:text-gray-300">{raceAttended}</p>
            </div>
            <div className="flex justify-between items-center">
              <p className="text-sm font-medium text-gray-800 dark:text-gray-200">Joined At:</p>
              <p className="text-gray-700 dark:text-gray-300">{joinedDate}</p>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="space-y-3">
          <button className="w-full px-4 py-2 border rounded text-gray-800 dark:text-gray-200 border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700">
            Edit Profile
          </button>
          <button className="w-full px-4 py-2 border rounded text-gray-800 dark:text-gray-200 border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700">
            Change Password
          </button>
          <button className="w-full px-4 py-2 border rounded text-gray-800 dark:text-gray-200 border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700">
            Reset Typing Stats
          </button>
          <button className="w-full px-4 py-2 border rounded text-gray-800 dark:text-gray-200 border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700">
            Logout
          </button>
          <button className="w-full px-4 py-2 border rounded text-red-600 dark:text-red-400 border-red-300 dark:border-red-600 hover:bg-red-100 dark:hover:bg-red-700">
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;