import React, { useState } from 'react';
import DarkModeToggle from './DarkMode';

const Settings = () => {
const [notificationsEnabled, setNotificationsEnabled] = useState(true);

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

        {/* Notifications Section */}
        <section className="space-y-4">
        <h3 className="text-xl font-semibold text-gray-800 ">Notifications</h3>
        <div className="flex items-center justify-between">
            <span className="text-gray-700 ">Enable Notifications</span>
            <input
                type="checkbox"
                checked={notificationsEnabled}
                onChange={() => setNotificationsEnabled(!notificationsEnabled)}
                className="w-5 h-5"
            />
        </div>
        </section>

        {/* Account Section */}
        <section className="space-y-2 ">
            <h3 className="text-xl font-semibold text-gray-800 ">Account</h3>
        <div className="bg-gray-100 p-4  rounded-md">
            <p className="text-gray-900  font-medium">Suryansh Singh</p>
            <p className="text-gray-600 text-sm">singh.suryansh064@gmail.com</p>
        </div>
        <button className="w-full px-4 py-2  border rounded text-red-600  border-red-300  ">
            Delete Account
        </button>
        </section>
    </div>
    </div>
);
};

export default Settings;