"use client";

import { useEffect, useState, useRef } from "react";
import {
    FaTimes,
    FaMinus,
    FaPlus,
    FaShoppingCart,
} from "react-icons/fa";
import BasketToggleButton from "./BasketToggleButton"; // Adjust path as needed

const initialBasketItems = [
    {
        id: 1,
        name: "Common Projects",
        detail: "Bball High",
        color: "White",
        img: "https://designmodo.com/demo/shopping-cart/item-1.png",
        price: 549,
        quantity: 1,
    },
    {
        id: 2,
        name: "Maison Margiela",
        detail: "Future Sneakers",
        color: "White",
        img: "https://designmodo.com/demo/shopping-cart/item-2.png",
        price: 870,
        quantity: 1,
    },
    {
        id: 3,
        name: "Our Legacy",
        detail: "Brushed Scarf",
        color: "Brown",
        img: "https://designmodo.com/demo/shopping-cart/item-3.png",
        price: 349,
        quantity: 1,
    },
];

function MiniShoppingCart() {
    const [isVisible, setIsVisible] = useState(false);
    const [basketItems, setBasketItems] = useState(initialBasketItems);
    const basketRef = useRef();

    const basketCount = basketItems.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = basketItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

    const handleQuantity = (id, type) => {
        setBasketItems(items =>
            items.map(item =>
                item.id === id
                    ? {
                        ...item,
                        quantity:
                            type === "inc"
                                ? item.quantity + 1
                                : item.quantity > 1
                                    ? item.quantity - 1
                                    : 1,
                    }
                    : item
            )
        );
    };

    const handleDelete = id => {
        setBasketItems(items => items.filter(item => item.id !== id));
    };

    useEffect(() => {
        const handleOutsideClick = e => {
            if (basketRef.current && !basketRef.current.contains(e.target)) {
                setIsVisible(false);
            }
        };
        document.addEventListener("mousedown", handleOutsideClick);
        return () => document.removeEventListener("mousedown", handleOutsideClick);
    }, []);

    return (
        <div className="relative">
            <BasketToggleButton
                basketCount={basketCount}
                onClick={() => setIsVisible(!isVisible)}
            />

            {isVisible && (
                <div
                    ref={basketRef}
                    className="absolute z-50 w-[750px] max-w-[95vw] top-12 right-0 bg-white shadow-lg rounded-lg p-4"
                >
                    <div className="border-b pb-4 text-lg font-semibold text-gray-700">
                        My Basket, <span>{basketCount} items</span>
                    </div>

                    {basketItems.map(item => (
                        <div
                            key={item.id}
                            className="flex items-center justify-between border-t py-4 gap-4"
                        >
                            <div className="flex items-center gap-4">
                                <img src={item.img} alt="" className="w-20 h-20 object-contain" />
                                <div>
                                    <p className="font-semibold text-sm">{item.name}</p>
                                    <p className="text-gray-500 text-sm">{item.detail}</p>
                                    <p className="text-gray-400 text-xs">{item.color}</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => handleQuantity(item.id, "dec")}
                                    className="bg-gray-200 p-1 rounded"
                                >
                                    <FaMinus />
                                </button>
                                <input
                                    value={item.quantity}
                                    readOnly
                                    className="w-8 text-center border rounded"
                                />
                                <button
                                    onClick={() => handleQuantity(item.id, "inc")}
                                    className="bg-gray-200 p-1 rounded"
                                >
                                    <FaPlus />
                                </button>
                            </div>

                            <div className="font-medium">£{item.price * item.quantity}</div>

                            <button onClick={() => handleDelete(item.id)} className="text-red-500">
                                <FaTimes />
                            </button>
                        </div>
                    ))}

                    <div className="flex justify-end text-lg font-semibold text-gray-800 mt-4">
                        Total: <span className="ml-2 text-green-600">£{totalPrice}</span>
                    </div>

                    <div className="flex justify-end gap-4 mt-6">
                        <button className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 flex items-center gap-2">
                            Checkout <FaShoppingCart />
                        </button>
                        <button className="border px-6 py-2 rounded text-gray-700 hover:bg-gray-100">
                            View Basket
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default MiniShoppingCart;
