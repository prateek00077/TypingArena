
import React, { useEffect, useState } from 'react';
import { SunIcon, MoonIcon } from '@heroicons/react/24/outline';

const DarkModeToggle = () => {
    const [darkMode, setDarkMode] = useState(false);

    useEffect(() => {
    // Keep dark mode persistent
    const storedMode = localStorage.getItem('theme') === 'dark';
    setDarkMode(storedMode);
    if (storedMode) document.documentElement.classList.add('dark');
}, []);

    const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    document.documentElement.classList.toggle('dark');
    localStorage.setItem('theme', newMode ? 'dark' : 'light');
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
