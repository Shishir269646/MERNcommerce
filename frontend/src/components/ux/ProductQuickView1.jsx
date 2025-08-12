"use client"

import Image from "next/image";


const ProductQuickView = ({ product, onClose }) => {
    if (!product) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
            <div className="bg-white w-full max-w-2xl p-6 rounded-xl relative">
                <button
                    onClick={onClose}
                    className="absolute top-2 right-2 text-gray-600 hover:text-red-500 text-2xl"
                >
                    &times;
                </button>
                <div className="flex flex-col md:flex-row gap-6">
                    <Image

                        src={product.image}
                        alt={product.title}
                        className="w-full md:w-1/2 h-auto rounded-lg object-cover"
                    />
                    <div className="w-full md:w-1/2">
                        <h2 className="text-2xl font-bold">{product.title}</h2>
                        <p className="text-gray-600 mt-2">{product.description}</p>
                        <p className="text-xl text-blue-600 mt-4">$ {product.price}</p>
                        <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                            Add to Cart
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductQuickView;
