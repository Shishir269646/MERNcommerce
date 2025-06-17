"use client";

import { FaTimes, FaMinus, FaPlus, FaShoppingCart } from "react-icons/fa";

function MiniShoppingCart({ isVisible, setIsVisible, basketItems, setBasketItems, basketRef }) {
    if (!isVisible) return null;

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

    return (
        <div
            ref={basketRef}
            className="absolute z-50 w-[750px] max-w-[95vw] top-12 right-0 bg-white dark:bg-gray-800 shadow-lg rounded-lg p-4"
        >
            {basketCount === 0 ? (
                <h2 className="text-center text-gray-500 dark:text-gray-200">
                    Your shopping cart is empty!
                </h2>
            ) : (
                <>
                    <div className="border-b pb-4 text-lg font-semibold text-gray-700 dark:text-white">
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
                                    <p className="font-semibold text-sm text-gray-800 dark:text-white">{item.name}</p>
                                    <p className="text-gray-500 dark:text-gray-300 text-sm">{item.detail}</p>
                                    <p className="text-gray-400 dark:text-gray-400 text-xs">{item.color}</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => handleQuantity(item.id, "dec")}
                                    className="bg-gray-200 dark:bg-gray-600 text-black dark:text-white p-1 rounded"
                                >
                                    <FaMinus />
                                </button>
                                <input
                                    value={item.quantity}
                                    readOnly
                                    className="w-8 text-center border rounded text-black dark:text-white bg-white dark:bg-gray-700"
                                />
                                <button
                                    onClick={() => handleQuantity(item.id, "inc")}
                                    className="bg-gray-200 dark:bg-gray-600 text-black dark:text-white p-1 rounded"
                                >
                                    <FaPlus />
                                </button>
                            </div>

                            <div className="font-medium text-gray-800 dark:text-white">
                                £{item.price * item.quantity}
                            </div>

                            <button onClick={() => handleDelete(item.id)} className="text-red-500">
                                <FaTimes />
                            </button>
                        </div>
                    ))}

                    <div className="flex justify-end text-lg font-semibold text-gray-800 dark:text-white mt-4">
                        Total: <span className="ml-2 text-green-600">£{totalPrice}</span>
                    </div>

                    <div className="flex justify-end gap-4 mt-6">
                        <button className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 flex items-center gap-2">
                            Checkout <FaShoppingCart />
                        </button>
                        <button className="border px-6 py-2 rounded text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                            View Basket
                        </button>
                    </div>
                </>
            )}
        </div>
    );

}

export default MiniShoppingCart;
