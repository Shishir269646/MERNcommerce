"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getProduct } from "@/redux/productSlice"; // ✅ Ensure this is a function, not an action creator
import Loader from "@/components/ux/Loader";
import toast from "react-hot-toast";
import ProductDetail from "@/components/ux/ProductDetail";

export default function ProductDetailPage() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await getProduct(id);
                setProduct(res.product);
            } catch (error) {
                toast.error("Product not found.");
            } finally {
                setLoading(false);
            }
        };

        if (id) fetchProduct();
    }, [id]);

    if (loading) return <Loader />;

    if (!product) {
        return (
            <div className="min-h-screen flex items-center justify-center text-gray-600 dark:text-gray-300">
                Product not found.
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 px-4 py-10">
            <ProductDetail product={product} />
        </div>
    );
}
