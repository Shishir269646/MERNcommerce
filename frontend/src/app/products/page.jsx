"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "@/redux/productSlice";

import ProductCard from "@/components/ux/ProductCard";
import Loader from "@/components/ux/Loader";
import toast from "react-hot-toast";


export default function ProductsPage() {
    const dispatch = useDispatch();
    const { products, loading, error } = useSelector((state) => state.product);


    useEffect(() => {
        dispatch(getProducts());
    }, [dispatch]);

    useEffect(() => {
        if (error) {
            toast.error(error);
        }
    }, [error]);

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-base-200 py-10 px-4">
            <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
                All Products
            </h1>

            {loading ? (
                <Loader />
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {products.length > 0 ? (
                        products.map((product) => (
                            <ProductCard key={product._id} item={product} />
                        ))
                    ) : (
                        <p className="text-center text-gray-600 col-span-full">
                            No products found.
                        </p>
                    )}
                </div>
            )}
        </div>
    );
}