'use client';

import React, { useEffect, Suspense } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchWishlist, removeFromWishlist } from '@/redux/wishlistSlice';
import Link from 'next/link';
import Image from 'next/image';
import { IoMdHeartEmpty } from "react-icons/io";
import { MdDeleteForever } from "react-icons/md";
import Loader from '@/components/Loader';

const WishlistPage = () => {
    const dispatch = useDispatch();
    const { wishlist, loading } = useSelector((state) => state.wishlist);
    const { user } = useSelector((state) => state.user);

    useEffect(() => {
        if (user) {
            dispatch(fetchWishlist());
        }
    }, [dispatch, user]);

    const handleRemove = (productId) => {
        dispatch(removeFromWishlist(productId));
    };

    if (loading) {
        return (<Loader />)

    }

    if (!wishlist?.products?.length) {
        return (
            <div className="p-10 text-center text-base-content">
                <IoMdHeartEmpty size={48} className="mx-auto text-primary mb-4" />
                <p className="text-lg">Your wishlist is empty!</p>
                <Link href="/" className="btn btn-primary mt-4">
                    Start Shopping
                </Link>
            </div>
        );
    }

    return (
        <Suspense fallback={<div>Loading wishlist...</div>}>
            <div className="p-6 max-w-7xl mx-auto">
                <h1 className="text-3xl font-bold mb-8 text-primary">Your Wishlist</h1>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {wishlist.products.map((product) => (
                        <div
                            key={product._id}
                            className="card bg-base-100 shadow-lg hover:shadow-xl transition-all duration-300 group relative"
                        >
                            <figure className="relative w-full h-56">

                                <Image
                                    src={
                                        product.Image?.[0]?.find(img => img.size === "small")?.url ||
                                        product.Image?.[0]?.[0]?.url ||
                                        '/fallback.jpg'
                                    }
                                    alt={product.title || 'Product Image'}
                                    loading='lazy'
                                    fill
                                    sizes="(max-width: 768px) 100vw, 33vw"
                                    className="object-cover rounded-t-lg"
                                />
                            </figure>
                            <div className="card-body">
                                <h2 className="card-title text-lg truncate">
                                    {product.title}
                                </h2>
                                <p className="text-sm truncate">
                                    {product.description}
                                </p>
                                <div className="flex items-center justify-between mt-3">
                                    <span className="text-primary font-bold text-xl">
                                        ${product.price}
                                    </span>
                                    <button
                                        onClick={() => handleRemove(product._id)}
                                        className="btn btn-sm btn-outline btn-error z-10"
                                    >
                                        <MdDeleteForever size={18} />
                                    </button>
                                </div>
                                <Link
                                    href={`/product/${product.slug || product._id}`}
                                    className="absolute inset-0 z-0"
                                    aria-label={`View ${product.name}`}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </Suspense>
    );
};

export default WishlistPage;
