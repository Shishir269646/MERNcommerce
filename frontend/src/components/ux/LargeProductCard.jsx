"use client";

import { useState } from "react";
import NextPrivBTN from "./NextPrivBTN";
import StarRating from "./StarRating";
import AddToCartButton from "./AddToCartButton";


const products = [
    {
        name: 'Biru Putaran',
        isNew: true,
        rating: 4.5,
        description: 'Especially good for container gardening...',
        price: 200,
        oldPrice: 250,
        discount: 15,
        image: 'https://sc01.alicdn.com/kf/HTB1Cic9HFXXXXbZXpXXq6xXFXXX3/200006212/HTB1Cic9HFXXXXbZXpXXq6xXFXXX3.jpg',
        sunNeeds: 'Full Sun',
        soilNeeds: 'Damp',
        zones: '9 - 11',
        height: '2 - 3 feet',
        bloomsIn: 'Mid‑Summer - Mid‑Fall',
        features: 'Tolerates heat'
    },
    {
        name: 'Marigold Blaze',
        isNew: false,
        rating: 4.0,
        description: 'Bright and cheerful, ideal for borders and pots.',
        price: 150,
        oldPrice: 180,
        discount: 10,
        image: 'https://sc01.alicdn.com/kf/HTB1Cic9HFXXXXbZXpXXq6xXFXXX3/200006212/HTB1Cic9HFXXXXbZXpXXq6xXFXXX3.jpg',
        sunNeeds: 'Full Sun',
        soilNeeds: 'Well-drained',
        zones: '3 - 10',
        height: '1 - 2 feet',
        bloomsIn: 'Late Spring - Early Fall',
        features: 'Pest resistant'
    },
    {
        name: 'Lavender Mist',
        isNew: true,
        rating: 5.0,
        description: 'Fragrant purple blooms perfect for aromatherapy.',
        price: 220,
        oldPrice: 270,
        discount: 20,
        image: 'https://sc01.alicdn.com/kf/HTB1Cic9HFXXXXbZXpXXq6xXFXXX3/200006212/HTB1Cic9HFXXXXbZXpXXq6xXFXXX3.jpg',
        sunNeeds: 'Full Sun',
        soilNeeds: 'Dry',
        zones: '5 - 9',
        height: '1.5 - 3 feet',
        bloomsIn: 'Early Summer - Mid Fall',
        features: 'Drought tolerant, Attracts bees'
    }
];

function LargeProductSlider() {
    const [index, setIndex] = useState(0);
    const product = products[index];


    // Handle Previous and Next Product navigation
    const handlePrev = () => {
        setIndex((prevIndex) => (prevIndex === 0 ? products.length - 1 : prevIndex - 1));
    };

    const handleNext = () => {
        setIndex((prevIndex) => (prevIndex === products.length - 1 ? 0 : prevIndex + 1));
    };

    return (
        <div className="max-w-6xl mx-auto relative">
            <h1 className="font-bold text-4xl mb-3 text-center">Deals of the days</h1>
            <div className="rounded-lg shadow-2xl overflow-hidden flex flex-col md:flex-row bg-white transition-all duration-500">
                <div className="w-full md:w-2/5 p-8 flex flex-col justify-between">
                    <div>
                        <h1 className="text-3xl font-serif text-gray-800 relative">
                            {product.name}
                            {product.isNew && (
                                <span className="absolute top-0 right-0 transform translate-x-5 -translate-y-3 bg-pink-300 text-white text-sm px-2 py-1 rounded animate-pulse">
                                    New
                                </span>
                            )}
                        </h1>
                        <div className="flex">
                            <StarRating rating={product.rating} />
                        </div>
                        <p className="mt-6 text-lg text-gray-600 font-farsan">{product.description}</p>
                    </div>
                    <div className="flex items-baseline space-x-2 mt-4">
                        <span className="text-blue-700 text-xl font-semibold">${product.price}</span>
                        <span className="text-gray-400 text-sm line-through">${product.oldPrice}</span>
                    </div>
                    <div className="mt-8">
                        <AddToCartButton />
                    </div>
                </div>

                <div className="relative w-full md:w-3/5 overflow-hidden group">
                    {product.discount && (
                        <span className="absolute top-2 left-2 bg-orange-400 text-white text-xs font-semibold px-2 py-1 rounded-full">
                            {product.discount}%
                        </span>
                    )}
                    <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black/80 text-white p-6 
                        -translate-x-full group-hover:translate-x-0 
                        transition-all duration-500 ease-in-out 
                        flex flex-col justify-center">
                        <h2 className="text-2xl text-center mb-4">The Description</h2>
                        <ul className="space-y-2">
                            <li><strong>Sun Needs:</strong> {product.sunNeeds}</li>
                            <li><strong>Soil Needs:</strong> {product.soilNeeds}</li>
                            <li><strong>Zones:</strong> {product.zones}</li>
                            <li><strong>Height:</strong> {product.height}</li>
                            <li><strong>Blooms in:</strong> {product.bloomsIn}</li>
                            <li><strong>Features:</strong> {product.features}</li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Reusable Navigation Buttons */}
            <div className="absolute top-1/2 left-0 w-full flex justify-between px-4 -translate-y-1/2 z-10">
                <NextPrivBTN onPrev={handlePrev} onNext={handleNext} />

            </div>
        </div>
    );
}

export default LargeProductSlider;
