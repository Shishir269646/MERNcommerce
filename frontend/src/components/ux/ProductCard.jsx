"use client";

import { useState } from "react";
import { FiTruck, FiDollarSign, FiAward, FiEye, FiHeart } from "react-icons/fi";
import StarRating from "./StarRating";
import AddToCartButton from "./AddToCartButton";
import ProductQuickView from "./ProductQuickView";
import Image from "next/image";



const productQuickView = {
    title: "Waterproof PU Leather Large Carry On Bag Travel Tote Duffel Bag",
    previews: [
        {
            previewUrl: "https://cdn.easyfrontend.com/pictures/products/bag1.png",
            thumbUrl: "https://cdn.easyfrontend.com/pictures/products/bag1.png",
        },
        {
            previewUrl: "https://cdn.easyfrontend.com/pictures/products/bag2.png",
            thumbUrl: "https://cdn.easyfrontend.com/pictures/products/bag2.png",
        },
        {
            previewUrl: "https://cdn.easyfrontend.com/pictures/products/bag3.png",
            thumbUrl: "https://cdn.easyfrontend.com/pictures/products/bag3.png",
        },
    ],
    price: 8452.9,
    colorVariants: [
        { bgcolor: "bg-yellow-500", value: "Multi" },
        { bgcolor: "bg-blue-500", value: "Blue" },
        { bgcolor: "bg-red-400", value: "Pink" },
        { bgcolor: "bg-black", value: "Black" },
        { bgcolor: "bg-red-600", value: "Red" },
    ],
    sizeVariants: [
        { label: "XXS", value: "XXS", title: "Extra Extra Small" },
        { label: "XS", value: "XS", title: "Extra Small" },
        { label: "S", value: "S", title: "Small" },
        { label: "M", value: "M", title: "Medium" },
        { label: "L", value: "L", title: "Large" },
        { label: "XL", value: "XL", title: "Extra Large" },
        { label: "XXL", value: "XXL", title: "Extra Extra Large" },
        {
            label: "XXXL",
            value: "XXXL",
            title: "Extra extra extra large",
            disabled: true,
        },
    ],
};

const ProductCard = ({ item }) => {

    const [showQuickView, setShowQuickView] = useState(false);

    if (!item) return null;

    const actionButtonClass =
        "rounded-lg p-2 text-gray-500 hover:bg-amber-800 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white";




    return (
        <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800">
            {/* Product Image */}
            <div className="relative w-full aspect-[4/3] rounded overflow-hidden">
                <a href="#">
                    <Image
                        src={item.imageLight}
                        alt={item.name}
                        fill
                        className="object-cover dark:hidden"
                        sizes="(min-width: 1024px) 300px, 100vw"
                    />
                    <Image
                        src={item.imageDark}
                        alt={item.name}
                        fill
                        className="object-cover hidden dark:block"
                        sizes="(min-width: 1024px) 300px, 100vw"
                    />
                </a>
            </div>

            {/* Product Name */}
            <a
                href="#"
                className="mt-2 block text-base font-semibold text-gray-900 hover:underline dark:text-white truncate max-w-full"
                title={item.name} // shows full title on hover
            >
                {item.name}
            </a>


            {/* Ratings */}
            <div>
                <StarRating rating={item.rating} review={item.reviewCount.toLocaleString()} />
            </div>

            {/* Features */}
            {/* <ul className="mt-2 flex flex-wrap gap-4 text-sm text-gray-500 dark:text-gray-400">
                {item.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2">
                        {feature.includes("Delivery") ? (
                            <FiTruck className="h-4 w-4" />
                        ) : feature.includes("Best Seller") ? (
                            <FiAward className="h-4 w-4" />
                        ) : (
                            <FiDollarSign className="h-4 w-4" />
                        )}
                        {feature}
                    </li>
                ))}
            </ul> */}

            {/* Price and Cart */}
            <div className="mt-4 flex items-center justify-between">
                <div className="flex items-baseline space-x-2 mt-4">
                    <span className="text-blue-700 text-xl font-semibold">${item.price}</span>
                    <span className="text-gray-400 text-sm line-through">${item.price}</span>
                </div>
                <AddToCartButton />
            </div>

            {/* Action Buttons */}
            <div className="mt-4 flex items-center justify-between">
                <button
                    onClick={() => setShowQuickView(true)}
                    className="w-full mr-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
                >
                    <div className="flex items-center justify-center gap-2">
                        <FiEye className="h-5 w-5" />
                        Quick View
                    </div>
                </button>
                <button className={actionButtonClass} title="Add to Favorites">
                    <FiHeart className="h-5 w-5" />
                </button>
            </div>

            {/* Modal for Quick View */}
            {showQuickView && (
                <ProductQuickView
                    product={productQuickView}
                    onClose={() => setShowQuickView(false)}
                />
            )}
        </div>
    );
};

export default ProductCard;
