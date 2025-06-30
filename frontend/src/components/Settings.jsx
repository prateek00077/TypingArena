import React, { useState } from 'react';
import DarkModeToggle from './DarkMode';
import { Link } from 'react-router';
import { useAppContext } from '../context/AppContext';
const Settings = () => {
        const { userStats } = useAppContext();
        const isLoggedIn = userStats && userStats.username;
return (
    <div className="h-screen  bg-gray-200  flex justify-center items-center">
    <div className="w-1/2  mx-auto p-6 bg-white  rounded-xl shadow-md space-y-6">
        <h2 className="text-3xl font-semibold items-center text-gray-900 ">Settings</h2>

        {/* Appearance Section */}
        <section className="space-y-4">
        <h3 className="text-xl font-semibold text-gray-800 ">Appearance</h3>
        <div className="flex items-center justify-between">
            <span className="text-gray-700 ">Dark Mode</span>
            <DarkModeToggle />
        </div>
        </section>


        {/* Account Section */}
        <section className="space-y-4 ">
            <h3 className="text-xl font-semibold text-gray-800 ">Account</h3>
        <div className="bg-gray-100 p-4  rounded-md">
            <p className="text-gray-900  font-medium"> {isLoggedIn ? userStats.username : 'Guest User'}</p>
            <p className="text-gray-600 text-sm">{isLoggedIn ? userStats.email : 'Not logged in'}</p>
        </div>
        {!isLoggedIn && (
            <button className="w-full px-4 py-2 border-2 rounded text-blue-600 border-blue-300">
                <Link to="/login">Login</Link>
            </button>
        )}
        <button className="w-full px-4 py-2   border-2 rounded text-red-600  border-red-300  ">
            Delete Account
        </button>
        </section>
    </div>
    </div>
);
};

export default Settings;