"use client";
import { useState } from "react";
import Image from "next/image";

export default function ProductGallery({ images }) {
   
    
    const formattedImages = images.map((sizeGroup) => {
        const small = sizeGroup.find((img) => img.size === "small")?.url || "";
        const large = sizeGroup.find((img) => img.size === "large")?.url || small;
        return { small, large };
    });

    const [selectedImage, setSelectedImage] = useState(
        formattedImages[0]?.large || ""
    );

    return (
        <div className="w-full space-y-4">
            {/* Main Preview */}
            <div className="relative w-full aspect-[4/3] md:aspect-square rounded-xl border overflow-hidden">
                <Image
                    src={selectedImage}
                    alt="Product Preview"
                    fill
                    className="object-contain p-2 sm:p-4 transition-all duration-300"
                    priority
                />
            </div>

            {/* Thumbnails */}
            <div className="flex gap-3 sm:gap-4 overflow-x-auto sm:justify-center">
                {formattedImages.map((img, idx) => (
                    <button
                        key={idx}
                        onClick={() => setSelectedImage(img.large)}
                        className={`relative w-16 h-16 sm:w-20 sm:h-20 flex-shrink-0 border rounded-lg overflow-hidden 
              ${img.large === selectedImage
                                ? "ring-2 ring-blue-500"
                                : "hover:opacity-75"
                            }`}
                    >
                        <Image
                            src={img.small}
                            alt={`Thumbnail ${idx + 1}`}
                            fill
                            className="object-contain"
                        />
                    </button>
                ))}
            </div>
        </div>
    );
}
