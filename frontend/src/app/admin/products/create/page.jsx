"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { addProduct } from "@/redux/productSlice";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ImageInputer from "@/components/ui/ImageInputer";

const CreateProductPage = () => {
    const dispatch = useDispatch();
    const { register, handleSubmit, reset } = useForm();

    // Preview + Thumb image pairs state
    const [previewThumbPairs, setPreviewThumbPairs] = useState([{ preview: null, thumb: null }]);

    // Handle file input change for preview or thumb at given index
    const handleFileChange = (index, field, files) => {
        const updatedPairs = [...previewThumbPairs];
        updatedPairs[index][field] = files[0];
        setPreviewThumbPairs(updatedPairs);
    };

    // Add a new empty preview+thumb pair
    const addPair = () => {
        setPreviewThumbPairs([...previewThumbPairs, { preview: null, thumb: null }]);
    };

    // ✅ FINALIZED onSubmit with correct file field names for multer
    const onSubmit = async (data) => {
        try {
            const formData = new FormData();

            // Text fields
            formData.append("title", data.title);
            formData.append("description", data.description);
            formData.append("price", data.price);
            formData.append("discountPrice", data.discountPrice || "");
            formData.append("stock", data.stock);
            formData.append("brand", data.brand);
            formData.append("category", data.category);
            formData.append("sku", data.sku);
            formData.append("material", data.material || "");
            formData.append("dimensions", data.dimensions || "");
            formData.append("weight", data.weight || "");
            formData.append("warranty", data.warranty || "");
            formData.append("returnPolicy", data.returnPolicy || "");

            // ✅ Append image files using correct field names
            previewThumbPairs.forEach(({ preview, thumb }) => {
                if (preview) formData.append("previews", preview);
                if (thumb) formData.append("thumbs", thumb);
            });

            // Submit
            await dispatch(addProduct(formData)).unwrap();

            toast.success("Product created successfully!");
            reset();
            setPreviewThumbPairs([{ preview: null, thumb: null }]);
        } catch (error) {
            toast.error("Failed to create product. Please try again.");
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)} className="max-w-3xl mx-auto p-4 space-y-6">
                <input type="text" placeholder="Title" {...register("title", { required: true })} className="input" />
                <textarea placeholder="Description" {...register("description", { required: true })} className="input" rows={3} />
                <input type="number" step="0.01" placeholder="Price" {...register("price", { required: true })} className="input" />
                <input type="number" step="0.01" placeholder="Discount Price" {...register("discountPrice")} className="input" />
                <input type="number" placeholder="Stock" {...register("stock", { required: true })} className="input" />
                <input type="text" placeholder="Brand" {...register("brand", { required: true })} className="input" />
                <input type="text" placeholder="Category" {...register("category", { required: true })} className="input" />
                <input type="text" placeholder="SKU" {...register("sku", { required: true })} className="input" />
                <input type="text" placeholder="Material" {...register("material")} className="input" />
                <input type="text" placeholder="Dimensions" {...register("dimensions")} className="input" />
                <input type="text" placeholder="Weight" {...register("weight")} className="input" />
                <input type="text" placeholder="Warranty" {...register("warranty")} className="input" />
                <input type="text" placeholder="Return Policy" {...register("returnPolicy")} className="input" />

                {/* Image pairs */}
                <div>
                    <h3 className="font-semibold mb-2">Preview & Thumbnail Images</h3>
                    {previewThumbPairs.map((pair, index) => (
                        <div key={index} className="flex items-center gap-6 mb-4">
                            <div>
                                <label className="block text-sm font-medium mb-1">Preview Image</label>
                                <ImageInputer onChange={(e) => handleFileChange(index, "preview", e.target.files)} />

                                {pair.preview && (
                                    <p className="text-xs mt-1 text-gray-600">{pair.preview.name}</p>
                                )}
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Thumbnail Image</label>
                                <ImageInputer onChange={(e) => handleFileChange(index, "thumb", e.target.files)} />
                                {pair.thumb && (
                                    <p className="text-xs mt-1 text-gray-600">{pair.thumb.name}</p>
                                )}
                            </div>
                        </div>
                    ))}
                    <button
                        type="button"
                        onClick={addPair}
                        className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
                    >
                        Add More Preview + Thumb
                    </button>
                </div>

                <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                    Create Product
                </button>
            </form>

            <ToastContainer position="top-right" autoClose={3000} hideProgressBar />

            <style jsx>{`
                .input {
                    width: 100%;
                    padding: 0.5rem;
                    border: 1px solid #ccc;
                    border-radius: 0.375rem;
                    margin-bottom: 0.75rem;
                }
            `}</style>
        </>
    );
};

export default CreateProductPage;
