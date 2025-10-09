"use client"; // ✅ must come first (before any export)

export const dynamic = "force-dynamic"; // Prevent static prerender

import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "next/navigation";
import { getProducts } from "@/redux/productSlice";
import { fetchCategories } from "@/redux/categorySlice";
import ProductCard from "@/components/ui/ProductCard";
import Loader from "@/components/ui/Loader";
import toast from "react-hot-toast";

export default function ProductsPage() {
    const dispatch = useDispatch();
    const searchParams = useSearchParams();

    const { products, loading: productsLoading, error: productsError } = useSelector(
        (state) => state.product
    );
    const { categories, loading: categoriesLoading, error: categoriesError } = useSelector(
        (state) => state.category
    );

    const searchTerm = searchParams.get("q") || "";
    const categoryTerm = searchParams.get("category") || "";

    // Fetch data once on mount
    useEffect(() => {
        dispatch(getProducts());
        dispatch(fetchCategories());
    }, [dispatch]);

    // Show toast if errors occur
    useEffect(() => {
        if (productsError) toast.error(productsError);
        if (categoriesError) toast.error(categoriesError);
    }, [productsError, categoriesError]);

    // Filter products based on search & category
    const filteredProducts = useMemo(() => {
        let tempProducts = [...products]; // Create a copy to avoid mutations

        // Filter by category (if not "All Categories")
        if (categoryTerm && categoryTerm !== "All Categories") {
            tempProducts = tempProducts.filter((product) => {
                // Since category is stored as a string in your model
                // Compare directly with the category string (case-insensitive)
                return product.category?.toLowerCase() === categoryTerm.toLowerCase();
            });
        }

        // Filter by search term (search in title)
        if (searchTerm) {
            tempProducts = tempProducts.filter((product) =>
                product.title.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        return tempProducts;
    }, [products, searchTerm, categoryTerm]);

    const isLoading = productsLoading || categoriesLoading;

    // Get display title for the page
    const getPageTitle = () => {
        if (searchTerm && categoryTerm && categoryTerm !== "All Categories") {
            return `Search Results for "${searchTerm}" in ${categoryTerm}`;
        } else if (searchTerm) {
            return `Search Results for "${searchTerm}"`;
        } else if (categoryTerm && categoryTerm !== "All Categories") {
            return categoryTerm;
        }
        return "All Products";
    };

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-base-200 py-10 px-4">
            <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
                    {getPageTitle()}
                </h1>
                <p className="text-gray-600 dark:text-gray-400 mt-2">
                    {isLoading
                        ? "Loading products..."
                        : `${filteredProducts.length} product${filteredProducts.length !== 1 ? 's' : ''} found`
                    }
                </p>
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
                        <div className="col-span-full text-center py-16">
                            <p className="text-xl text-gray-600 dark:text-gray-400 mb-2">
                                No products found
                            </p>
                            <p className="text-sm text-gray-500 dark:text-gray-500">
                                Try adjusting your search or category filters
                            </p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}