"use client";

import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, clearCart } from "@/redux/slices/cartSlice";
import Link from "next/link";
import Image from "next/image";

export default function CartPage() {
    const dispatch = useDispatch();
    const { cartItems } = useSelector((state) => state.cart);

    const totalPrice = cartItems.reduce(
        (acc, item) => acc + item.price * item.qty,
        0
    );

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-10 px-4">
            <h1 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-8">
                Your Cart
            </h1>

            {cartItems.length === 0 ? (
                <div className="text-center text-gray-600 dark:text-gray-300">
                    <p>Your cart is empty.</p>
                    <Link
                        href="/products"
                        className="text-blue-600 dark:text-blue-400 underline mt-4 inline-block"
                    >
                        Browse Products
                    </Link>
                </div>
            ) : (
                <div className="max-w-5xl mx-auto">
                    <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 space-y-6">
                        {cartItems.map((item) => (
                            <div
                                key={item._id}
                                className="flex items-center justify-between gap-4 border-b pb-4"
                            >
                                <div className="flex items-center gap-4">
                                    <Image
                                        src={item.image}
                                        alt={item.name}
                                        width={80}
                                        height={80}
                                        className="rounded object-cover"
                                    />
                                    <div>
                                        <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
                                            {item.name}
                                        </h2>
                                        <p className="text-sm text-gray-600 dark:text-gray-300">
                                            Qty: {item.qty}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <p className="text-lg font-semibold text-gray-900 dark:text-white">
                                        ${(item.price * item.qty).toFixed(2)}
                                    </p>
                                    <button
                                        onClick={() => dispatch(removeFromCart(item._id))}
                                        className="text-red-500 hover:text-red-700 text-sm"
                                    >
                                        Remove
                                    </button>
                                </div>
                            </div>
                        ))}

                        <div className="flex justify-between items-center pt-4">
                            <p className="text-xl font-bold text-gray-800 dark:text-white">
                                Total: ${totalPrice.toFixed(2)}
                            </p>
                            <div className="space-x-3">
                                <button
                                    onClick={() => dispatch(clearCart())}
                                    className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
                                >
                                    Clear Cart
                                </button>
                                <Link
                                    href="/checkout"
                                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                                >
                                    Proceed to Checkout
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
