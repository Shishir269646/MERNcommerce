"use client";
import { FaCcVisa, FaCcAmex, FaCcMastercard, FaCcPaypal } from "react-icons/fa";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAddresses } from "@/redux/addressSlice";
import { validateCoupon } from "@/redux/couponSlice";
import { clearCart } from "@/redux/cartSlice";
import { placeOrderThunk } from "@/redux/orderSlice";
import { toast } from "react-toastify";

export default function CheckoutForm({ total }) {
    const dispatch = useDispatch();

    // Redux states
    const { user } = useSelector((state) => state.user);
    const { addresses } = useSelector((state) => state.address);
    const { cartItems } = useSelector((state) => state.cart);
    const { validatedCoupon } = useSelector((state) => state.coupon);

    // Local state
    const [couponCode, setCouponCode] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        addressId: "",
        paymentMethod: "Card",
    });

    useEffect(() => {
        if (!user) {
            toast.error("Please login to continue");
            return;
        }
        dispatch(fetchAddresses());
    }, [dispatch, user]);

    useEffect(() => {
        if (!user) return;
        const [firstName = "", lastName = ""] = (user.username || "").split(" ");
        const defaultAddress = addresses?.[0];
        setFormData((prev) => ({
            ...prev,
            firstName,
            lastName,
            email: user.email || prev.email || "",
            phone: defaultAddress?.phone || prev.phone || "",
            addressId: defaultAddress?._id || prev.addressId || "",
        }));
    }, [user, addresses]);

    const handleApplyCoupon = async () => {
        if (!couponCode) return toast.error("Please enter a coupon code");
        try {
            await dispatch(validateCoupon(couponCode)).unwrap();
            toast.success("Coupon applied successfully");
        } catch (err) {
            toast.error(err?.message || "Invalid coupon code");
        }
    };

    const discount = validatedCoupon
        ? (total * (validatedCoupon.discountPercent ?? 0)) / 100
        : 0;

    const taxPrice = 1;
    const shippingPrice = 5;
    const totalPrice = Math.max(0, total - discount + taxPrice + shippingPrice);

    const handleInputChange = (e) =>
        setFormData((s) => ({ ...s, [e.target.name]: e.target.value }));

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!user) {
            toast.error("Please login to place an order");
            return;
        }
        if (!formData.addressId) {
            toast.error("Please select a shipping address");
            return;
        }
        if (!cartItems || cartItems.length === 0) {
            toast.error("Your cart is empty");
            return;
        }

        let mappedOrderItems;
        try {
            mappedOrderItems = cartItems.map((it) => ({
                name: it.product.title || "Product",
                quantity: it.quantity || 1,
                selectedColor: it.selectedColor || "",
                selectedSize: it.selectedSize || "",
                image:
                    it.product.Image?.[0]?.find((img) => img.size === "small")?.url ||
                    it.product.Image?.[0]?.[0]?.url ||
                    "/fallback.jpg",
                priceAtPurchase: it.discountPriceAtPurchase || 0,
                product: it.product._id || null,
            }));
        } catch (error) {
            toast.error("An error occurred while processing your cart items.");
            return;
        }

        if (!mappedOrderItems.every((i) => i.product && i.quantity && i.priceAtPurchase >= 0)) {
            toast.error("Cart items are malformed. Please check your cart.");
            return;
        }

        if (isNaN(parseFloat(total))) {
            toast.error("Invalid total amount.");
            return;
        }

        const orderPayload = {
            user,
            orderItems: mappedOrderItems,
            shippingAddress: formData.addressId,
            paymentMethod: formData.paymentMethod,
            itemsPrice: parseFloat(total),
            taxPrice,
            shippingPrice,
            totalPrice,
        };

        setIsSubmitting(true);
        try {
            const order = await dispatch(placeOrderThunk(orderPayload)).unwrap();
            toast.success("Order placed successfully");
            dispatch(clearCart());
            window.location.href = `/orders/${order._id}`;
        } catch (err) {
            console.error("place order failed:", err);
            toast.error(err?.message || "Something is Broken Place Order field");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="bg-base-100 sm:px-8 px-4 py-6">
            <div className="max-w-screen-xl max-md:max-w-xl mx-auto">
                {/* Progress Steps */}
                <div className="flex items-start mb-16">
                    {["Cart", "Checkout", "Order"].map((label, i) => (
                        <div key={label} className="w-full flex items-center">
                            <div
                                className={`w-8 h-8 shrink-0 mx-[-1px] p-1.5 flex items-center justify-center rounded-full ${i <= 1 ? "bg-primary text-white" : "bg-base-300"
                                    }`}
                            >
                                <span className="text-sm font-semibold">{i + 1}</span>
                            </div>
                            {i < 2 && (
                                <div
                                    className={`w-full h-[3px] mx-4 rounded-lg ${i === 0 ? "bg-primary" : "bg-base-300"}`}
                                />
                            )}
                            <div className="mt-2 mr-4">
                                <h6 className={`text-sm font-semibold ${i <= 1 ? "text-base-content" : "text-base-content/50"}`}>
                                    {label}
                                </h6>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-y-12 gap-x-8 lg:gap-x-12">
                    <div className="lg:col-span-2">
                        <form id="checkout-form" onSubmit={handleSubmit}>
                            {/* Delivery Details */}
                            <div>
                                <h2 className="text-xl font-semibold mb-6">Delivery Details</h2>
                                <div className="grid lg:grid-cols-2 gap-y-6 gap-x-4">
                                    {[
                                        { name: "firstName", label: "First name" },
                                        { name: "lastName", label: "Last name" },
                                        { name: "email", label: "Email", type: "email" },
                                        { name: "phone", label: "Phone No.", type: "text" },
                                    ].map(({ name, label, type = "text" }) => (
                                        <div key={name}>
                                            <label className="label text-sm font-medium">{label}</label>
                                            <input
                                                type={type}
                                                name={name}
                                                value={formData[name] || ""}
                                                onChange={handleInputChange}
                                                placeholder={`Enter ${label}`}
                                                className="input input-bordered w-full text-sm"
                                            />
                                        </div>
                                    ))}

                                    {/* Address selector */}
                                    <div className="md:col-span-2">
                                        <label className="label text-sm font-medium">Shipping address</label>
                                        {addresses && addresses.length > 0 ? (
                                            <select
                                                name="addressId"
                                                value={formData.addressId}
                                                onChange={handleInputChange}
                                                className="select select-bordered w-full"
                                            >
                                                {addresses.map((addr) => (
                                                    <option key={addr._id} value={addr._id}>
                                                        {addr.address || addr.addressLine1 || `${addr.city || ""} ${addr.postalCode || ""}`} — {addr.phone || ""}
                                                    </option>
                                                ))}
                                            </select>
                                        ) : (
                                            <div className="flex items-center gap-4">
                                                <p className="text-sm opacity-70">No saved addresses found.</p>
                                                <Link href="/user/addresses" className="btn btn-sm btn-outline">
                                                    Add address
                                                </Link>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Payment Options */}
                            <div className="mt-12">
                                <h2 className="text-xl font-semibold mb-6">Payment</h2>
                                <div className="grid gap-4 lg:grid-cols-3">
                                    <div className="card bg-base-200 border border-base-300 max-w-sm">
                                        <div className="card-body p-4">
                                            <div className="flex items-center">
                                                <input
                                                    type="radio"
                                                    name="paymentMethod"
                                                    className="radio radio-primary"
                                                    id="card"
                                                    value="Card"
                                                    checked={formData.paymentMethod === "Card"}
                                                    onChange={handleInputChange}
                                                />
                                                <label htmlFor="card" className="ml-4 flex gap-2 cursor-pointer">
                                                    <FaCcVisa size={48} />
                                                    <FaCcAmex size={48} />
                                                    <FaCcMastercard size={48} />
                                                </label>
                                            </div>
                                            <p className="mt-4 text-sm font-medium">Pay with your debit or credit card</p>
                                        </div>
                                    </div>

                                    <div className="card bg-base-200 border border-base-300 max-w-sm">
                                        <div className="card-body p-4">
                                            <div className="flex items-center">
                                                <input
                                                    type="radio"
                                                    name="paymentMethod"
                                                    className="radio radio-primary"
                                                    id="paypal"
                                                    value="PayPal"
                                                    checked={formData.paymentMethod === "PayPal"}
                                                    onChange={handleInputChange}
                                                />
                                                <label htmlFor="paypal" className="ml-4 flex gap-2 cursor-pointer">
                                                    <FaCcPaypal size={80} />
                                                </label>
                                            </div>
                                            <p className="mt-4 text-sm text-base-content/70 font-medium">Pay with your PayPal account</p>
                                        </div>
                                    </div>

                                    <div className="card bg-base-200 border border-base-300 max-w-sm">
                                        <div className="card-body p-4">
                                            <div className="flex items-center">
                                                <input
                                                    type="radio"
                                                    name="paymentMethod"
                                                    className="radio radio-primary"
                                                    id="cod"
                                                    value="COD"
                                                    checked={formData.paymentMethod === "COD"}
                                                    onChange={handleInputChange}
                                                />
                                                <label htmlFor="cod" className="ml-4 cursor-pointer font-semibold">Cash on Delivery</label>
                                            </div>
                                            <p className="mt-4 text-sm text-base-content/70 font-medium">Pay with cash when your order is delivered</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Promo Code */}
                            <div className="mt-12 max-w-md">
                                <p className="text-sm font-medium mb-2">Do you have a promo code?</p>
                                <div className="flex gap-4">
                                    <input
                                        type="text"
                                        placeholder="Promo code"
                                        className="input input-bordered w-full text-sm"
                                        value={couponCode}
                                        onChange={(e) => setCouponCode(e.target.value)}
                                    />
                                    <button type="button" className="btn btn-primary" onClick={handleApplyCoupon}>
                                        Apply
                                    </button>
                                </div>
                            </div>

                            {/* Order Summary */}
                            <div className="relative mt-12">
                                <h2 className="text-xl font-semibold mb-6">Order Summary</h2>
                                <ul className="font-medium space-y-4">
                                    <li className="flex flex-wrap gap-4 text-sm">
                                        Subtotal <span className="ml-auto font-semibold">${total}</span>
                                    </li>
                                    <li className="flex flex-wrap gap-4 text-sm">
                                        Discount <span className="ml-auto font-semibold">-${discount.toFixed(2)}</span>
                                    </li>
                                    <li className="flex flex-wrap gap-4 text-sm">
                                        Tax <span className="ml-auto font-semibold">${taxPrice.toFixed(2)}</span>
                                    </li>
                                    <li className="flex flex-wrap gap-4 text-sm">
                                        Shipping <span className="ml-auto font-semibold">${shippingPrice.toFixed(2)}</span>
                                    </li>
                                    <hr className="border-base-300" />
                                    <li className="flex flex-wrap gap-4 text-[15px] font-semibold">
                                        Total <span className="ml-auto">${totalPrice.toFixed(2)}</span>
                                    </li>
                                </ul>

                                <div className="space-y-4 mt-8">
                                    <button type="submit" className="btn btn-primary w-full" disabled={isSubmitting}>
                                        {isSubmitting ? "Placing order..." : "Complete Purchase"}
                                    </button>

                                    <Link type="button" className="btn btn-outline w-full" href="/">
                                        Continue Shopping
                                    </Link>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
