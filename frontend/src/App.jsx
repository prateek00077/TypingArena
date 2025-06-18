import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TypingBox from './components/TypingBox';
import Header from './components/Header';
import Profile from './components/Profile';
import Settings from './components/Settings';
import RoomPage from './components/Roompage';
const App = () => {
  return (
    <Router>
      <div className="text-green-900">
        <Header />
        <Routes>
          <Route path="/" element={<TypingBox />} />
          <Route path="/room" element={<RoomPage />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
