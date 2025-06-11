"use client"; 

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { setUser } from "@/redux/slices/user";
import { loginUser } from "@/services/auth.service";
import toast from "react-hot-toast";

export default function LoginPage() {
    const [form, setForm] = useState({ email: "", password: "" });
    const router = useRouter();
    const dispatch = useDispatch();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await loginUser(form);
            dispatch(setUser(res.user));
            toast.success("Logged in successfully!");
            router.push("/"); // Redirect to home or dashboard
        } catch (err) {
            toast.error(err?.response?.data?.message || "Login failed!");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
            <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-xl shadow-md p-8">
                <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white text-center">
                    Login to Your Account
                </h2>
                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="block mb-1 text-gray-600 dark:text-gray-300">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                    <div>
                        <label className="block mb-1 text-gray-600 dark:text-gray-300">Password</label>
                        <input
                            type="password"
                            name="password"
                            value={form.password}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-300"
                    >
                        Login
                    </button>
                </form>
                <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-4">
                    Don't have an account? <a href="/register" className="text-blue-600 dark:text-blue-400 hover:underline">Register</a>
                </p>
            </div>
        </div>
    );
}
