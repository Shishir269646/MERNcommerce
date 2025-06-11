"use client";
import { useEffect } from "react";
import { X } from 'lucide-react';

const QuickViewModal = ({ product, onClose }) => {
    // Escape key to close modal
    useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, [onClose]);

    return (
        <div
            className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center"
            role="dialog"
            aria-modal="true"
        >
            <div className="relative bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 rounded-2xl shadow-2xl w-full max-w-2xl mx-4 overflow-hidden animate-fade-in">
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                    aria-label="Close"
                >
                    <X size={24} />
                </button>

                {/* Modal Content */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
                    {/* Image Section */}
                    <div>
                        <img
                            src={product.image}
                            alt={product.name}
                            className="rounded-lg object-cover w-full h-64"
                            onError={(e) => {
                                e.target.src = '/fallback-image.png';
                            }}
                        />
                    </div>

                    {/* Details Section */}
                    <div className="flex flex-col">
                        <h2 className="text-2xl font-bold">{product.name}</h2>
                        <p className="text-lg text-green-600 font-semibold mt-2">
                            ${product.price}
                        </p>

                        <div className="mt-3 flex items-center gap-1 text-yellow-500">
                            {'★'.repeat(Math.floor(product.rating))}
                            {'☆'.repeat(5 - Math.floor(product.rating))}
                            <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">
                                {product.rating} / 5
                            </span>
                        </div>

                        <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
                            {product.description}
                        </p>

                        <div className="mt-auto pt-6">
                            <button className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition">
                                Add to Cart
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default QuickViewModal;
