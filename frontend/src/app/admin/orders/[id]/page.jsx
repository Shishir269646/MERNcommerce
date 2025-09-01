"use client";

import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from "next/navigation";
import Link from "next/link";
import { getOrderByIdThunk, updateOrderToPaidThunk, updateOrderToDeliveredThunk } from "@/redux/orderSlice";
import Loader from "@/components/Loader";

export default function EditOrderPage() {
    const dispatch = useDispatch();
    const params = useParams();
    const id = params.id;

    const { order, loading, error } = useSelector((state) => state.order);

    useEffect(() => {
        if (id) {
            dispatch(getOrderByIdThunk(id));
        }
    }, [id, dispatch]);

    const markAsPaid = () => {
        if (window.confirm("Mark this order as PAID?")) {
            const paymentResult = {
                id: `manual-${Date.now()}`,
                status: "COMPLETED",
                update_time: new Date().toISOString(),
                payer: { email_address: "admin@example.com" },
            };
            dispatch(updateOrderToPaidThunk({ orderId: id, paymentResult }));
        }
    };

    const markAsDelivered = () => {
        if (window.confirm("Mark this order as DELIVERED?")) {
            dispatch(updateOrderToDeliveredThunk(id));
        }
    };

    

    if (!id) return <div className="p-4">No order ID provided in route.</div>;

    return (
        <div className="p-4">
            <div className="flex items-center justify-between mb-4">
                <div>
                    <h1 className="text-2xl font-semibold">Edit Order</h1>
                    <p className="text-sm text-muted">Order ID: <span className="font-mono">{id}</span></p>
                </div>
                <div className="flex gap-2">
                    <Link href="/admin/orders" className="btn btn-ghost btn-sm">
                        Back to orders
                    </Link>
                </div>
            </div>

            {loading && <div className="alert"><Loader /></div>}
            {error && <div className="alert alert-error">{error}</div>}

            {order && (
                <div className="grid md:grid-cols-3 gap-4">
                    {/* Left: Items */}
                    <div className="md:col-span-2">
                        <div className="card shadow bg-base-100 mb-4">
                            <div className="card-body">
                                <h2 className="card-title">Order Items</h2>
                                <div className="divider" />
                                {order.orderItems?.map((item) => (
                                    <div key={item.product} className="flex items-start gap-3 mb-4">
                                        <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded" />
                                        <div className="flex-1">
                                            <div className="flex justify-between items-start">
                                                <div>
                                                    <h3 className="font-medium">{item.name}</h3>
                                                    <p className="text-sm opacity-70">Qty: {item.quantity} • Color: {item.selectedColor} • Size: {item.selectedSize}</p>
                                                </div>
                                                <div className="text-right">
                                                    <p className="font-semibold">$ {item.priceAtPurchase?.toFixed(2)}</p>
                                                    <p className="text-xs opacity-60">Product ID: <span className="font-mono">{item.product}</span></p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="card shadow bg-base-100">
                            <div className="card-body">
                                <h2 className="card-title">Shipping Address</h2>
                                <div className="divider" />


                                {typeof order.shippingAddress === "object" ? (
                                    <div>
                                        <p>City:- {order.shippingAddress.city || "-"}</p>
                                        <p>Street:- {order.shippingAddress.street || "-"}</p>
                                        <p>Postal Code:- {order.shippingAddress.postalCode || "-"}</p>
                                        <p>Country:- {order.shippingAddress.country || "-"}</p>
                                        <p>Phone:- {order.shippingAddress.phone || "-"}</p>
                                        <p className="text-sm opacity-70">Address ID: <span className="font-mono">{order.shippingAddress._id}</span></p>
                                    </div>
                                ) : (
                                    <p className="font-mono">{order.shippingAddress}</p>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Right: Summary & Actions */}
                    <div>
                        <div className="card shadow bg-base-100 mb-4">
                            <div className="card-body">
                                <h2 className="card-title">Order Summary</h2>
                                <div className="divider" />
                                <div className="space-y-2">
                                    <div className="flex justify-between"><span>Items</span><span>$ {order.itemsPrice?.toFixed(2) || order.orderItems?.reduce((s, i) => s + (i.priceAtPurchase * i.quantity), 0).toFixed(2)}</span></div>
                                    <div className="flex justify-between"><span>Tax</span><span>$ {order.taxPrice?.toFixed(2)}</span></div>
                                    <div className="flex justify-between"><span>Shipping</span><span>$ {order.shippingPrice?.toFixed(2)}</span></div>
                                    <div className="divider" />
                                    <div className="flex justify-between font-semibold"><span>Total</span><span>$ {order.totalPrice?.toFixed(2)}</span></div>
                                </div>
                            </div>
                        </div>

                        <div className="card shadow bg-base-100">
                            <div className="card-body">
                                <h2 className="card-title">Status</h2>
                                <div className="divider" />

                                <div className="flex flex-col gap-2">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-sm">Paid</p>
                                            <p className="text-xs opacity-70">{order.isPaid ? `Yes — ${new Date(order.paidAt).toLocaleString()}` : "No"}</p>
                                        </div>
                                        {!order.isPaid && (
                                            <button onClick={markAsPaid} disabled={loading} className="btn btn-sm btn-success">
                                                {loading ? "Processing..." : "Mark as Paid"}
                                            </button>
                                        )}
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-sm">Delivered</p>
                                            <p className="text-xs opacity-70">{order.isDelivered ? `Yes — ${new Date(order.deliveredAt).toLocaleString()}` : "No"}</p>
                                        </div>
                                        {!order.isDelivered && (
                                            <button onClick={markAsDelivered} disabled={loading} className="btn btn-sm btn-warning">
                                                {loading ? "Processing..." : "Mark as Delivered"}
                                            </button>
                                        )}
                                    </div>

                                </div>
                            </div>
                        </div>

                        <div className="mt-3 text-center text-sm opacity-70">
                            <p>Order created: {new Date(order.createdAt).toLocaleString()}</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}