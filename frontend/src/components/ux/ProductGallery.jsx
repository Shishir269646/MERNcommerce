"use client";
import { useState } from "react";
import Image from "next/image";

export default function ProductGallery({ images }) {



    const [selectedImage, setSelectedImage] = useState(images?.[0]);

    return (
        <div className="w-full space-y-4">
            {/* Main Preview */}
            <div className="relative w-full aspect-square rounded-xl border overflow-hidden">
                <Image
                    src={selectedImage}
                    alt="Product Preview"
                    fill
                    className="object-contain p-4 transition-all duration-300"
                    priority
                />
            </div>

            {/* Thumbnails */}
            <div className="flex gap-4 overflow-x-auto">
                {images.map((img, idx) => (
                    <button
                        key={idx}
                        onClick={() => setSelectedImage(img)}
                        className={`relative w-20 h-20 flex-shrink-0 border rounded-lg overflow-hidden 
              ${img === selectedImage ? "ring-2 ring-blue-500" : "hover:opacity-75"}`}
                    >
                        <Image
                            src={img}
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
