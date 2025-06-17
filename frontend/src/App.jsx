import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Header from './components/Header';
import TypingBox from './components/TypingBox';
import Profile from './pages/Profile'; // 
const App = () => {
  return (
    <Router>
      <div className="text-green-900">
        <Header />
        <Routes>
          <Route path="/" element={<TypingBox />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
