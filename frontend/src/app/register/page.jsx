'use client';

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { registerUser, clearUserError } from "@/redux/userSlice";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export default function RegisterPage() {
    const [form, setForm] = useState({
        username: "",
        email: "",
        password: "",
        isAdmin: false,
    });

    const router = useRouter();
    const dispatch = useDispatch();
    const { user, loading, error, isAuthenticated } = useSelector((state) => state.user);


    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch(registerUser(form));
    };

    useEffect(() => {
        if (isAuthenticated && user) {
            toast.success("Registered successfully!");
            setTimeout(() => {
                router.push("/");
            }, 2000);
        }
    }, [isAuthenticated, user, router]);



    useEffect(() => {
        if (error) {
            toast.error(error);
        }
        return () => {
            dispatch(clearUserError());
        };
    }, [error, dispatch]);

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
            <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-xl shadow-md p-8">
                <h2 className="text-2xl font-bold mb-6 text-center text-gray-800 dark:text-white">
                    Create Your Account
                </h2>
                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="block mb-1 text-gray-600 dark:text-gray-300">Name</label>
                        <input
                            type="text"
                            name="username"
                            value={form.username}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block mb-1 text-gray-600 dark:text-gray-300">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block mb-1 text-gray-600 dark:text-gray-300">Password</label>
                        <input
                            type="password"
                            name="password"
                            value={form.password}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            name="isAdmin"
                            checked={form.isAdmin}
                            onChange={handleChange}
                            className="checkbox"
                        />
                        <label className="text-gray-600 dark:text-gray-300">Are you Admin?</label>
                    </div>
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-300"
                    >
                        {loading ? "Registering..." : "Register"}
                    </button>
                </form>
                <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-4">
                    Already have an account?{" "}
                    <a href="/login" className="text-blue-600 dark:text-blue-400 hover:underline">
                        Login
                    </a>
                </p>
            </div>

            {/* Toast container */}
            <ToastContainer position="top-right" autoClose={3000} />
        </div>
    );
}
