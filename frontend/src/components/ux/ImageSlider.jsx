"use client";
import {  useState } from "react";
import NextPrivBTN from "./NextPrivBTN";

const images = [
    "https://opencart4.magentech.com/themes/so_emarket/layout4/image/cache/catalog/slideshow/home4/slide3-1680x500.jpg",
    "https://opencart4.magentech.com/themes/so_emarket/layout4/image/cache/catalog/slideshow/home4/slide2-1680x500.jpg",
    "https://opencart4.magentech.com/themes/so_emarket/layout4/image/cache/catalog/slideshow/home4/slide1-1680x500.jpg"
];

function ImageSlider() {
    const [index, setIndex] = useState(0);

    const handlePrev = () => {
        setIndex((prev) => (prev - 1 + images.length) % images.length);
    };

    const handleNext = () => {
        setIndex((prev) => (prev + 1) % images.length);
    };

    return (
        <div className="relative w-full overflow-hidden">
            <div className="w-full h-[500px]">
                <img
                    src={images[index]}
                    alt={`Slide ${index + 1}`}
                    className="w-full h-full object-cover transition-all duration-700 ease-in-out"
                />
            </div>

            {/* Reusable Navigation */}
            <NextPrivBTN onPrev={handlePrev} onNext={handleNext} />
        </div>
    );
}

export default ImageSlider;
