import React from 'react';
import { useAppContext } from '../context/AppContext';
import { FaUserCircle, FaKeyboard, FaChartLine, FaCheckCircle, FaEdit } from 'react-icons/fa';

const Profile = () => {
  const { userStats } = useAppContext();

  return (
    <div className="min-h-screen pt-24 bg-gradient-to-r from-gray-100 to-green-100 px-4">
      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl p-8">
        {/* Profile Header */}
        <div className="flex items-center space-x-4">
          <FaUserCircle className="text-green-600 text-6xl" />
          <div>
            <h2 className="text-2xl font-bold text-gray-800">{userStats.username}</h2>
            <p className="text-gray-500">{userStats.email}</p>
          </div>
        </div>

        {/* Stats Section */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700">
          <div className="flex items-center space-x-3 p-4 bg-green-50 rounded-lg shadow-sm">
            <FaChartLine className="text-green-500 text-xl" />
            <span><strong>WPM:</strong> {userStats.wpm}</span>
          </div>
          <div className="flex items-center space-x-3 p-4 bg-green-50 rounded-lg shadow-sm">
            <FaCheckCircle className="text-green-500 text-xl" />
            <span><strong>Accuracy:</strong> {userStats.accuracy}%</span>
          </div>
          <div className="flex items-center space-x-3 p-4 bg-green-50 rounded-lg shadow-sm">
            <FaKeyboard className="text-green-500 text-xl" />
            <span><strong>Total Characters:</strong> {userStats.totalCharactersTyped}</span>
          </div>
          <div className="flex items-center space-x-3 p-4 bg-green-50 rounded-lg shadow-sm">
            <FaKeyboard className="text-green-500 text-xl" />
            <span><strong>Races Attended:</strong> {userStats.raceAttended}</span>
          </div>
        </div>

        {/* Edit Button */}
        {/* <div className="mt-6 text-right">
          <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center space-x-2">
            <FaEdit />
            <span>Edit Profile</span>
          </button>
        </div> */}
      </div>
    </div>
  );
};

export default Profile;
