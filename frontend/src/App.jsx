import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import TypingBox from './pages/HomePage';
import Header from './components/Header';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import RoomPage from './pages/RoomPage';
import TypingRoom from './components/TypingRoom';
import ProtectedRoute from './components/ProtectedRoute';
import RankCard from './components/RankCard';
import SignUp from './pages/Signup';
import Login from './pages/Login';
import { useState } from 'react';

const AppContent = () => {
  const [paragraph, setParagraph] = useState('');
  const [duration, setDuration] = useState(1);

  return (
    <div className="text-green-900">
      <Header />
      <Routes>
        <Route path="/register" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<TypingBox />} />
        <Route
          path="/room"
          element={<ProtectedRoute><RoomPage setParagraph={setParagraph} setDuration={setDuration} duration={duration} /></ProtectedRoute> }
        />
        <Route path="/profile" element={<ProtectedRoute> <Profile /></ProtectedRoute>}/>
        <Route path="/settings" element={<Settings />} />
        <Route path="/typeRoom" element={<TypingRoom paragraph={paragraph} duration={duration} />} />
        <Route path="/rank" element={<ProtectedRoute><RankCard /></ProtectedRoute>} />
      </Routes>
    </div>
  );
};

const App = () => {
  return (
        <AppContent />
  );
};

export default App;
