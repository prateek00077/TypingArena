import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TypingBox from './components/TypingBox';
import Header from './components/Header';
import Profile from './components/Profile';
import Settings from './components/Settings';
import RoomPage from './components/RoomPage';
import { AppContextProvider } from './context/AppContext';
const App = () => {
  return (
      <AppContextProvider>
      <Router>
      <div className="text-green-900 ">
        <Header />
        <Routes>
          <Route path="/" element={<TypingBox />} />
          <Route path="/room" element={<RoomPage />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </div>
    </Router>
    </AppContextProvider>
    
  );
};

export default App;
