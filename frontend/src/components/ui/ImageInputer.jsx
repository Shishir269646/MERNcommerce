'use client';

import React, { useState, useEffect } from 'react';
import { FaCloudUploadAlt } from "react-icons/fa";

function ImageInputer({ onChange }) {
    const [preview, setPreview] = useState(null);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setPreview(URL.createObjectURL(file));
            if (onChange) onChange(e);
        }
    };

    useEffect(() => {
        
        return () => {
            if (preview) URL.revokeObjectURL(preview);
        };
    }, [preview]);

    return (
        <div className="w-full max-w-xs grid gap-5">
            <div className="w-full py-6 px-4 bg-gray-50 rounded-2xl border border-gray-300 border-dashed">
                <div className="grid gap-3">
                    {preview ? (
                        <img
                            src={preview}
                            alt="Preview"
                            className="w-full h-40 object-contain rounded-lg border"
                        />
                    ) : (
                        <div className="flex flex-col items-center justify-center">
                            <FaCloudUploadAlt className="h-10 w-10 text-gray-400 mb-2" />
                            <h2 className="text-center text-gray-400 text-xs font-light leading-4">
                                PNG, JPG smaller than 15MB
                            </h2>
                        </div>
                    )}

                    <div className="grid gap-2">
                        <h4 className="text-center text-gray-900 text-sm font-medium leading-snug">
                            Drag and Drop your Image here or
                        </h4>
                        <div className="flex items-center justify-center">
                            <label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    name="Image"
                                    hidden
                                    onChange={handleFileChange}
                                />
                                <div className="flex w-28 h-9 px-2 flex-col bg-indigo-600 rounded-full shadow text-white text-xs font-semibold leading-4 items-center justify-center cursor-pointer">
                                    Choose File
                                </div>
                            </label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ImageInputer;
