// src/context/SocketContext.js
import { createContext, useContext, useEffect, useState } from 'react';
import { io } from 'socket.io-client';

const SocketContext = createContext(null);

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const socketInstance = io(`${import.meta.env.VITE_BACKEND_URL}`); 
    setSocket(socketInstance);

    socketInstance.on('connect', () => {
      console.log("✅ Socket connected:", socketInstance.id);
    });

    socketInstance.on('disconnect', () => {
      console.log("❌ Socket disconnected");
    });

    return () => {
      socketInstance.disconnect();
    };
  }, []);

  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => useContext(SocketContext);
