import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TypingBox from './components/TypingBox';
import Header from './components/Header';
import Profile from './components/Profile';
import Settings from './components/Settings';
import RoomPage from './components/Roompage';
import TypingRoom from './components/TypingRoom';
import { AppContextProvider } from './context/AppContext';
import { useState } from 'react';
const App = () => {
  const [paragraph, setParagraph] = useState('');
  const [duration, setDuration] = useState(1);
  return (
      <AppContextProvider>
      <Router>
      <div className="text-green-900">
        <Header />
        <Routes>
          <Route path="/" element={<TypingBox />} />
          <Route path="/room" element={<RoomPage setParagraph={setParagraph}
          setDuration = {setDuration} duration={duration}/>} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/typeRoom" element = {<TypingRoom  paragraph={paragraph} duration={duration}/>}/>
        </Routes>
      </div>
    </Router>
    </AppContextProvider>
    
  );
};

export default App;
