// Place these files in an App Router Next.js project
// 1) app/user/orders/page.jsx   -> User's orders list (responsive)
// 2) app/user/orders/[id]/page.jsx -> Order detail page for the user

/* -----------------------------
   File: app/user/orders/page.jsx
------------------------------ */

"use client";

import React, { useEffect } from 'react';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { getMyOrdersThunk } from '@/redux/orderSlice';
import Loader from '@/components/Loader';

export default function UserOrdersPage() {
    const dispatch = useDispatch();
    const { orders, loading, error } = useSelector((state) => state.order);

    useEffect(() => {
        dispatch(getMyOrdersThunk());
    }, [dispatch]);

    const handleRefresh = () => {
        dispatch(getMyOrdersThunk());
    };

    return (
        <div className="p-4">
            <div className="flex items-center justify-between mb-4">
                <h1 className="text-2xl font-semibold">My Orders</h1>
                <button onClick={handleRefresh} className="btn btn-sm btn-ghost">
                    Refresh
                </button>
            </div>

            {loading && <div className="alert"><Loader /></div>}
            {error && <div className="alert alert-error">{error}</div>}

            {/* Desktop table */}
            <div className="hidden md:block">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th>Order ID</th>
                            <th>Date</th>
                            <th>Total</th>
                            <th>Paid</th>
                            <th>Delivered</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map(order => (
                            <tr key={order._id}>
                                <td className="font-mono text-sm">{order._id}</td>
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
                                    <Link href={`/orders/${order._id}`} className="btn btn-sm btn-primary">
                                        View
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Mobile cards */}
            <div className="grid gap-3 md:hidden">
                {orders.map(order => (
                    <div key={order._id} className="card bg-base-100 shadow">
                        <div className="card-body">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h2 className="card-title text-sm font-mono">{order._id}</h2>
                                    <p className="text-sm">{new Date(order.createdAt).toLocaleString()}</p>
                                </div>
                                <div className="text-right">
                                    <p className="font-semibold">$ {order.totalPrice?.toFixed(2)}</p>
                                </div>
                            </div>

                            <div className="flex gap-2 mt-3">
                                <span className={`badge ${order.isPaid ? 'badge-success' : 'badge-outline'}`}>
                                    {order.isPaid ? 'Paid' : 'Not Paid'}
                                </span>
                                <span className={`badge ${order.isDelivered ? 'badge-success' : 'badge-outline'}`}>
                                    {order.isDelivered ? 'Delivered' : 'Pending'}
                                </span>
                            </div>

                            <div className="card-actions justify-end mt-4">
                                <Link href={`/orders/${order._id}`} className="btn btn-sm btn-primary">
                                    View
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}

                {orders.length === 0 && !loading && (
                    <div className="text-center py-8 opacity-70">You have no orders yet.</div>
                )}
            </div>
        </div>
    );
}