import React from 'react';
import DarkModeToggle from '../components/DarkMode';
import { Link } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';

const Settings = () => {
    const { user, logout } = useAppContext();
    const isLoggedIn = user && user.username;

    return (
    <div className="h-screen bg-gray-200 dark:bg-gray-900 flex justify-center items-center">
        <div className="w-1/2 mx-auto p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md  space-y-6">
        <h2 className="text-3xl font-semibold text-gray-900 dark:text-white">Settings</h2>

        {/* Appearance Section */}
        <section className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">Appearance</h3>
            <div className="flex items-center justify-between">
            <span className="text-gray-700 dark:text-gray-300">Dark Mode</span>
            <DarkModeToggle />
            </div>
        </section>

        {/* Account Section */}
        <section className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">Account</h3>
            <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-md">
            <p className="text-gray-900 dark:text-white font-medium">
                {isLoggedIn ? user.username : 'Guest User'}
            </p>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
                {isLoggedIn ? user.email : 'Not logged in'}
            </p>
        </div>

            {!isLoggedIn && (
            <button className="w-full px-4 py-2 border-2 rounded text-blue-600 border-blue-300 dark:text-blue-400 dark:border-blue-500">
                <Link to="/login">Login</Link>
            </button>
            )}

            <button
            className="w-full px-4 py-2 border-2 rounded text-red-600 border-red-300 dark:text-red-400 dark:border-red-500"
            onClick={logout}
            >
            Logout
            </button>

            <button
            className="w-full px-4 py-2 border-2 rounded text-red-600 border-red-300 dark:text-red-400 dark:border-red-500"
            onClick={logout}
            >
            Delete Account
            </button>
        </section>
        </div>
    </div>
);
};

export default Settings;
