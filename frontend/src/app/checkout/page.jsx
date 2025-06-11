"use client";

import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function CheckoutPage() {
    const { cartItems } = useSelector((state) => state.cart);
    const { user } = useSelector((state) => state.user);
    const router = useRouter();

    const total = cartItems.reduce(
        (acc, item) => acc + item.price * item.qty,
        0
    );

    useEffect(() => {
        if (!user) {
            router.push("/login");
        }
    }, [user, router]);

    const handlePayment = async () => {
        try {
            // You would normally call your backend to create a Stripe/PayPal session here.
            alert("Redirecting to payment gateway...");
        } catch (error) {
            console.error("Checkout failed:", error);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-6">
            <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                    Checkout
                </h1>

                {cartItems.length === 0 ? (
                    <p className="text-gray-600 dark:text-gray-300">Your cart is empty.</p>
                ) : (
                    <>
                        <div className="space-y-4">
                            {cartItems.map((item) => (
                                <div
                                    key={item._id}
                                    className="flex justify-between items-center border-b pb-2"
                                >
                                    <div>
                                        <h2 className="text-lg text-gray-800 dark:text-white">
                                            {item.name}
                                        </h2>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">
                                            Quantity: {item.qty}
                                        </p>
                                    </div>
                                    <p className="text-lg font-medium text-gray-900 dark:text-white">
                                        ${(item.price * item.qty).toFixed(2)}
                                    </p>
                                </div>
                            ))}
                        </div>

                        <div className="flex justify-between mt-6 border-t pt-4">
                            <span className="text-xl font-semibold text-gray-800 dark:text-white">
                                Total:
                            </span>
                            <span className="text-xl font-bold text-blue-600 dark:text-blue-400">
                                ${total.toFixed(2)}
                            </span>
                        </div>

                        <button
                            onClick={handlePayment}
                            className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg"
                        >
                            Proceed to Payment
                        </button>
                    </>
                )}
            </div>
        </div>
    );
}
