"use client";

import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import Link from "next/link";
import { getAllOrdersThunk } from "@/redux/orderSlice";
import Loader from "@/components/ui/Loader";

export default function OrdersPage() {
    const dispatch = useDispatch();

    const { orders = [], loading = false, error = null } = useSelector((state) => state.order || {});




    useEffect(() => {
        dispatch(getAllOrdersThunk());
    }, [dispatch]);

    const handleRefresh = () => {
        dispatch(getAllOrdersThunk());
    };



    return (
        <div className="p-4">
            <div className="flex items-center justify-between mb-4">
                <h1 className="text-2xl font-semibold">Orders</h1>
                <div>
                    <button onClick={handleRefresh} className="btn btn-sm btn-outline">
                        Refresh
                    </button>
                </div>
            </div>

            {loading && <div className="alert"><Loader /></div>}
            {error && <div className="alert alert-error">{error.message || error}</div>}

            {orders.length === 0 && !loading && (
                <div className="alert">No orders found.</div>
            )}

            {/* Table for desktop */}
            <div className="hidden md:block">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>User</th>
                            <th>Date</th>
                            <th>Total</th>
                            <th>Paid</th>
                            <th>Delivered</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order) => (
                            <tr key={order._id}>
                                <td className="font-mono text-sm">{order._id}</td>
                                <td>{order.user?.username}</td>
                                <td>{new Date(order.createdAt).toLocaleString()}</td>
                                <td>$ {order.totalPrice?.toFixed(2)}</td>
                                <td>
                                    {order.isPaid ? (
                                        <span className="badge badge-success">Yes</span>
                                    ) : (
                                        <span className="badge badge-outline">No</span>
                                    )}
                                </td>
                                <td>
                                    {order.isDelivered ? (
                                        <span className="badge badge-success">Yes</span>
                                    ) : (
                                        <span className="badge badge-outline">No</span>
                                    )}
                                </td>
                                <td>
                                    <Link href={`/admin/orders/${order._id}`} className="btn btn-sm btn-primary">
                                        View / Edit
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Cards for mobile */}
            <div className="md:hidden grid gap-3">
                {orders.map((order) => (
                    <div key={order._id} className="card bg-base-100 shadow">
                        <div className="card-body">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h2 className="card-title text-sm font-mono">{order._id}</h2>
                                    <p className="text-sm">{order.user?.name || order.user?._id}</p>
                                    <p className="text-xs opacity-70">{new Date(order.createdAt).toLocaleString()}</p>
                                </div>
                                <div className="text-right">
                                    <p className="font-semibold">$ {order.totalPrice?.toFixed(2)}</p>
                                </div>
                            </div>

                            <div className="flex gap-2 mt-3">
                                <span className={`badge ${order.isPaid ? "badge-success" : "badge-outline"}`}>
                                    {order.isPaid ? "Paid" : "Not Paid"}
                                </span>
                                <span className={`badge ${order.isDelivered ? "badge-success" : "badge-outline"}`}>
                                    {order.isDelivered ? "Delivered" : "Pending"}
                                </span>
                            </div>

                            <div className="card-actions justify-end mt-4">
                                <Link href={`/orders/${order._id}`} className="btn btn-sm btn-primary">
                                    View / Edit
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
