"use client";

import { useEffect, useState } from "react";
import { getProducts } from "@/redux/productSlice";

import ProductCard from "@/components/ux/ProductCard";
import Loader from "@/components/ux/Loader";
import toast from "react-hot-toast";


export default function ProductsPage() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchProducts = async () => {
        try {
            const res = await getProducts();
            setProducts(res.products);
        } catch (err) {
            toast.error("Failed to load products");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-10 px-4">
            <h1 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-8">
                All Products
            </h1>

            {loading ? (
                <Loader />
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {products.length > 0 ? (
                        products.map((product) => (
                            <ProductCard key={product._id} product={product} />
                        ))
                    ) : (
                        <p className="text-center text-gray-600 dark:text-gray-300 col-span-full">
                            No products found.
                        </p>
                    )}
                </div>
            )}
        </div>
    );
}
