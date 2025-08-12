"use client";

import { useState } from "react";
import NextPrivBTN from "./NextPrivBTN";
import StarRating from "./StarRating";
import AddToCartButton from "./AddToCartButton";
import Image from "next/image";

const products = [
    {
        name: "Biru Putaran",
        isNew: true,
        rating: 4.5,
        description: "Especially good for container gardening...",
        price: 200,
        oldPrice: 250,
        discount: 15,
        image: "https://sc01.alicdn.com/kf/HTB1Cic9HFXXXXbZXpXXq6xXFXXX3/200006212/HTB1Cic9HFXXXXbZXpXXq6xXFXXX3.jpg",
        sunNeeds: "Full Sun",
        soilNeeds: "Damp",
        zones: "9 - 11",
        height: "2 - 3 feet",
        bloomsIn: "Mid‑Summer - Mid‑Fall",
        features: "Tolerates heat",
    },
    {
        name: "Marigold Blaze",
        isNew: false,
        rating: 4.0,
        description: "Bright and cheerful, ideal for borders and pots.",
        price: 150,
        oldPrice: 180,
        discount: 10,
        image: "https://sc01.alicdn.com/kf/HTB1Cic9HFXXXXbZXpXXq6xXFXXX3/200006212/HTB1Cic9HFXXXXbZXpXXq6xXFXXX3.jpg",
        sunNeeds: "Full Sun",
        soilNeeds: "Well-drained",
        zones: "3 - 10",
        height: "1 - 2 feet",
        bloomsIn: "Late Spring - Early Fall",
        features: "Pest resistant",
    },
    {
        name: "Lavender Mist",
        isNew: true,
        rating: 5.0,
        description: "Fragrant purple blooms perfect for aromatherapy.",
        price: 220,
        oldPrice: 270,
        discount: 20,
        image: "https://sc01.alicdn.com/kf/HTB1Cic9HFXXXXbZXpXXq6xXFXXX3/200006212/HTB1Cic9HFXXXXbZXpXXq6xXFXXX3.jpg",
        sunNeeds: "Full Sun",
        soilNeeds: "Dry",
        zones: "5 - 9",
        height: "1.5 - 3 feet",
        bloomsIn: "Early Summer - Mid Fall",
        features: "Drought tolerant, Attracts bees",
    },
];



function LargeProductSlider({ Products }) {


    console.log("Products in LargeProductSlider:", Products);

    const [index, setIndex] = useState(0);

    // Defensive fallback
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

    return (
        <div className="max-w-6xl mx-auto relative">
            <h1 className="font-bold text-3xl sm:text-4xl mb-6 text-center">Deals of the Day</h1>

            <div className="rounded-xl shadow-xl overflow-hidden flex flex-col md:flex-row bg-white dark:bg-gray-800 transition-all duration-500">
                {/* Left content */}
                <div className="w-full md:w-2/5 p-6 sm:p-8 flex flex-col justify-between space-y-6">
                    <div>
                        <h1 className="text-2xl sm:text-3xl font-serif text-gray-800 dark:text-white relative">
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
                        <p className="mt-4 text-base sm:text-lg text-gray-600 dark:text-gray-300">{product.description}</p>
                    </div>

                    <div>
                        <div className="flex items-baseline space-x-3 mt-4">
                            <span className="text-blue-600 dark:text-blue-400 text-xl font-semibold">${product.price}</span>
                            {product.discountPrice && (
                                <span className="text-gray-400 text-sm line-through">${product.discountPrice}</span>
                            )}
                        </div>
                        <div className="mt-6">
                            <AddToCartButton productId={product._id} />
                        </div>
                    </div>
                </div>

                {/* Right image + overlay */}
                <div className="relative w-full md:w-3/5 group overflow-hidden">
                    {product.discountPercentage && (
                        <span className="absolute top-2 left-2 bg-orange-500 text-white text-xs font-semibold px-2 py-1 rounded-full z-10">
                            {product.discountPercentage}%
                        </span>
                    )}


                    <Image
                        src={product.Image?.[0] || "/placeholder.jpg"}
                        alt={product.title}
                        width={800}
                        height={600}
                        className="w-full h-80 md:h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />

                    {/* Hover info */}
                    <div
                        className="absolute inset-0 bg-black bg-opacity-70 text-white p-4 sm:p-6 
            -translate-x-full group-hover:translate-x-0 
            transition-all duration-500 ease-in-out flex flex-col justify-center"
                    >
                        <h2 className="text-xl sm:text-2xl text-center mb-3">Quick Specs</h2>
                        <ul className="text-sm sm:text-base space-y-1 sm:space-y-2">
                            <li><strong>Material:</strong> {product.material || 'N/A'}</li>
                            <li><strong>Dimensions:</strong> {product.dimensions || 'N/A'}</li>
                            <li><strong>Weight:</strong> {product.weight || 'N/A'}</li>
                            <li><strong>Warranty:</strong> {product.warranty || 'N/A'}</li>
                            <li><strong>Return Policy:</strong> {product.returnPolicy || 'N/A'}</li>
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



export default LargeProductSlider;
