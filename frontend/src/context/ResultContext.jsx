import React, { createContext, useContext, useState } from "react";
import axios from "axios";

// Create the context
const ResultContext = createContext();

// Custom hook for easy usage
export const useResultContext = () => useContext(ResultContext);

// Axios instance with credentials
const api = axios.create({
  baseURL: `${import.meta.env.VITE_BACKEND_URL}/api/result`, // Change to your backend URL/port if needed
  withCredentials: true,
});

export const ResultProvider = ({ children }) => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  // Create a result
  const createResult = async ({ wpm, accuracy, charsTyped, date }) => {
    setLoading(true);
    try {
      const { data } = await api.post("/create", { wpm, accuracy, charsTyped, date });
      setResults((prev) => [...prev, data]);
      return data;
    } finally {
      setLoading(false);
    }
  };

  // Get all results for the user
  const getResults = async () => {
    setLoading(true);
    try {
      const { data } = await api.get("/get");
      setResults(data);
      return data;
    } finally {
      setLoading(false);
    }
  };

  const value = {
    results,
    loading,
    createResult,
    getResults,
    setResults,
  };

  return <ResultContext.Provider value={value}>{children}</ResultContext.Provider>;
};