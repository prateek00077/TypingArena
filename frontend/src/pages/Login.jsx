import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../API/auth";
import { useAppContext } from "../context/AppContext";
const Login = () => {
    const navigate = useNavigate();
    const { setUserStats } = useAppContext();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const userData = await loginUser(email, password);
            setUserStats(userData);
            navigate("/");
        } catch (error) {
            console.error("Login failed:", error);
            alert("Login failed. Please try again.");
        }
    };

    return (
        <div className="h-screen w-full flex items-center justify-center bg-gradient-to-br from-blue-100 to-purple-100 p-4">
            <div className="w-full max-w-5xl bg-white rounded-3xl shadow-2xl flex flex-col lg:flex-row overflow-hidden">
                
                {/* Left Side: Form */}
                <div className="w-full lg:w-1/2 p-8 md:p-10">
                    <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Welcome Back 👋</h2>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                                Email
                            </label>
                            <input
                                id="email"
                                type="email"
                                placeholder="john@gmail.com"
                                className="w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                                Password
                            </label>
                            <input
                                id="password"
                                type="password"
                                placeholder="********"
                                className="w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition"
                        >
                            Login
                        </button>

                        <p className="text-center text-sm text-gray-600">
                            Don’t have an account?{" "}
                            <Link to="/signup" className="text-blue-600 hover:underline font-medium">
                                Sign Up
                            </Link>
                        </p>
                    </form>
                </div>

                {/* Right Side: Image */}
                <div className="hidden lg:flex w-full lg:w-1/2 items-center justify-center bg-blue-50 p-8">
                    <div className="text-center">
                        <img
                            src="/Type.jpg"
                            alt="TypingArena Illustration"
                            className="w-80 h-80 object-contain mx-auto mb-6"
                        />
                        <h3 className="text-2xl font-bold text-gray-800">TypingArena</h3>
                        <p className="text-gray-600 mt-2">Practice and Compete with your Friends by Creating a Room</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
