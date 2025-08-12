'use client';

import { useState } from 'react';
import NextPrivBTN from './NextPrivBTN';
import Image from 'next/image';

function ImageSlider({ Images, loading, error }) {
    const [currentIndex, setCurrentIndex] = useState(0);

    const goToPrev = () => {
        setCurrentIndex((prev) => (prev === 0 ? Images.length - 1 : prev - 1));
    };

    const goToNext = () => {
        setCurrentIndex((prev) => (prev === Images.length - 1 ? 0 : prev + 1));
    };

    if (loading) {
        return (
            <div className="w-full h-[300px] flex items-center justify-center">
                Loading...
            </div>
        );
    }

    if (error || !Array.isArray(Images) || Images.length === 0) {
        return (
            <div className="w-full h-[300px] flex items-center justify-center text-gray-500">
                No images found
            </div>
        );
    }

    return (
        <div className="relative w-full overflow-hidden">
            <div className="relative sm:h-[300px] md:h-[400px] lg:h-[500px] transition-all duration-500">
                {Images.map((src, idx) => (
                    <Image
                        key={idx}
                        src={src}
                        alt={`Slide ${idx + 1}`}
                        width={1680}
                        height={500}
                        className={`absolute top-0 left-0 object-cover transition-opacity duration-700 ${idx === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
                        loading="lazy"
                        draggable={false}
                    />
                ))}
                <NextPrivBTN onPrev={goToPrev} onNext={goToNext} />
            </div>
        </div>
    );
}

export default ImageSlider;
