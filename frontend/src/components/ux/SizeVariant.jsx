'use client';

import { useState } from 'react';

function SizeVariant({ sizeVariant }) {
    const [selectedSize, setSelectedSize] = useState(
        sizeVariant.length > 0 ? sizeVariant[0].value : ''
    );

    const handleSizeChange = (value) => {
        const selected = sizeVariant.find((size) => size.value === value);
        if (selected?.disabled) return;
        setSelectedSize(value);
    };

    return (
        <div className="mb-6">
            <h5 className="font-medium mb-2">
                Size:{' '}
                <span className="opacity-50">
                    {selectedSize &&
                        sizeVariant.find((size) => size.value === selectedSize)?.title}
                </span>
            </h5>
            <div className="flex flex-wrap gap-2 mb-2">
                {sizeVariant.map((size) => (
                    <div key={size.value}>
                        <input
                            type="radio"
                            name="size-variant"
                            id={`size-${size.value}`}
                            className="absolute hidden"
                            autoComplete="off"
                            checked={selectedSize === size.value}
                            onChange={() => handleSizeChange(size.value)}
                        />
                        <label
                            htmlFor={`size-${size.value}`}
                            className={`bg-gray-100 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-blue-100/[0.2]
                            py-1 px-4 rounded-full border text-sm mt-1 
                            ${selectedSize === size.value
                                    ? 'border-blue-600 dark:border-blue-600'
                                    : 'border-blue-50 dark:border-blue-600 dark:border-opacity-20'
                                } 
                            ${size.disabled
                                    ? 'line-through opacity-40 cursor-not-allowed'
                                    : 'cursor-pointer'
                                }`}
                        >
                            {size.label}
                        </label>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default SizeVariant;
