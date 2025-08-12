"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"; // ✅ Needed
import { fetchAdminMetrics } from "@/redux/adminSlice";
import { FaBox, FaUsers, FaChartBar, FaTicketAlt } from "react-icons/fa";

export default function AdminDashboard() {
    const dispatch = useDispatch();
    const { metrics, loading, error } = useSelector((state) => state.admin);

    useEffect(() => {
        dispatch(fetchAdminMetrics());
    }, [dispatch]);

    const cards = [
        {
            label: "Users",
            value: metrics.users,
            icon: <FaUsers className="text-primary text-3xl" />,
        },
        {
            label: "Products",
            value: metrics.products,
            icon: <FaBox className="text-success text-3xl" />,
        },
        {
            label: "Orders",
            value: metrics.orders,
            icon: <FaChartBar className="text-warning text-3xl" />,
        },
        {
            label: "Coupons",
            value: metrics.coupons,
            icon: <FaTicketAlt className="text-accent text-3xl" />,
        },
    ];

    return (
        <div className="p-4 md:p-6 space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {cards.map((card, index) => (
                    <div key={index} className="stat bg-base-100 shadow-md rounded-xl">
                        <div className="stat-figure">{card.icon}</div>
                        <div className="stat-title">{card.label}</div>
                        <div className="stat-value">{card.value}</div>
                    </div>
                ))}
            </div>

            <div className="bg-base-100 p-6 rounded-xl shadow-md">
                <h2 className="text-xl font-semibold mb-2">Recent Activity</h2>
                <p className="text-base-content">
                    Here you can display some recent activities or quick stats about
                    orders, products, or user registrations.
                </p>
            </div>
        </div>
    );
}
