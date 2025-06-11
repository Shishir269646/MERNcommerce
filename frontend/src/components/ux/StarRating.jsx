"use client";
import React from "react";
import { FiStar } from 'react-icons/fi';



const StarRating = ({ rating }) => {
    return (
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
    );
};

export default StarRating;
