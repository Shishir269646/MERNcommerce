'use client';

import { useDispatch, useSelector } from 'react-redux';
import {
    fetchWishlist,
    addToWishlist,
    removeFromWishlist,
} from '@/redux/wishlistSlice';
import { useState, useEffect } from 'react';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { FiEye } from 'react-icons/fi';
import StarRating from './StarRating';
import AddToCartButton from './AddToCartButton';
import ProductQuickView from './ProductQuickView';
import Image from 'next/image';
import Link from 'next/link';

const ProductCard = ({ item }) => {
    const dispatch = useDispatch();
    const { wishlist } = useSelector((state) => state.wishlist);

    const [showQuickView, setShowQuickView] = useState(false);
    const [isWishlisted, setIsWishlisted] = useState(false);

    // fetch wishlist
    useEffect(() => {
        if (!wishlist?.products || wishlist.products.length === 0) {
            dispatch(fetchWishlist());
        }
    }, [dispatch, wishlist]);

    // Check if current item is in wishlist
    useEffect(() => {
        if (wishlist && item?._id) {
            const exists = wishlist.products?.some(
                (w) => String(w?._id || w) === String(item._id)
            );
            setIsWishlisted(exists);
        } else {
            setIsWishlisted(false);
        }
    }, [wishlist?.products, item]);

    if (!item) return null;

    const hasColorVariants =
        Array.isArray(item.colorVariants) && item.colorVariants.length > 0;
    const hasSizeVariants =
        Array.isArray(item.sizeVariants) && item.sizeVariants.length > 0;

    const formData = {
        qty: 1,
        selectedColor: hasColorVariants ? item.colorVariants[0].value : null,
        selectedSize: hasSizeVariants ? item.sizeVariants[0].value : null,
    };

    const actionButtonClass =
        'rounded-lg p-2 text-gray-500 hover:bg-orange-500 hover:text-white';

    const toggleWishlist = () => {
        if (isWishlisted) {
            dispatch(removeFromWishlist(item._id));
        } else {
            dispatch(addToWishlist(item._id));
        }
    };

    return (
        <div className="relative rounded-lg border border-gray-200 bg-white p-4 shadow-sm w-full max-w-sm mx-auto">
            {/* Wishlist Icon */}
            <button
                className={`${actionButtonClass} absolute top-2 right-2 z-10`}
                onClick={toggleWishlist}
                title={isWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
            >
                {isWishlisted ? (
                    <FaHeart className="text-orange-500" />
                ) : (
                    <FaRegHeart />
                )}
            </button>

            {/* Product Image */}
            <div className="relative w-full aspect-[4/3] overflow-hidden rounded-lg">
                <div>

                    {item.discountPercentage && (
                        <span className="absolute top-2 left-2 bg-orange-500 text-white text-xs font-semibold px-2 py-1 rounded-full z-10">
                            {item.discountPercentage}%
                        </span>
                    )}


                    <Link href={`/product/${item._id}`} className="block w-full h-full">
                        <Image
                            src={
                                item.Image?.[0]?.find(img => img.size === "small")?.url ||
                                item.Image?.[0]?.[0]?.url ||
                                '/fallback.jpg'
                            }
                            alt={item.title || 'Product Image'}
                            fill
                            sizes="100%"
                            className="object-cover w-full h-full rounded-lg"
                        />

                    </Link>
                </div>
            </div>

            {/* Product Name */}
            <Link
                href={`/product/${item._id}`}
                className="mt-3 block text-base font-semibold text-gray-900 hover:underline truncate"
                title={item.title}
            >
                {item.title}
            </Link>

            {/* Ratings */}
            <div className="mt-1">
                <StarRating
                    rating={item.rating}
                    review={item.reviewCount?.toLocaleString()}
                />
            </div>

            {/* Price + Cart */}
            <div className="mt-4 flex items-center justify-between flex-wrap">
                <div className="flex items-baseline space-x-2">
                    <span className="text-blue-700 dark:text-blue-400 text-xl font-semibold">
                        {`$${item.price}`}
                    </span>
                    {item.discountPrice && (
                        <span className="text-gray-400 text-sm line-through">
                            {`$${item.discountPrice}`}
                        </span>
                    )}
                </div>

                {hasColorVariants && hasSizeVariants ? (
                    <AddToCartButton product={item} formData={formData} />
                ) : (
                    <button
                        disabled
                        className="inline-flex items-center justify-center px-3 py-1.5 text-sm font-medium text-white bg-gray-400 cursor-not-allowed rounded-lg"
                    >
                        Not Available
                    </button>
                )}
            </div>

            {/* Quick View */}
            <div className="mt-4">
                <button
                    onClick={() => setShowQuickView(true)}
                    className="w-full rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 flex items-center justify-center gap-2"
                    title="Quick View"
                >
                    <FiEye className="h-5 w-5" />
                    Quick View
                </button>
            </div>

            {/* Quick View Modal */}
            {showQuickView && (
                <ProductQuickView
                    product={item}
                    onClose={() => setShowQuickView(false)}
                />
            )}
        </div>
    );
};

export default ProductCard;
