// components/CreateOrderButtonUsingThunk.jsx
"use client";

import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { placeOrderThunk } from "@/redux/orderSlice";
import { clearCart } from "@/redux/cartSlice";

export default function CreateOrderButton({
    cartItems,
    addressId,
    paymentMethod = "Card",
    taxPrice = 0,
    shippingPrice = 0,
    discountAmount = 0,
    discountPercent = 0,
    onSuccess,
    className = "btn btn-primary",
    children = "Place order",
}) {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);

    const resolveCart = () => {
        if (Array.isArray(cartItems) && cartItems.length) return cartItems;
        try {
            const stored = JSON.parse(localStorage.getItem("cartItems"));
            return Array.isArray(stored) ? stored : [];
        } catch {
            return [];
        }
    };

    const computePrices = (items) => {
        const itemsPrice = items.reduce((s, it) => {
            const price = parseFloat(it.price ?? it.priceAtPurchase ?? 0) || 0;
            const qty = parseInt(it.qty ?? it.quantity ?? 1, 10) || 1;
            return s + price * qty;
        }, 0);
        const byPercent = discountPercent ? (itemsPrice * discountPercent) / 100 : 0;
        const discount = Math.max(0, discountAmount + byPercent);
        const totalPrice = Math.max(0, itemsPrice - discount + taxPrice + shippingPrice);
        return { itemsPrice, discount, totalPrice };
    };

    const mapItems = (items) =>
        items.map((it) => ({
            name: it.name || it.title || "Product",
            quantity: parseInt(it.qty ?? it.quantity ?? 1, 10) || 1,
            selectedColor: it.colour ?? it.color ?? it.selectedColor ?? "",
            selectedSize: it.size ?? it.selectedSize ?? "",
            image: it.image ?? it.thumbnail ?? "",
            priceAtPurchase: parseFloat(it.price ?? it.priceAtPurchase ?? 0) || 0,
            product: it.productId ?? it.product ?? it._id ?? null,
        }));

    const handleClick = async () => {
        if (loading) return;
        const items = resolveCart();
        if (!items || items.length === 0) {
            toast.error("Cart is empty.");
            return;
        }
        let shipping = addressId;
        if (!shipping) {
            const defaultAddr = (() => {
                try {
                    return JSON.parse(localStorage.getItem("defaultShippingAddress"));
                } catch {
                    return null;
                }
            })();
            shipping = defaultAddr?._id || null;
        }
        if (!shipping) {
            toast.error("No shipping address provided.");
            return;
        }

        const { itemsPrice, discount, totalPrice } = computePrices(items);
        const orderItems = mapItems(items);

        if (!orderItems.every((i) => i.product && i.quantity && i.priceAtPurchase >= 0)) {
            toast.error("Cart items malformed. Check cart.");
            return;
        }

        const payload = {
            orderItems,
            shippingAddress: shipping,
            paymentMethod,
            taxPrice: Number(taxPrice) || 0,
            shippingPrice: Number(shippingPrice) || 0,
            totalPrice: Number(totalPrice) || 0,
        };

        setLoading(true);
        try {
            const result = await dispatch(placeOrderThunk(payload)).unwrap();
            toast.success("Order created");
            // optionally clear cart from localStorage
            try {
                localStorage.removeItem("cartItems");
            } catch { }
            if (typeof onSuccess === "function") onSuccess(result);
            else window.location.href = `/orders/${result._id}`;
            dispatch(clearCart());
        } catch (err) {
            toast.error(err || "Failed to create order");
        } finally {
            setLoading(false);
        }
    };

    return (
        <button onClick={handleClick} className={`${className} ${loading ? "opacity-60 pointer-events-none" : ""}`}>
            {loading ? "Creating..." : children}
        </button>
    );
}
