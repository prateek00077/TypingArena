import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

// Create the context
const AppContext = createContext();

// Custom hook for easy usage
export const useAppContext = () => useContext(AppContext);

// Axios instance with credentials
const api = axios.create({
  baseURL: "http://localhost:3000/api", // Change to your backend URL
  withCredentials: true,
});

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch user profile on mount
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await api.get("/user/profile");
        setUser(data);
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  // Login
  const login = async (username, password) => {
    const { data } = await api.post("/user/login", { username, password });
    setUser(data.user);
    return data;
  };

  // Register
  const register = async (username, email, password) => {
    const { data } = await api.post("/user/register", { username, email, password });
    setUser(data.user);
    return data;
  };

  // Logout
  const logout = async () => {
    await api.post("/user/logout");
    setUser(null);
  };

  const value = {
    user,
    loading,
    login,
    register,
    logout,
    setUser,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};