"use client";

import { useEffect, useState } from "react";
import api from "@/utils/api"; // Axios instance
import { FaBox, FaUsers, FaChartBar } from "react-icons/fa"; // Some icons for dashboard


export default function AdminDashboard() {
    const [metrics, setMetrics] = useState({ users: 0, products: 0, orders: 0 });

    useEffect(() => {
        const fetchMetrics = async () => {
            try {
                const users = await api.get("/admin/users/count");
                const products = await api.get("/admin/products/count");
                const orders = await api.get("/admin/orders/count");

                setMetrics({
                    users: users.data.count,
                    products: products.data.count,
                    orders: orders.data.count,
                });
            } catch (error) {
                console.error("Error fetching dashboard metrics:", error);
            }
        };

        fetchMetrics();
    }, []);

    return (
        <div className="space-y-8">
            {/* Overview Section */}
            <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
                    <div className="flex items-center gap-4">
                        <FaUsers className="text-blue-600 dark:text-blue-400 text-4xl" />
                        <div>
                            <p className="text-lg font-semibold text-gray-700 dark:text-white">Users</p>
                            <p className="text-xl font-bold text-gray-900 dark:text-white">{metrics.users}</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
                    <div className="flex items-center gap-4">
                        <FaBox className="text-green-600 dark:text-green-400 text-4xl" />
                        <div>
                            <p className="text-lg font-semibold text-gray-700 dark:text-white">Products</p>
                            <p className="text-xl font-bold text-gray-900 dark:text-white">{metrics.products}</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
                    <div className="flex items-center gap-4">
                        <FaChartBar className="text-yellow-600 dark:text-yellow-400 text-4xl" />
                        <div>
                            <p className="text-lg font-semibold text-gray-700 dark:text-white">Orders</p>
                            <p className="text-xl font-bold text-gray-900 dark:text-white">{metrics.orders}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Additional Info Section */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Recent Activity</h2>
                <p className="text-gray-700 dark:text-gray-300">Here you can display some recent activities or quick stats about orders, products, or user registrations.</p>
            </div>
        </div>
    );
}
