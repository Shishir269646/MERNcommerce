"use client";

import { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FaShoppingCart, FaShoppingBasket } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import QtyField from "@/components/ux/QtyField";
import Link from "next/link";
import {
    updateCartItemQuantity,
    removeFromCart,
    getCartItems,
} from "@/redux/cartSlice";
import Loader from "@/components/Loader";
import Image from "next/image";

function MiniShoppingCart({ isVisible, setIsVisible, basketRef }) {
    const dispatch = useDispatch();
    const { cartItems, loading, error } = useSelector((state) => state.cart);

    // Refetch cart items on mount and when cart changes
    useEffect(() => {
        dispatch(getCartItems());
    }, [dispatch, cartItems.length]);

    if (!isVisible) return null;

    if (loading) {
        return (
            <div
                ref={basketRef}
                className="absolute z-50 w-[750px] max-w-[95vw] top-12 right-0 bg-base-100 shadow-lg rounded-lg p-6 border border-base-300 flex justify-center items-center min-h-[200px]"
            >
                <Loader />
            </div>
        );
    }

    const basketCount = cartItems.reduce(
        (sum, item) => sum + (item.quantity || 1),
        0
    );

    const totalPrice = cartItems.reduce((sum, item) => {
        const price = item.product?.priceAtPurchase || 0;
        return sum + price * (item.quantity || 1);
    }, 0);

    const handleQuantity = async (cartItemId, value) => {
        if (!isNaN(value) && value > 0) {
            await dispatch(updateCartItemQuantity({ cartItemId, quantity: value }));
            dispatch(getCartItems()); // Refetch after update
        }
    };

    const handleDelete = async (cartItemId) => {
        await dispatch(removeFromCart(cartItemId));
        dispatch(getCartItems()); // Refetch after delete
    };

    return (
        <div
            ref={basketRef}
            className="absolute z-50 w-[750px] max-w-[95vw] top-12 right-0 bg-base-100 shadow-lg rounded-lg p-6 border border-base-300"
        >
            {basketCount === 0 ? (
                <h2 className="text-center text-neutral">Your shopping cart is empty!</h2>
            ) : (
                <>
                    <div className="border-b border-base-300 pb-4 text-lg font-bold text-base-content">
                        My Basket{" "}
                        <span className="text-sm font-normal text-neutral">
                            ({basketCount} items)
                        </span>
                    </div>

                    <div className="mt-4 space-y-6 max-h-[400px] overflow-y-auto pr-2">
                        {cartItems.map((item) => {
                            const { _id, quantity, product } = item;
                            const price = product?.priceAtPurchase || 0;
                            const image = product.Image?.[0]?.find(img => img.size === "small")?.url ||
                                product.Image?.[0]?.[0]?.url ||
                                '/fallback.jpg'
                            const title = product?.title || "Untitled Product";
                            const description = product?.description || "";

                            return (
                                <div
                                    key={_id}
                                    className="flex items-start justify-between border-t border-base-200 pt-4 gap-4"
                                >
                                    <div className="flex gap-4 items-center w-full">
                                        <Image
                                            src={image}
                                            alt={title}
                                            height={80}
                                            width={80}
                                            className="object-contain rounded"
                                        />
                                        <div className="text-sm w-full">
                                            <p className="font-semibold text-base-content line-clamp-1">
                                                {title}
                                            </p>
                                            <p className="text-sm text-neutral line-clamp-2">
                                                {description}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-4 mt-2">
                                        <QtyField
                                            name={`qty-${_id}`}
                                            value={quantity}
                                            onChange={(e) =>
                                                handleQuantity(_id, parseInt(e.target.value))
                                            }
                                        />
                                        <p className="text-sm font-semibold text-success">
                                            £{(price * quantity).toFixed(2)}
                                        </p>
                                    </div>

                                    <button
                                        onClick={() => handleDelete(_id)}
                                        className="btn btn-sm btn-circle btn-outline text-2xl text-error"
                                    >
                                        <MdDeleteForever />
                                    </button>
                                </div>
                            );
                        })}
                    </div>

                    <div className="flex justify-between items-center border-t border-base-200 mt-6 pt-4">
                        <span className="text-lg font-medium text-base-content">
                            Total:
                        </span>
                        <span className="text-lg font-bold text-success">
                            £{totalPrice.toFixed(2)}
                        </span>
                    </div>

                    <div className="flex justify-end gap-4 mt-6">
                        <Link className="btn btn-primary text-2xl" href="/checkout">
                            Checkout <FaShoppingCart className="ml-2" />
                        </Link>
                        <Link className="btn btn-dash btn-primary text-xl" href="/cart">
                            View Cart <FaShoppingBasket className="ml-2" />
                        </Link>
                    </div>
                </>
            )}
        </div>
    );
}

export default MiniShoppingCart;
