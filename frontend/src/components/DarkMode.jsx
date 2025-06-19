import React, { useState } from 'react';
import { SunIcon, MoonIcon } from '@heroicons/react/24/outline';
import { useAppContext } from '../context/AppContext.jsx';
const DarkModeToggle = () => {
    const [darkMode, setDarkMode] = useState(false);

    const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    document.documentElement.classList.toggle('dark', newMode);
};

return (
    <div className="flex items-center justify-between">
        <button
        onClick={toggleDarkMode}
        className="flex items-center space-x-2 text-sm hover:text-indigo-400"
        >
        {darkMode ? (
        <>
            <SunIcon className="w-5 h-5 text-yellow-400" />
            <span>Light Mode</span>
        </>
        ) : (
        <>
            <MoonIcon className="w-5 h-5 text-blue-500" />
            <span>Dark Mode</span>
        </>
        )}
    </button>
    </div>
);
};

export default DarkModeToggle;