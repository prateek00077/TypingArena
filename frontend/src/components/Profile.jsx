













import React from 'react';
import { useAppContext } from '../context/AppContext';
import { useResultContext } from '../context/ResultContext';
import { useEffect } from 'react';
const Profile = () => {
  const { user ,logout  } = useAppContext();
  const {results, getResults} = useResultContext();
  if (!user) {
    return (
      <div className="w-full h-screen flex items-center justify-center text-gray-700">
        Loading...
      </div>
    );
  }
  const {
    username ,
    email,
    avatar,
  } = user;
  let totalCharactersTyped = 0;
  for (let it of results)
  totalCharactersTyped += it.charsTyped || 0;

  let totalWPM = 0;
  for (let it of results) totalWPM += it.wpm;
  let averageWPM = results.length ? (totalWPM / results.length).toFixed(1) : 0;

  let totalAccuracy = 0;
  for (let it of results) 
  totalAccuracy += it.accuracy;
  let averageAccuracy = results.length ? (totalAccuracy / results.length).toFixed(1) : 0;
  
  useEffect(() => {
    if(user)
    getResults();
  }, [user]);
  return (
    <div
      className="w-full h-screen flex items-center justify-center m-0 bg-gray-200 px-2 pt-20 pb-4"
      style={{ boxSizing: 'border-box' }}
    >
      <div className="w-full max-w-md flex flex-col space-y-4">
        {/* Header */}
        <div className="flex items-center justify-center">
          <h1 className="text-gray-800 text-3xl font-bold">Your Impact Summary</h1>
        </div>
        <div className="flex flex-col items-center space-y-1">
  {avatar ? 
  (
    <img
      src={avatar}
      alt={username}
      className="w-16 h-16 rounded-full border-2 border-gray-800 shadow object-cover"
    />
  ) :
  (
    <div className="w-16 h-16 rounded-full border-2 border-gray-800 shadow bg-gray-400 flex items-center justify-center text-white text-xl font-bold">
      {username?.charAt(0).toUpperCase()}
    </div>
  )
  }
  
  <div className="text-center">
    <h2 className="text-lg font-bold text-gray-900">{username}</h2>
    <p className="text-xs text-gray-600">{email}</p>
  </div>
</div>


        {/* Stats */}
        <div className="grid grid-cols-2 gap-2 text-xs text-gray-800 bg-gray-50 rounded-lg p-2">
          <div className="flex flex-col items-center">
            <span className="font-medium">WPM</span>
            <span>{averageWPM}</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="font-medium">Accuracy</span>
            <span>{averageAccuracy}%</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="font-medium">Characters</span>
            <span>{totalCharactersTyped}</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="font-medium">Races</span>
            <span>{results.length}</span>
          </div>
          {/* <div className="flex flex-col items-center col-span-2">
            <span className="font-medium">Joined</span>
            <span>{joinedDate}</span>
          </div> */}
        </div>

        {/* Action Buttons */}
        <div className="space-y-1 mb-2">
          <button className="w-full py-1 text-xs rounded-lg border border-gray-500 text-gray-800 hover:bg-gray-50 transition">
            Edit Profile
          </button>
          <button className="w-full py-1 text-xs rounded-lg border border-gray-500 text-gray-800 hover:bg-gray-50 transition">
            Change Password
          </button>
          <button className="w-full py-1 text-xs rounded-lg border border-gray-500 text-gray-800 hover:bg-gray-50 transition">
            Reset Stats
          </button>
          <button className="w-full py-1 text-xs rounded-lg border border-gray-500 text-gray-800 hover:bg-gray-50 transition" onClick={logout}>
            Logout
          </button>
          <button className="w-full py-1 text-xs rounded-lg border border-red-500 text-red-500 hover:bg-red-500 hover:text-white transition">
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
