"use client";

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "@/lib/api"; // adjust if your axios instance is elsewhere
import { useRouter } from "next/navigation";

export default function OrderHistoryPage() {
    const router = useRouter();
    const { user } = useSelector((state) => state.user);
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user) {
            router.push("/login");
        } else {
            const fetchOrders = async () => {
                try {
                    const res = await axios.get("/orders/my");
                    setOrders(res.data);
                } catch (error) {
                    console.error("Failed to fetch orders:", error);
                } finally {
                    setLoading(false);
                }
            };
            fetchOrders();
        }
    }, [user, router]);

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-10 px-4">
            <div className="max-w-5xl mx-auto bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                    Order History
                </h1>

                {loading ? (
                    <p className="text-gray-600 dark:text-gray-300">Loading orders...</p>
                ) : orders.length === 0 ? (
                    <p className="text-gray-600 dark:text-gray-300">
                        You have no orders yet.
                    </p>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-300">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-200 dark:bg-gray-700 dark:text-gray-300">
                                <tr>
                                    <th scope="col" className="px-6 py-3">Order ID</th>
                                    <th scope="col" className="px-6 py-3">Date</th>
                                    <th scope="col" className="px-6 py-3">Total</th>
                                    <th scope="col" className="px-6 py-3">Status</th>
                                    <th scope="col" className="px-6 py-3">Paid</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders.map((order) => (
                                    <tr key={order._id} className="bg-white dark:bg-gray-800 border-b">
                                        <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">
                                            {order._id.slice(0, 8)}...
                                        </td>
                                        <td className="px-6 py-4">
                                            {new Date(order.createdAt).toLocaleDateString()}
                                        </td>
                                        <td className="px-6 py-4">${order.totalPrice.toFixed(2)}</td>
                                        <td className="px-6 py-4 capitalize">{order.status}</td>
                                        <td className="px-6 py-4">
                                            {order.isPaid ? (
                                                <span className="text-green-600 font-medium">Yes</span>
                                            ) : (
                                                <span className="text-red-500 font-medium">No</span>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}
