import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import {ToastContainer} from 'react-toastify';
import TypingBox from './components/TypingBox';
import 'react-toastify/dist/ReactToastify.css';
import Header from './components/Header';
import Profile from './components/Profile';
import Settings from './components/Settings';
import RoomPage from './components/Roompage';
import TypingRoom from './components/TypingRoom';
// import { AppContextProvider } from './context/AppContext';
// import ProtectedRoute from './components/ProtectedRoute';
import SignUp from './pages/Signup';
import Login from './pages/Login';

import { useState } from 'react';
import { AppProvider } from './context/AppContext';

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
        <Route
          path="/room"
          element={<RoomPage setParagraph={setParagraph} setDuration={setDuration} duration={duration} />}
        />
        <Route path="/profile" element={ <Profile />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/typeRoom" element={<TypingRoom paragraph={paragraph} duration={duration} />} />
      </Routes>
    </div>
  );
};

const App = () => {
  return (
    <AppProvider>
      <AppContent />
      <ToastContainer position="bottom-right" autoClose={2000} />
    </AppProvider>
  );
};

export default App;
