"use client";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, clearUserError } from "@/redux/userSlice";
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Login() {
    const [isHovered, setIsHovered] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const dispatch = useDispatch();
    const router = useRouter();

    const { user, isAuthenticated, loading, error } = useSelector((state) => state.user);

    // ✅ Redirect after login
    useEffect(() => {
        if (isAuthenticated && user) {
            toast.success("Login successful!");

            setTimeout(() => {
                const isAdmin = user?.isAdmin === true;
                router.replace(isAdmin ? "/admin" : "/");
            }, 1000);
        }
    }, [isAuthenticated, user, router]);

    // ✅ Clear error on unmount
    useEffect(() => {
        return () => {
            dispatch(clearUserError());
        };
    }, [dispatch]);

    const handleLogin = (e) => {
        e.preventDefault();
        dispatch(loginUser({ email, password }));
    };

    return (
        <div className="min-h-screen bg-primary flex items-center justify-center px-4">
            <div
                className="relative w-full max-w-4xl h-[500px] bg-base-100 shadow-2xl rounded-xl overflow-hidden flex transition-all duration-700"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                {/* Left Panel */}
                <div
                    className={`absolute top-0 left-0 h-full w-1/2 bg-primary text-white p-10 flex flex-col justify-center items-center transition-all duration-700 ${isHovered ? "translate-x-0 opacity-100" : "-translate-x-full opacity-0"
                        }`}
                >
                    <div className="text-center">
                        <h2 className="text-3xl font-bold mb-2">Join the Revolution</h2>
                        <p className="text-sm opacity-90 mb-6">
                            Subscribe for exclusive content & features
                        </p>
                        <button className="btn btn-outline btn-sm border-white text-white">
                            THE INVINCIBLE KREATOR
                        </button>
                        <p className="text-xs mt-3">Code by Manjirul Islam</p>
                    </div>
                </div>

                {/* Login Form */}
                <div className="ml-auto w-full md:w-1/2 h-full flex items-center justify-center p-8 z-10">
                    <form className="w-full max-w-sm space-y-4" onSubmit={handleLogin}>
                        <h1 className="text-2xl font-bold text-center text-primary">Login</h1>

                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="input input-bordered w-full"
                        />

                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="input input-bordered w-full"
                        />

                        {error && <p className="text-error text-sm">{error}</p>}

                        <button
                            type="submit"
                            disabled={loading}
                            className="btn btn-primary w-full"
                        >
                            {loading ? "Logging in..." : "Login"}
                        </button>

                        <p className="text-sm text-center">
                            Forgot Email or Password?
                        </p>
                    </form>
                </div>
            </div>
            <ToastContainer position="top-center" autoClose={2000} />
        </div>
    );
}
