'use client';

import { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FaShoppingBag } from "react-icons/fa";
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

    useEffect(() => {
        dispatch(getCartItems());
    }, [dispatch, cartItems.length]);

    if (!isVisible) return null;

    const containerClasses = "absolute z-50 w-[calc(100vw-2rem)] lg:w-[750px] top-14 right-1/2 lg:right-0 translate-x-1/2 lg:translate-x-0 bg-base-100 shadow-2xl rounded-lg p-4 border border-base-300";

    if (loading) {
        return (
            <div ref={basketRef} className={`${containerClasses} flex justify-center items-center min-h-[200px]`}>
                <Loader />
            </div>
        );
    }

    const basketCount = cartItems.reduce((sum, item) => sum + (item.quantity || 1), 0);
    const totalPrice = cartItems.reduce((sum, item) => {
        const price = item.product?.discountPrice ?? item.product?.price ?? 0;
        return sum + price * (item.quantity || 1);
    }, 0);

    const handleQuantity = async (cartItemId, value) => {
        if (!isNaN(value) && value > 0) {
            await dispatch(updateCartItemQuantity({ cartItemId, quantity: value }));
            dispatch(getCartItems());
        }
    };

    const handleDelete = async (cartItemId) => {
        await dispatch(removeFromCart(cartItemId));
        dispatch(getCartItems());
    };

    return (
        <div ref={basketRef} className={containerClasses}>
            {basketCount === 0 ? (
                <div className="flex flex-col items-center justify-center text-center py-12">
                    <FaShoppingBag className="text-6xl text-gray-300 mb-4" />
                    <h2 className="text-xl font-semibold text-neutral mb-2">Your shopping cart is empty!</h2>
                    <p className="text-gray-500 mb-6">Looks like you haven't added anything yet.</p>
                    <Link 
                        href="/products" 
                        className="btn btn-primary"
                        onClick={() => setIsVisible(false)}
                    >
                        Continue Shopping
                    </Link>
                </div>
            ) : (
                <>
                    <div className="border-b border-base-300 pb-3 text-lg font-bold text-base-content">
                        My Basket{" "}
                        <span className="text-sm font-normal text-neutral">({basketCount} items)</span>
                    </div>

                    <div className="mt-4 space-y-4 max-h-[60vh] overflow-y-auto pr-2">
                        {cartItems.map((item) => {
                            const { _id, quantity, product } = item;
                            const price = product?.discountPrice || product?.price || 0;
                            const image = product.Image?.[0]?.find(img => img.size === "small")?.url || product.Image?.[0]?.[0]?.url || '/fallback.jpg';
                            const title = product?.title || "Untitled Product";

                            return (
                                <div key={_id} className="flex flex-col md:flex-row items-start md:items-center justify-between border-b border-base-200 pb-4 gap-3">
                                    <div className="flex items-center gap-4 flex-grow">
                                        <Image src={image} alt={title} height={80} width={80} className="object-contain rounded border p-1" />
                                        <div className="text-sm">
                                            <p className="font-semibold text-base-content line-clamp-2">{title}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between w-full md:w-auto md:justify-end gap-4 mt-3 md:mt-0">
                                        <QtyField name={`qty-${_id}`} value={quantity} onChange={(e) => handleQuantity(_id, parseInt(e.target.value))} />
                                        <p className="text-sm font-semibold text-success min-w-[70px] text-right">${(price * quantity).toFixed(2)}</p>
                                        <button onClick={() => handleDelete(_id)} className="btn btn-xs btn-circle btn-outline text-lg text-error">
                                            <MdDeleteForever />
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    <div className="flex justify-between items-center border-t border-base-200 mt-4 pt-4">
                        <span className="text-lg font-medium text-base-content">Total:</span>
                        <span className="text-lg font-bold text-success">${totalPrice.toFixed(2)}</span>
                    </div>

                    <div className="flex flex-col sm:flex-row justify-end gap-3 mt-4">
                        <Link className="btn btn-primary w-full sm:w-auto" href="/checkout">Checkout</Link>
                        <Link className="btn btn-outline w-full sm:w-auto" href="/cart">View Cart</Link>
                    </div>
                </>
            )}
        </div>
    );
}

export default MiniShoppingCart;
