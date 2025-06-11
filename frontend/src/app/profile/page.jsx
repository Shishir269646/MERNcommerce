"use client";

import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "@/lib/api";
import { toast } from "react-hot-toast";
import { setUser } from "@/redux/userSlice";

export default function ProfilePage() {
    const { user } = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const router = useRouter();

    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    useEffect(() => {
        if (!user) {
            router.push("/login");
        } else {
            setForm((prev) => ({
                ...prev,
                name: user.name,
                email: user.email,
            }));
        }
    }, [user, router]);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (form.password && form.password !== form.confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }

        try {
            const { data } = await axios.put("/users/profile", {
                name: form.name,
                email: form.email,
                password: form.password,
            });

            dispatch(setUser(data));
            toast.success("Profile updated successfully");
        } catch (err) {
            toast.error(err.response?.data?.message || "Update failed");
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-6">
            <div className="max-w-xl mx-auto bg-white dark:bg-gray-800 shadow rounded-lg p-6">
                <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
                    My Profile
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            Name
                        </label>
                        <input
                            type="text"
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            className="mt-1 w-full px-4 py-2 border rounded-md dark:bg-gray-700 dark:text-white"
                            required
                        />
                    </div>

                    <div>
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            Email
                        </label>
                        <input
                            type="email"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            className="mt-1 w-full px-4 py-2 border rounded-md dark:bg-gray-700 dark:text-white"
                            required
                        />
                    </div>

                    <div>
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            New Password
                        </label>
                        <input
                            type="password"
                            name="password"
                            value={form.password}
                            onChange={handleChange}
                            className="mt-1 w-full px-4 py-2 border rounded-md dark:bg-gray-700 dark:text-white"
                            placeholder="Leave blank to keep current"
                        />
                    </div>

                    <div>
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            Confirm New Password
                        </label>
                        <input
                            type="password"
                            name="confirmPassword"
                            value={form.confirmPassword}
                            onChange={handleChange}
                            className="mt-1 w-full px-4 py-2 border rounded-md dark:bg-gray-700 dark:text-white"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md"
                    >
                        Update Profile
                    </button>
                </form>
            </div>
        </div>
    );
}
