export const dynamic = "force-dynamic"; // ✅ Prevent static prerender

"use client";

import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from 'next/navigation';
import { getProducts } from "@/redux/productSlice";
import { fetchCategories } from "@/redux/categorySlice";
import ProductCard from "@/components/ux/ProductCard";
import Loader from "@/components/Loader";
import toast from "react-hot-toast";

export default function ProductsPage() {
    const dispatch = useDispatch();
    const searchParams = useSearchParams();

    const { products, loading: productsLoading, error: productsError } = useSelector((state) => state.product);
    const { categories, loading: categoriesLoading, error: categoriesError } = useSelector((state) => state.category);

    const searchTerm = searchParams.get('q') || '';
    const categoryTerm = searchParams.get('category') || '';

    useEffect(() => {
        dispatch(getProducts());
        dispatch(fetchCategories());
    }, [dispatch]);

    useEffect(() => {
        if (productsError) toast.error(productsError);
        if (categoriesError) toast.error(categoriesError);
    }, [productsError, categoriesError]);

    const filteredProducts = useMemo(() => {
        let tempProducts = products;

        if (categoryTerm) {
            const selectedCategoryObject = categories.find(cat => cat.name.toLowerCase() === categoryTerm.toLowerCase());
            if (selectedCategoryObject) {
                const selectedCategoryId = selectedCategoryObject._id;
                tempProducts = tempProducts.filter(product => {
                    const productCategoryId = product.category?._id || product.category;
                    return productCategoryId === selectedCategoryId;
                });
            } else {
                tempProducts = [];
            }
        }

        if (searchTerm) {
            tempProducts = tempProducts.filter(product =>
                product.title.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }
        return tempProducts;
    }, [products, searchTerm, categoryTerm, categories]);

    const isLoading = productsLoading || categoriesLoading;

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-base-200 py-10 px-4">
            <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-gray-800">
                    {searchTerm ? `Search Results for "${searchTerm}"` : (categoryTerm || "All Products")}
                </h1>
                <p className="text-gray-600 mt-2">{filteredProducts.length} products found</p>
            </div>

            {isLoading ? (
                <Loader />
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {filteredProducts.length > 0 ? (
                        filteredProducts.map((product) => (
                            <ProductCard key={product._id} item={product} />
                        ))
                    ) : (
                        <p className="text-center text-gray-600 col-span-full">
                            No products found matching your criteria.
                        </p>
                    )}
                </div>
            )}
        </div>
    );
}
