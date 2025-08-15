"use client";

import { useEffect } from "react";
import { useParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductById } from "@/redux/productSlice";
import Loader from "@/components/Loader";
import toast from "react-hot-toast";
import ProductDetail from "@/components/ux/ProductDetail";


export default function ProductDetailPage() {
    const { id } = useParams();
    const dispatch = useDispatch();

    const { selectedProduct: product, loading, error } = useSelector(
        (state) => state.product
    );

    useEffect(() => {
        if (id) {
            dispatch(fetchProductById(id));
        }
    }, [dispatch, id]);



    useEffect(() => {
        if (error) {
            toast.error(error);
        }
    }, [error]);

    if (loading) return <Loader />;

    if (!product || Object.keys(product).length === 0) {
        return (
            <div className="min-h-screen flex items-center justify-center text-gray-600">
                Product not found.
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100 px-4 py-10">
            <ProductDetail product={product} />
            
        </div>
    );
}
