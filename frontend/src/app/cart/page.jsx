"use client";

import { useEffect, useMemo, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
    updateCartItemQuantity,
    removeFromCart,
    getCartItems,
} from "@/redux/cartSlice";
import Loader from "@/components/Loader";
import ProductItem from "@/components/ux/ProductItem";
import SideBar from "@/components/ux/SideBar";

const Epcart1 = () => {
    const dispatch = useDispatch();
    const { cartItems = [], loading } = useSelector((state) => state.cart);
    const [refreshFlag, setRefreshFlag] = useState(false);

    // Fetch cart items on mount and whenever refreshFlag changes
    useEffect(() => {
        dispatch(getCartItems());
    }, [dispatch, refreshFlag]);

    const onChangeQty = async (e, index) => {
        const value = Math.max(1, parseInt(e.target.value) || 1);
        const cartItemId = cartItems[index]?._id;
        if (cartItemId) {
            await dispatch(updateCartItemQuantity({ cartItemId, quantity: value }));
            setRefreshFlag((prev) => !prev); // trigger re-fetch
        }
    };

    const onRemove = async (index) => {
        const cartItemId = cartItems[index]?._id;
        if (cartItemId) {
            await dispatch(removeFromCart(cartItemId));
            setRefreshFlag((prev) => !prev);
        }
    };

    const total = useMemo(() => {
        return cartItems.reduce((sum, item) => {
            const price = item?.product?.priceAtPurchase || 0;
            const qty = item?.quantity || 1;
            return sum + price * qty;
        }, 0);
    }, [cartItems]);

    return (
        <section className="py-14 px-4 bg-base-100">
            <div className="container mx-auto flex flex-col lg:flex-row gap-6">
                {/* Product List */}
                <div className="w-full lg:w-2/3">
                    {cartItems.length > 0 ? (
                        cartItems.map((item, i) => (
                            <ProductItem
                                key={item?._id || i}
                                item={item}
                                index={i}
                                onChangeQty={onChangeQty}
                                onRemove={onRemove}
                            />
                        ))
                    ) : (
                        <div className="text-center text-gray-500">
                            {loading ? <Loader /> : "Your cart is empty."}
                        </div>
                    )}
                </div>

                {/* Sidebar */}
                <div className="w-full lg:w-1/3">
                    <SideBar total={total} />
                </div>
            </div>
        </section>
    );
};

export default Epcart1;
