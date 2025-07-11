import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AppProvider } from './context/AppContext.jsx';
import { ResultProvider } from './context/ResultContext.jsx';
import { RoomProvider } from './context/RoomContext.jsx';
import { BrowserRouter } from 'react-router';
createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <ResultProvider>
      <RoomProvider>
        <AppProvider>
          <App />
        </AppProvider>
      </RoomProvider>
    </ResultProvider>
  </BrowserRouter>
);
