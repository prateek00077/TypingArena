import React, { useState } from 'react';
import { SunIcon, MoonIcon } from '@heroicons/react/24/outline';

const Header = () => {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <header className="bg-gradient-to-r from-gray-900 to-gray-700 text-white shadow-lg">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo/Brand */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-indigo-500 rounded-full"></div>
            <span className="font-bold text-xl">TypingArena</span>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <a href="#" className="hover:text-indigo-300 transition-colors">Home</a>
            <a href="#" className="hover:text-indigo-300 transition-colors">Profile</a>
            <a href="#" className="hover:text-indigo-300 transition-colors">Room</a>
            <a href="#" className="hover:text-indigo-300 transition-colors">Settings</a>
            
            {/* Dark Mode Toggle */}
            <button 
              onClick={toggleDarkMode}
              className="flex items-center space-x-1 hover:text-indigo-300 transition-colors"
            >
              {darkMode ? (
                <>
                  <SunIcon className="w-5 h-5" />
                  <span>Light Mode</span>
                </>
              ) : (
                <>
                  <MoonIcon className="w-5 h-5" />
                  <span>Dark Mode</span>
                </>
              )}
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;