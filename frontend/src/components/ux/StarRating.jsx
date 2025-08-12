"use client";
import React from "react";
import { FiStar } from 'react-icons/fi';



const StarRating = ({ rating, review }) => {
    return (
        <div className="mt-2 flex items-center gap-2">
            <div className="flex items-center">
                {Array.from({ length: 5 }).map((_, i) => (
                    <FiStar
                        key={i}
                        className={`h-4 w-4 ${i < Math.round(rating)
                            ? 'text-yellow-400 fill-current'
                            : 'text-gray-300 dark:text-gray-500'
                            }`}
                    />
                ))}
            </div>
            <p className="text-sm font-medium text-gray-900 dark:text-white">
                {rating.toFixed(1)}
            </p>
            {review > 0 && (
                <p className="text-sm text-gray-500 dark:text-gray-400">
                    ({review})
                </p>
            )}
        </div>
    );
};

export default StarRating;
