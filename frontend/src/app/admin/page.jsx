"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaBox, FaUsers, FaChartBar, FaTicketAlt } from "react-icons/fa";

// Import the correct thunk actions from each slice
import { getAllUsers } from "@/redux/userSlice";
import { getProducts } from "@/redux/productSlice";
import { getAllOrdersThunk } from "@/redux/orderSlice";
import { fetchCoupons } from "@/redux/couponSlice";

export default function AdminDashboard() {
    const dispatch = useDispatch();

    // Select data from each slice
    const { users, loading: usersLoading, error: usersError } = useSelector((state) => state.user);
    const { products, loading: productsLoading, error: productsError } = useSelector((state) => state.product);
    const { orders, loading: ordersLoading, error: ordersError } = useSelector((state) => state.order);
    const { coupons, loading: couponsLoading, error: couponsError } = useSelector((state) => state.coupon);

    // Fetch all necessary data on component mount
    useEffect(() => {
        dispatch(getAllUsers());
        dispatch(getProducts());
        dispatch(getAllOrdersThunk());
        dispatch(fetchCoupons());
    }, [dispatch]);

    // Combine loading and error states from all slices
    const isLoading = usersLoading || productsLoading || ordersLoading || couponsLoading;
    const componentError = usersError || productsError || ordersError || couponsError;

    // Calculate metrics from the length of the arrays
    const metrics = {
        users: users?.length ?? 0,
        products: products?.length ?? 0,
        orders: orders?.length ?? 0,
        coupons: coupons?.length ?? 0,
    };

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
            {/* Loading and Error States */}
            {isLoading && <p className="text-info">Loading dashboard data...</p>}
            {componentError && <p className="text-error">Error loading data: {componentError}</p>}

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {cards.map((card, index) => (
                    <div key={index} className="stat bg-base-100 shadow-md rounded-xl">
                        <div className="stat-figure">{card.icon}</div>
                        <div className="stat-title">{card.label}</div>
                        <div className="stat-value">{card.value}</div>
                    </div>
                ))}
            </div>

            {/* Recent Activity Section */}
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
