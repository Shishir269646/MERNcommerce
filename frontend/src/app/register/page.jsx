"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { setUser } from "@/redux/slices/user";
import { registerUser } from "@/services/auth.service";
import toast from "react-hot-toast";

export default function RegisterPage() {
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
    });

    const router = useRouter();
    const dispatch = useDispatch();

    const handleChange = (e) =>
        setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await registerUser(form);
            dispatch(setUser(res.user));
            toast.success("Registered successfully!");
            router.push("/");
        } catch (err) {
            toast.error(err?.response?.data?.message || "Registration failed!");
        }
    };

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
                            name="name"
                            value={form.name}
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
                    <button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-300"
                    >
                        Register
                    </button>
                </form>
                <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-4">
                    Already have an account?{" "}
                    <a href="/login" className="text-blue-600 dark:text-blue-400 hover:underline">
                        Login
                    </a>
                </p>
            </div>
        </div>
    );
}
