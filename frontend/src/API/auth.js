import axios from "axios";

const API = axios.create({
    baseURL: "http://localhost:3000/api",
});

// Login function
export const loginUser = async (email, password) => {
    const res = await API.post("user/login", { email, password });
    return res.data;
};

// Signup function
export const signupUser = async (username, email, password) => {
    const res = await API.post("user/register", { username, email, password });
    return res.data;
};
