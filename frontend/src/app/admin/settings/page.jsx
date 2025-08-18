"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    fetchSettings,
    createSetting,
    updateSetting,
    deleteSetting,
} from "@/redux/settingsSlice";
import { getProducts } from "@/redux/productSlice";
import { toast } from "react-toastify";
import Loader from "@/components/Loader";
import Image from "next/image";




const SettingsPage = () => {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.user);
    const { settings, loading, error } = useSelector((state) => state.settings);
    const { products } = useSelector((state) => state.product);

    const [selectedSettingId, setSelectedSettingId] = useState(null);
    const [formProducts, setFormProducts] = useState([{ product: "", isNewProduct: false }]);

    // For files, store the File objects
    const [formImages, setFormImages] = useState([]);

    // For image previews, store preview URLs
    const [previewImages, setPreviewImages] = useState([]);

    useEffect(() => {
        if (user?._id) {
            dispatch(fetchSettings());
            dispatch(getProducts());
        }
    }, [dispatch, user]);

    const clearForm = () => {
        setSelectedSettingId(null);
        setFormProducts([{ product: "", isNewProduct: false }]);
        setFormImages([]);
        setPreviewImages([]);
    };

    const handleEdit = (setting) => {
        setSelectedSettingId(setting._id);
        const mappedProducts = setting.products.map((p) => ({
            product: typeof p.product === "object" ? p.product._id : p.product,
            isNewProduct: p.isNewProduct || false,
        }));
        setFormProducts(mappedProducts.length ? mappedProducts : [{ product: "", isNewProduct: false }]);
        setFormImages([]);
        setPreviewImages(setting.images || []);
    };


    const handleProductChange = (index, productId) => {
        const updated = formProducts.map((item, i) =>
            i === index
                ? {
                    ...item,
                    product: productId,
                }
                : item
        );
        setFormProducts(updated);
    };


    const handleImageChange = (e, index) => {
        const files = [...formImages];
        files[index] = e.target.files[0]; // one file per input
        setFormImages(files);
    };


    const handleAddImageInput = () => {
        setFormImages([...formImages, null]); // add an empty slot
    };

    const handleRemoveImageInput = (index) => {
        const updated = [...formImages];
        updated.splice(index, 1);
        setFormImages(updated);
    };


    const handleIsNewChange = (index, value) => {
        const updated = [...formProducts];
        updated[index].isNewProduct = value;
        setFormProducts(updated);
    };

    const handleAddProduct = () => {
        setFormProducts([...formProducts, { product: "", isNewProduct: false }]);
    };

    const handleRemoveProduct = (index) => {
        const updated = [...formProducts];
        updated.splice(index, 1);
        setFormProducts(updated.length ? updated : [{ product: "", isNewProduct: false }]);
    };


    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!user?._id) {
            toast.error("User not logged in");
            return;
        }

        for (const p of formProducts) {
            if (!p.product) {
                toast.error("Please select all products");
                return;
            }
        }

        if (formImages.length === 0 && previewImages.length === 0) {
            toast.error("Please upload at least one image");
            return;
        }

        // Prepare FormData for images and products
        const formData = new FormData();

        // Append products as JSON string to simplify backend parsing
        formData.append("products", JSON.stringify(formProducts));

        // Append images files (if any)
        formImages.forEach((file) => {
            formData.append("images", file);
            formData.append('type', 'setting');
        });


        try {
            if (selectedSettingId) {
                await dispatch(updateSetting({ id: selectedSettingId, formData })).unwrap();
                toast.success("Setting updated successfully");
            } else {
                await dispatch(createSetting(formData)).unwrap();
                toast.success("Setting created successfully");
            }
            clearForm();
            dispatch(fetchSettings());
        } catch (error) {
            toast.error(error?.message || "Operation failed");
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this setting?")) return;
        try {
            await dispatch(deleteSetting(id)).unwrap();
            toast.success("Setting deleted successfully");
            if (selectedSettingId === id) clearForm();
            dispatch(fetchSettings());
        } catch (error) {
            toast.error(error?.message || "Delete failed");
        }
    };

    if (loading) return <Loader />;






    return (
        <div className="p-6 max-w-5xl mx-auto">
            <h2 className="text-2xl font-bold mb-6 text-gray-900">Settings Management</h2>

            {/* SETTINGS LIST */}
            <div className="space-y-4 mb-12">
                {settings.length === 0 && (
                    <p className="text-gray-700">No settings found.</p>
                )}
                {settings.map((setting) => (
                    <div
                        key={setting._id}
                        className="border border-gray-200 p-4 rounded-lg shadow bg-base-100"
                    >
                        {/* <h3 className="font-semibold text-lg mb-1 text-gray-800">
                            Setting ID: {setting._id}
                        </h3>
                        <p className="text-sm text-gray-500 mb-2">
                            User: {setting.user?.username || setting.user}
                        </p> */}

                        <div>
                            <h4 className="font-semibold text-gray-800">Deals of the Day Products:</h4>
                            <ul className="list-disc ml-6 mb-2 text-gray-700">
                                {setting.products.map((p, idx) => (
                                    <li key={idx}>
                                        {p?.product?.title || p.product || "Unknown Product"} -{" "}
                                        <span className="font-semibold">
                                            {p.isNewProduct ? "New" : ""}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div>
                            <h4 className="font-semibold text-gray-800">Hero Banner Images:</h4>
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-2 mt-1">
                                {setting.images.map((img, i) => (
                                    <Image
                                        key={i}
                                        src={img}
                                        alt={`img-${i}`}
                                        width={96}
                                        height={96}
                                        loading="lazy"
                                        className="object-cover rounded border border-gray-700"
                                    />
                                ))}
                            </div>
                        </div>

                        <div className="mt-4 flex gap-2">
                            <button className="btn btn-outline" onClick={() => handleEdit(setting)}>
                                Edit
                            </button>
                            {/* <button
                            className="btn btn-error"
                            onClick={() => handleDelete(setting._id)}
                        >
                            Delete
                        </button> */}
                        </div>
                    </div>
                ))}
            </div>

            {/* CREATE / UPDATE FORM */}
            <form
                onSubmit={handleSubmit}
                className="border-t pt-6 max-w-3xl border-gray-300"
                encType="multipart/form-data"
                autoComplete="off"
            >
                <h3 className="text-xl font-semibold mb-4 text-gray-900">
                    {selectedSettingId ? "Update Setting" : "Create New Setting"}
                </h3>

                {/* Products Section */}
                <div className="mb-6">
                    <label className="font-medium block mb-2 text-gray-800">Deals of the Day Products</label>
                    {formProducts.map((item, index) => (
                        <div key={index} className="grid grid-cols-1 md:grid-cols-[1fr_auto_auto] gap-2 items-center mb-2">
                            <select
                                className="select select-bordered w-full text-black"
                                value={item.product}
                                onChange={(e) => handleProductChange(index, e.target.value)}
                                required
                            >
                                <option value="">Select Product</option>
                                {products.map((prod) => (
                                    <option key={prod._id} value={prod._id}>
                                        {prod.title}
                                    </option>
                                ))}
                            </select>

                            <label className="label cursor-pointer flex items-center gap-2 text-gray-700">
                                <input
                                    type="checkbox"
                                    className="checkbox text-gray-700"
                                    checked={item.isNewProduct}
                                    onChange={(e) => handleIsNewChange(index, e.target.checked)}
                                />
                                <span>New?</span>
                            </label>

                            <button
                                type="button"
                                className="btn btn-sm btn-error"
                                onClick={() => handleRemoveProduct(index)}
                                disabled={formProducts.length === 1}
                            >
                                Remove
                            </button>
                        </div>
                    ))}
                    <button
                        type="button"
                        onClick={handleAddProduct}
                        className="btn btn-sm btn-outline"
                    >
                        + Add Product
                    </button>
                </div>

                {/* Images Section */}
                <div className="space-y-2">
                    <label className="block font-semibold text-gray-800">Upload Images</label>

                    {formImages.map((img, index) => (
                        <div key={index} className="grid grid-cols-1 md:grid-cols-[1fr_auto] items-center gap-2 text-gray-700">
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => handleImageChange(e, index)}
                                className="file-input file-input-bordered text-gray-700"
                            />
                            <button
                                type="button"
                                onClick={() => handleRemoveImageInput(index)}
                                className="btn btn-sm btn-error"
                            >
                                Remove
                            </button>
                        </div>
                    ))}

                    <button
                        type="button"
                        onClick={handleAddImageInput}
                        className="btn btn-sm btn-primary"
                    >
                        Add More Images
                    </button>
                </div>

                {/* Submit and Cancel Buttons */}
                <div className="flex gap-4 mt-4">
                    <button type="submit" className="btn btn-primary">
                        {selectedSettingId ? "Update Setting" : "Create Setting"}
                    </button>

                    {selectedSettingId && (
                        <button
                            type="button"
                            onClick={clearForm}
                            className="btn btn-outline"
                        >
                            Cancel Edit
                        </button>
                    )}
                </div>

                {error && (
                    <p className="text-error mt-4">
                        Error: {typeof error === "string" ? error : JSON.stringify(error)}
                    </p>
                )}
            </form>




        </div>
    );

};

export default SettingsPage;
