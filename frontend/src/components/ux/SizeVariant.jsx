'use client';

import { useEffect, useState } from 'react';

function SizeVariant({ sizeVariant = [], onSelect }) {
    const [selectedSize, setSelectedSize] = useState('');

    // Set default selected size on mount
    useEffect(() => {
        if (sizeVariant.length > 0) {
            const firstValid = sizeVariant.find((size) => !size.disabled);
            if (firstValid) {
                setSelectedSize(firstValid.value);

                // Notify parent with default selected size
                onSelect?.({
                    target: {
                        name: 'selectedSize',
                        value: firstValid.value,
                    },
                });
            }
        }
    }, [sizeVariant]);

    const handleSizeChange = (value) => {
        const selected = sizeVariant.find((size) => size.value === value);
        if (selected?.disabled) return;
        setSelectedSize(value);

        // Notify parent on selection change
        onSelect?.({
            target: {
                name: 'selectedSize',
                value,
            },
        });
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
