"use client";
import { Fragment, useState, useEffect } from "react";

function ColorVariant({ colorVariant = [], onSelect }) {
    const [selectedColor, setSelectedColor] = useState("");

    useEffect(() => {
        if (colorVariant.length > 0) {
            setSelectedColor(colorVariant[0].value);

            // Notify parent of default selection
            onSelect?.({
                target: {
                    name: "selectedColor",
                    value: colorVariant[0].value,
                },
            });
        }
    }, [colorVariant]);

    const handleColorChange = (value) => {
        setSelectedColor(value);
        onSelect?.({
            target: {
                name: "selectedColor",
                value,
            },
        });
    };

    return (
        <div className="mb-6">
            <h5 className="font-medium mb-2">
                Color: <span className="opacity-50">{selectedColor}</span>
            </h5>
            <div className="flex flex-wrap gap-2 mb-2">
                {colorVariant.map((item, i) => (
                    <Fragment key={i}>
                        <input
                            type="radio"
                            className="hidden"
                            autoComplete="off"
                            checked={selectedColor === item.value}
                            onChange={() => handleColorChange(item.value)}
                        />
                        <label
                            className={`w-8 h-8 rounded-full ${item.bgcolor} cursor-pointer mt-1 
                ${selectedColor === item.value
                                    ? "ring-2 ring-offset-2 ring-blue-500"
                                    : "ring-1 ring-gray-300"
                                }`}
                            onClick={() => handleColorChange(item.value)}
                        />
                    </Fragment>
                ))}
            </div>
        </div>
    );
}

export default ColorVariant;
