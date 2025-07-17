import React, { createContext, useContext, useState } from "react";
import axios from "axios";

// Create the context
const RoomContext = createContext();

// Custom hook for easy usage
export const useRoomContext = () => useContext(RoomContext);

// Axios instance with credentials
const api = axios.create({
  baseURL: "http://localhost:3000/api/room", // Change to your backend URL/port if needed
  withCredentials: true,
});

export const RoomProvider = ({ children }) => {
  const [room, setRoom] = useState(null);
  const [loading, setLoading] = useState(false);

  // Create a room
  const createRoom = async (paragraph, duration = 1) => {
    setLoading(true);
    try {
      const { data } = await api.post("/create", { paragraph, duration });
      setRoom(data.newRoom);
      return data;
    } finally {
      setLoading(false);
    }
  };

  // Join a room
  const joinRoom = async (roomId) => {
    setLoading(true);
    try {
      const { data } = await api.post("/join", { roomId },);
      setRoom(data.room);
      return data;
    } finally {
      setLoading(false);
    }
  };

  // Start a room
  const startRoom = async (roomId) => {
    setLoading(true);
    try {
      const { data } = await api.post("/start", { roomId });
      setRoom(data.room);
      return data;
    } finally {
      setLoading(false);
    }
  };

  // Finish a room
  const finishRoom = async (roomId) => {
    setLoading(true);
    try {
      const { data } = await api.post("/finish", { roomId });
      setRoom(data.room);
      return data;
    } finally {
      setLoading(false);
    }
  };

  // Leave a room
  const leaveRoom = async (roomId) => {
    setLoading(true);
    try {
      const { data } = await api.delete("/leave", { data: { roomId } });
      setRoom(null);
      return data;
    } finally {
      setLoading(false);
    }
  };

  // Get room details
  const getRoomDetails = async (roomId) => {
    setLoading(true);
    try {
      const { data } = await api.post("/getdetails",  { roomId } );
      setRoom(data.room);
      return data;
    } finally {
      setLoading(false);
    }
  };

  const getAllRooms = async () => {
    setLoading(true);
    try {
      const { data } = await api.get("/getallrooms");
      return data.rooms;
    } catch (err) {
      console.error("Error fetching all rooms", err);
      return [];
    } finally {
      setLoading(false);
    }
  };

  // Delete a room
const deleteRoom = async (roomId) => {
  setLoading(true);
  try {
    const { data } = await api.delete(`/delete/${roomId}`);
    return data;
  } catch (err) {
    console.error("Failed to delete room", err);
    throw err;
  } finally {
    setLoading(false);
  }
};


  const value = {
    room,
    loading,
    createRoom,
    joinRoom,
    startRoom,
    finishRoom,
    leaveRoom,
    getRoomDetails,
    setRoom,
    getAllRooms,
    deleteRoom,
  };

  return <RoomContext.Provider value={value}>{children}</RoomContext.Provider>;
};