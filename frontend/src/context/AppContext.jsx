import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import { useResultContext } from "./ResultContext"; // adjust path if needed

// Create the context
const AppContext = createContext();

// Custom hook for easy usage
export const useAppContext = () => useContext(AppContext);

// Axios instance with credentials
const api = axios.create({
  baseURL: "http://localhost:3000/api",
  withCredentials: true,
});

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { setResults } = useResultContext(); 

  // Fetch user profile on mount
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await api.get("/user/profile");
        setUser(data.user);
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  // Login
  const login = async (usernameOrEmail, password) => {
    try {
      const { data } = await api.post("/user/login", { username:usernameOrEmail, email:usernameOrEmail , password, });
      setUser(data.user);
      setLoading(false);
      return data;
    } catch (err) {
      console.error("Error response data:", err.response?.data);
      setError(err.response?.data?.message || "Login failed");
    }
  };

  // Register
  const register = async (username, email, password) => {
    setLoading(true)
    setError(null)
    try {
      const { data } = await api.post("/user/register", { username, email, password });
      setUser(data.user);
      setResults([]);
      return data;
    } catch (err) {
      console.error("Register error:", err.response?.data || err.message);
    }
    finally {
    setLoading(false);
  }
  };

  // Logout
  const logout = async () => {
    try {
      await api.post("/user/logout");
      setUser(null);
      setResults([]);
      navigate("/")
    } catch (err) {
      setError(err.response?.data?.message || "Logout failed");
    }
  };

  const value = {
    user,
    loading,
    error,
    login,
    register,
    logout,
    setUser,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};