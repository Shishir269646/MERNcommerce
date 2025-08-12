"use client"
import {  useState } from "react";
import ProductQuickView from "./ProductQuickView1";
import Image from "next/image";

const ProductCard1 = ({ item }) => {

    if (!item) return null;


    const [showQuickView, setShowQuickView] = useState(false);

    return (
        <>
            <div className="bg-white border p-3 rounded-xl shadow-md h-full flex flex-col justify-between transition hover:shadow-lg">
                <Image
                
                    src={item.image}
                    alt={item.title}
                    className="w-full h-48 object-cover rounded-md mb-3"
                />
                <h2 className="text-base font-semibold">{item.title}</h2>
                <p className="text-sm text-gray-500 line-clamp-2">{item.description}</p>
                <button
                    onClick={() => setShowQuickView(true)}
                    className="mt-auto bg-blue-600 text-white py-1 px-3 rounded text-sm hover:bg-blue-700"
                >
                    Quick View
                </button>
            </div>
            {showQuickView && (
                <ProductQuickView product={item} onClose={() => setShowQuickView(false)} />
            )}
        </>
    );
};

export default ProductCard1;
