import React, { useContext } from 'react';
import DarkModeToggle from './DarkMode'; // Import your Dark Mode component
import { Link, useNavigate } from 'react-router-dom'
import { useAppContext } from '../context/AppContext';

const Header = () => {
  const navigate = useNavigate(); 
  const {user} = useAppContext();
  const handleProfileClick = () => {
    if (user) {
      navigate("/profile");
    } else {
      navigate("/login");
    }
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

            {/* <Link to="/profile" className="hover:text-indigo-300 transition-colors">Profile</Link> */}


            <div onClick={handleProfileClick} className="hover:text-indigo-300 cursor-pointer transition-colors">
             {user ? user.username : "Login"}
            </div>

            <Link to="/room" className="hover:text-indigo-300 transition-colors">Room</Link>
            <Link to="/settings" className="hover:text-indigo-300 transition-colors">Settings</Link>
            {/* Dark Mode Toggle */}
            <DarkModeToggle /> {/* Use your Dark Mode component here */}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
