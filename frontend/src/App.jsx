import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import TypingBox from './pages/TypingBox';
import Header from './pages/Header';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import RoomPage from './pages/RoomPage';
import TypingRoom from './components/TypingRoom';
import { AppContextProvider } from './context/AppContext';
import Login from './pages/Login';
import SignUp from './pages/Signup';
import { useState } from 'react';

const AppContent = () => {
  const location = useLocation();
  const hideHeader = location.pathname === '/login' || location.pathname === '/register';
  const [paragraph, setParagraph] = useState('');
  const [duration, setDuration] = useState(1);

  return (
    <div className="text-green-900">
      {!hideHeader && <Header />}
      <Routes>
        <Route path="/register" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<TypingBox />} />
        <Route path="/room" element={<RoomPage setParagraph={setParagraph} setDuration={setDuration} duration={duration} />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/typeRoom" element={<TypingRoom paragraph={paragraph} duration={duration} />} />
      </Routes>
    </div>
  );
};

const App = () => (
  <AppContextProvider>
    <Router>
      <AppContent />
    </Router>
  </AppContextProvider>
);

export default App;
