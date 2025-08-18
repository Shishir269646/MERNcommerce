"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts, deleteProduct } from "@/redux/productSlice";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { FaPencilAlt, FaRegTrashAlt } from "react-icons/fa";
import { toast } from "react-toastify";
import Image from "next/image";
// import { get } from "react-hook-form"; // (unused)

export default function AdminProductsPage() {
    const dispatch = useDispatch();
    const router = useRouter();
    const { products, loading } = useSelector((state) => state.product);

    const handleRedirect = () => {
        router.push("/admin/products/create");
    };

    const fetchProducts = () => {
        dispatch(getProducts());
    };

    const getImageUrl = (imagePath) => {
        if (!imagePath) return null;
        if (typeof imagePath === "string") {
            return imagePath.startsWith("http")
                ? imagePath
                : `https://mern-project-uploads.s3.us-east-1.amazonaws.com/${imagePath}`;
        }
        if (Array.isArray(imagePath) && imagePath.length > 0) {
            return getImageUrl(imagePath[0]);
        }
        return null;
    };

    const handleDelete = async (id) => {
        try {
            if (confirm("Are you sure you want to delete this product?")) {
                await dispatch(deleteProduct(id));
                toast.success("Product deleted successfully!");
                fetchProducts();
            }
        } catch (error) {
            toast.error(`Failed to delete product: ${error}`);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    return (
        <div className="p-4 min-h-screen text-neutral-900 dark:bg-neutral-900 dark:text-neutral-100 transition-colors">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Admin Products</h1>

                <Button
                    onClick={handleRedirect}
                    className="bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
                >
                    Add New Product
                </Button>
            </div>

            {/* Product Grid */}
            {loading ? (
                <span className="loading loading-dots loading-xl" />
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {Array.isArray(products) && products.length > 0 ? (
                        products.map((product) => (
                            <Card
                                key={product._id}
                                className="rounded-2xl shadow-md border border-neutral-200 bg-white dark:border-neutral-700 dark:bg-neutral-800 transition-colors"
                            >
                                <CardContent className="p-4">
                                    {/* Image */}
                                    <Image
                                        src={
                                            getImageUrl(
                                                product.Image?.[0]?.find((img) => img.size === "small")?.url ||
                                                product.Image?.[0]?.[0]?.url ||
                                                "/fallback.jpg"
                                            )
                                        }
                                        alt={product.title || "Product Image"}
                                        width={300}
                                        height={170}
                                        loading="lazy"
                                        className="object-cover rounded-sm mb-4"
                                    />

                                    {/* Title */}
                                    <h2 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
                                        {product.title}
                                    </h2>

                                    {/* Price */}
                                    <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-2">
                                        ${product.price}
                                    </p>

                                    {/* Actions */}
                                    <div className="flex justify-between">
                                        <Button
                                            size="sm"
                                            variant="outline"
                                            onClick={() =>
                                                router.push(`/admin/products/edit/${product._id}`)
                                            }
                                            className="border-neutral-300 text-neutral-800 hover:bg-neutral-100 dark:border-neutral-600 dark:text-neutral-200 dark:hover:bg-neutral-700"
                                        >
                                            <FaPencilAlt className="w-4 h-4 mr-1" />
                                            Edit
                                        </Button>

                                        <Button
                                            size="sm"
                                            variant="destructive"
                                            onClick={() => handleDelete(product._id)}
                                            className="bg-red-600 hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-600"
                                        >
                                            <FaRegTrashAlt className="w-4 h-4 mr-1" />
                                            Delete
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        ))
                    ) : (
                        <p className="text-neutral-600 dark:text-neutral-400">No products found.</p>
                    )}
                </div>
            )}
        </div>
    );
}
