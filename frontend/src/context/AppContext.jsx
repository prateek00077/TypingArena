import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router";

// Create the context
const AppContext = createContext();

// Custom hook for easy usage
export const useAppContext = () => useContext(AppContext);

// Axios instance with credentials
const api = axios.create({
  baseURL: "http://localhost:5000/api/user", // Change to your backend URL
  withCredentials: true,
});

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();


  // Fetch user profile on mount
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await api.get("/profile");
        // console.log("data", data);
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
  const login = async (email, password) => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await api.post("/login", {
        email, password
      })
      // console.log("login hai", data);
      setUser(data.user)
      return data;
    } catch (err) {
      console.error("Axios error:", err);
      console.error("Error response data:", err.response?.data);
      setError(err.response?.data?.message || "Login failed");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Register
  const register = async (username, email, password) => {
    setLoading(true)
    setError(null)
    try {
      const { data } = await api.post("/register", { username, email, password });
      setUser(data.user);
      return data;
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
      throw err;
    } finally {
      setLoading(false);
    }

  };

  // Logout
  const logout = async () => {
    try {
      await api.post("/logout");
      setUser(null);
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