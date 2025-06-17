import { User } from 'lucide-react';
import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // 👈 Add this
import { SunIcon, MoonIcon } from '@heroicons/react/24/outline';

const Header = () => {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <header className="fixed top-0 w-full z-50 bg-gradient-to-r from-gray-900 to-gray-700 text-white shadow-lg">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo/Brand */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-indigo-500 rounded-full"></div>
            <span className="font-bold text-xl">TypingArena</span>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/" className="hover:text-indigo-300 transition-colors">Home</Link>

            <Link to="/room" className="hover:text-indigo-300 transition-colors">Room</Link>
            <Link to="/settings" className="hover:text-indigo-300 transition-colors">Settings</Link>

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
            <Link to="/profile">
              <User className="w-6 h-6  hover:text-indigo-300 cursor-pointer" />
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
