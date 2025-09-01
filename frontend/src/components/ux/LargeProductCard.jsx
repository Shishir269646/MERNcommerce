"use client";

import { useState } from "react";
import NextPrivBTN from "./NextPrivBTN";
import StarRating from "./StarRating";
import AddToCartButton from "./AddToCartButton";
import Image from "next/image";




function ReadMore({ text, limit = 80 }) {
    const [expanded, setExpanded] = useState(false);
    const isLong = text.length > limit;
    const displayText = expanded ? text : text.slice(0, limit) + (isLong ? "..." : "");

    if (!text) return null;

    return (
        <div className="mt-2 text-sm sm:text-base text-gray-600">
            <p>{displayText}</p>
            {isLong && (
                <button
                    onClick={() => setExpanded(!expanded)}
                    className="mt-1 text-blue-600 hover:underline text-sm sm:text-base"
                    aria-expanded={expanded}
                >
                    {expanded ? "Read less" : "Read more"}
                </button>
            )}
        </div>
    );
}

export default function LargeProductSlider({ Products }) {
    const [index, setIndex] = useState(0);

    if (!Array.isArray(Products) || Products.length === 0) {
        return <div className="text-center py-8">No featured products found.</div>;
    }

    const current = Products[index];
    const product = current.product;
    const isNew = current.isNewProduct;

    const handlePrev = () => {
        setIndex((prevIndex) => (prevIndex === 0 ? Products.length - 1 : prevIndex - 1));
    };

    const handleNext = () => {
        setIndex((prevIndex) => (prevIndex === Products.length - 1 ? 0 : prevIndex + 1));
    };

    // Select image URL with fallback
    const imageUrl =
        product.Image?.[0]?.find((img) => img.size === "large")?.url ||
        product.Image?.[0]?.[0]?.url ||
        "/fallback.jpg";



    const hasColorVariants =
        Array.isArray(product.colorVariants) && product.colorVariants.length > 0;
    const hasSizeVariants =
        Array.isArray(product.sizeVariants) && product.sizeVariants.length > 0;

    const formData = {
        qty: 1,
        selectedColor: hasColorVariants ? product.colorVariants[0].value : null,
        selectedSize: hasSizeVariants ? product.sizeVariants[0].value : null,
    };

    return (
        <div className="max-w-6xl mx-auto relative">
            <h1 className="font-bold text-3xl sm:text-4xl mb-6 text-center text-gray-900">Deals of the Day</h1>

            <div className="rounded-xl shadow-xl overflow-hidden flex flex-col md:flex-row bg-white transition-all duration-500">
                {/* Left content */}
                <div className="w-full md:w-2/5 p-6 sm:p-8 flex flex-col justify-between space-y-4">
                    <div>
                        <h1 className="text-xl sm:text-2xl font-bold font-serif text-gray-800 relative">
                            {product.title}
                            {isNew && (
                                <span className="absolute top-0 right-0 transform translate-x-5 -translate-y-3 bg-pink-500 text-white text-xs px-2 py-1 rounded-full animate-pulse">
                                    New
                                </span>
                            )}
                        </h1>
                        <div className="mt-2">
                            <StarRating rating={product.rating} />
                        </div>

                        {/* Read More description */}
                        <ReadMore text={product.description} limit={80} />
                    </div>

                    <div>
                        <div className="flex items-baseline space-x-3">
                            <span className="text-blue-600 text-xl font-semibold">
                                ${product.price}
                            </span>
                            {product.discountPrice && (
                                <span className="text-gray-400 text-sm line-through">${product.discountPrice}</span>
                            )}
                        </div>
                        <div className="mt-3">
                            {hasColorVariants && hasSizeVariants ? (
                                <AddToCartButton product={product} formData={formData} />
                            ) : (
                                <button
                                    disabled
                                    className="inline-flex items-center justify-center px-3 py-1.5 text-sm font-medium text-white bg-gray-400 cursor-not-allowed rounded-lg"
                                >
                                    Not Available
                                </button>
                            )}
                        </div>
                    </div>
                </div>

                {/* Right image + overlay */}
                <div className="relative w-full md:w-3/5 group overflow-hidden rounded-lg">

                    {product.discountPercentage && (
                        <span className="absolute top-2 left-2 bg-orange-500 text-white text-xs font-semibold px-2 py-1 rounded-full z-10">
                            {product.discountPercentage}%
                        </span>
                    )}

                    <Image
                        src={imageUrl}
                        alt={product.title || "Product Image"}
                        width={600}
                        height={400}
                        className="object-cover rounded-lg"
                        priority
                    />

                    {/* Hover info */}
                    <div
                        className="absolute inset-0 bg-black bg-opacity-70 text-white p-4 sm:p-6
              -translate-x-full group-hover:translate-x-0
              transition-all duration-500 ease-in-out flex flex-col justify-center rounded-lg"
                    >
                        <h2 className="text-2xl sm:text-2xl text-center mb-3 text-amber-50">Quick Specs</h2>
                        <ul className="text-sm sm:text-base space-y-1 sm:space-y-2">
                            <li>
                                <strong>Material:</strong> {product.material || "N/A"}
                            </li>
                            <li>
                                <strong>Dimensions:</strong> {product.dimensions || "N/A"}
                            </li>
                            <li>
                                <strong>Weight:</strong> {product.weight || "N/A"}
                            </li>
                            <li>
                                <strong>Warranty:</strong> {product.warranty || "N/A"}
                            </li>
                            <li>
                                <strong>Return Policy:</strong> {product.returnPolicy || "N/A"}
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Navigation */}
            <div className="absolute top-1/2 left-0 w-full flex justify-between px-4 -translate-y-1/2 z-20">
                <NextPrivBTN onPrev={handlePrev} onNext={handleNext} />
            </div>
        </div>
    );
}
