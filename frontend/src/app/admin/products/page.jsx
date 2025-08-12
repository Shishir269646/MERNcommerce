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
        <div className="p-4 min-h-screen text-foreground">

            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Admin Products</h1>

                <Button
                    onClick={handleRedirect}
                    className="bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
                >
                    Add New Product
                </Button>
            </div>


            {loading ? (
                <span className="loading loading-dots loading-xl" />
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {Array.isArray(products) && products.length > 0 ? (
                        products.map((product) => (
                            <Card
                                key={product._id}
                                className="rounded-2xl shadow-md bg-white dark:bg-gray-800"
                            >
                                <CardContent className="p-4">
                                    <Image
                                        src={getImageUrl(product.Image)}
                                        alt={product.title || "Product Image"}
                                        width={250}
                                        height={160}
                                        className="w-full object-cover rounded-lg mb-2"
                                    />

                                    <h2 className="text-lg font-semibold dark:text-gray-100">
                                        {product.title}
                                    </h2>
                                    <p className="text-sm text-muted-foreground dark:text-gray-400 mb-2">
                                        ${product.price}
                                    </p>

                                    <div className="flex justify-between">
                                        <Button
                                            size="sm"
                                            variant="outline"
                                            onClick={() =>
                                                router.push(`/admin/products/edit/${product._id}`)
                                            }
                                            className="border-gray-300 dark:border-gray-600 dark:text-gray-200"
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
                        <p className="text-gray-600 dark:text-gray-400">
                            No products found.
                        </p>
                    )}
                </div>
            )}
        </div>
    );
}
