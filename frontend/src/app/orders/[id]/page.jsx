"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { getOrderByIdThunk } from '@/redux/orderSlice';
import ReviewForm from '@/components/ux/ReviewForm';
import Loader from '@/components/Loader';

export default function UserOrderDetail() {
    const dispatch = useDispatch();
    const params = useParams();
    const id = params.id;

    const { order, loading, error } = useSelector((state) => state.order);

    const [showReviewForm, setShowReviewForm] = useState(false);
    const [selectedProductForReview, setSelectedProductForReview] = useState(null);

    useEffect(() => {
        if (id) {
            dispatch(getOrderByIdThunk(id));
        }
    }, [id, dispatch]);

    if (!id) return <div className="p-4">No order id provided.</div>;

    return (
        <div className="p-4">
            <div className="flex items-center justify-between mb-4">
                <div>
                    <h1 className="text-2xl font-semibold">Order Details</h1>
                    <p className="text-sm text-muted">Order ID: <span className="font-mono">{id}</span></p>
                </div>
                <div>
                    <Link href="/orders" className="btn btn-ghost btn-sm">Back</Link>
                </div>
            </div>

            {loading && <div className="alert"><Loader /></div>}
            {error && <div className="alert alert-error">{error}</div>}

            {order && (
                <div className="grid md:grid-cols-3 gap-4">
                    <div className="md:col-span-2">
                        <div className="card bg-base-100 shadow mb-4">
                            <div className="card-body">
                                <h2 className="card-title">Items</h2>
                                <div className="divider" />
                                {order.orderItems?.map(item => (
                                    <div key={item.product} className="flex items-start gap-3 mb-4">
                                        <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded" />
                                        <div className="flex-1">
                                            <div className="flex justify-between">
                                                <div>
                                                    <h3 className="font-medium">{item.name}</h3>
                                                    <p className="text-sm opacity-70">Qty: {item.quantity} • Color: {item.selectedColor} • Size: {item.selectedSize}</p>
                                                </div>
                                                <div className="text-right">
                                                    <p className="font-semibold">$ {item.priceAtPurchase?.toFixed(2)}</p>
                                                </div>
                                            </div>
                                            {order.isDelivered && (
                                                <button
                                                    className="btn btn-sm btn-primary mt-2"
                                                    onClick={() => {
                                                        setSelectedProductForReview(item.product);
                                                        setShowReviewForm(true);
                                                    }}
                                                >
                                                    Leave a Review
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {showReviewForm && selectedProductForReview && (
                            <div className="card bg-base-100 shadow mt-4">
                                <div className="card-body">
                                    <h2 className="card-title">Leave a Review</h2>
                                    <ReviewForm
                                        productId={selectedProductForReview}
                                        onReviewSubmitted={() => {
                                            setShowReviewForm(false);
                                            setSelectedProductForReview(null);
                                            
                                        }}
                                        onCancel={() => {
                                            setShowReviewForm(false);
                                            setSelectedProductForReview(null);
                                        }}
                                    />
                                </div>
                            </div>
                        )}

                        <div className="card bg-base-100 shadow">
                            <div className="card-body">
                                <h2 className="card-title">Shipping Address</h2>
                                <div className="divider" />
                                {typeof order.shippingAddress === 'object' ? (
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

                    <div>
                        <div className="card bg-base-100 shadow mb-4">
                            <div className="card-body">
                                <h2 className="card-title">Summary</h2>
                                <div className="divider" />
                                <div className="space-y-2">
                                    <div className="flex justify-between"><span>Items</span><span>$ {order.orderItems?.reduce((s, i) => s + (i.priceAtPurchase * i.quantity), 0).toFixed(2)}</span></div>
                                    <div className="flex justify-between"><span>Tax</span><span>$ {order.taxPrice?.toFixed(2)}</span></div>
                                    <div className="flex justify-between"><span>Shipping</span><span>$ {order.shippingPrice?.toFixed(2)}</span></div>
                                    <div className="divider" />
                                    <div className="flex justify-between font-semibold"><span>Total</span><span>$ {order.totalPrice?.toFixed(2)}</span></div>
                                </div>
                            </div>
                        </div>

                        <div className="card bg-base-100 shadow">
                            <div className="card-body">
                                <h2 className="card-title">Payment & Delivery</h2>
                                <div className="divider" />
                                <div className="space-y-3">
                                    <div>
                                        <p className="text-sm">Method</p>
                                        <p className="font-medium">{order.paymentMethod}</p>
                                    </div>

                                    <div>
                                        <p className="text-sm">Paid</p>
                                        <p className="font-medium">{order.isPaid ? `Yes — ${new Date(order.paidAt).toLocaleString()}` : 'No'}</p>
                                    </div>

                                    <div>
                                        <p className="text-sm">Delivered</p>
                                        <p className="font-medium">{order.isDelivered ? `Yes — ${new Date(order.deliveredAt).toLocaleString()}` : 'No'}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            )}
        </div>
    );
}