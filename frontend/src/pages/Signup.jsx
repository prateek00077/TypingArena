import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";


const SignUp = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const {register} = useAppContext();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // await signupUser(username, email, password);
            const response = await register(username, email, password);
            navigate("/login");
        } catch (error) {
            console.error("Signup failed:", error);
            alert("Signup failed. Please try again.");
        }
    };

    return (
        <div className="h-screen w-full flex items-center justify-center bg-gradient-to-br from-purple-100 to-blue-100 p-4">
            <div className="w-full max-w-5xl bg-white rounded-3xl shadow-2xl flex flex-col lg:flex-row overflow-hidden">

                {/* Left Side: Form */}
                <div className="w-full lg:w-1/2 p-8 md:p-16">
                    <div className="mb-4 text-center">
                        <h1 className="text-3xl font-bold text-gray-800">Create Account</h1>
                    </div>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
                                User Name
                            </label>
                            <input
                                id="username"
                                type="text"
                                placeholder="JohnDoe"
                                className="w-full px-4 py-3 border border-black rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                                Email
                            </label>
                            <input
                                id="email"
                                type="email"
                                placeholder="john@gmail.com"
                                className="w-full px-4 py-3  border border-black rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
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
                                className="w-full px-4 py-3 border border-black rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition"
                        >
                            Create Account
                        </button>

                        <p className="text-center text-sm text-gray-600">
                            Already have an account?{" "}
                            <Link to="/login" className="text-blue-600 hover:underline font-medium">
                                Sign In
                            </Link>
                        </p>
                    </form>
                </div>

                {/* Right Side: Image and CTA */}
                <div className="hidden lg:flex w-full lg:w-1/2 items-center justify-center bg-blue-50 p-8">
                    <div className="text-center">
                        <img
                            src="/Type.jpg"
                            alt="Join competition illustration"
                            className="w-80 h-80 object-contain mx-auto mb-6 rounded-2xl"
                        />
                        <h3 className="text-2xl font-bold text-gray-800">TypingArena</h3>
                        <p className="text-gray-600 mt-2">Compete with friends by creating a room and typing fast!</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUp;