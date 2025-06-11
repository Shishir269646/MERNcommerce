"use client";

import {  useState } from "react";
import { FiChevronDown, FiFilter, FiAward } from 'react-icons/fi';


import 'swiper/css';
import 'swiper/css/navigation';

const sortOptions = [
    { value: 'most-popular', label: 'The most popular' },
    { value: 'newest', label: 'Newest' },
    { value: 'price-asc', label: 'Increasing price' },
    { value: 'price-desc', label: 'Decreasing price' },
    { value: 'reviews', label: 'No. reviews' },
    { value: 'discount', label: 'Discount %' },
];



const initialProducts = [
    {
        id: '1',
        name: 'Apple iMac 27", 1TB HDD, Retina 5K Display, M3 Max',
        price: 1699,
        discountPercentage: 35,
        rating: 5.0,
        reviewCount: 455,
        imageLight: 'https://flowbite.s3.amazonaws.com/blocks/e-commerce/imac-front.svg',
        imageDark: 'https://flowbite.s3.amazonaws.com/blocks/e-commerce/imac-front-dark.svg',
        features: ['Fast Delivery', 'Best Price'],
    },
    {
        id: '2',
        name: 'Apple iPhone 15 Pro Max, 256GB, Blue Titanium',
        price: 1199,
        discountPercentage: 15,
        rating: 4.9,
        reviewCount: 1233,
        imageLight: 'https://flowbite.s3.amazonaws.com/blocks/e-commerce/iphone-light.svg',
        imageDark: 'https://flowbite.s3.amazonaws.com/blocks/e-commerce/iphone-dark.svg',
        features: ['Best Seller', 'Best Price'],
        isBestSeller: true,
    },
    {
        id: '3',
        name: 'iPad Pro 13-Inch (M4): XDR Display, 512GB',
        price: 799,
        discountPercentage: 35,
        rating: 4.9,
        reviewCount: 879,
        imageLight: 'https://flowbite.s3.amazonaws.com/blocks/e-commerce/ipad-light.svg',
        imageDark: 'https://flowbite.s3.amazonaws.com/blocks/e-commerce/ipad-dark.svg',
        features: ['Shipping Today', 'Best Price'],
        deliveryTime: 'Today',
    },
    {
        id: '4',
        name: 'iPad Pro 13-Inch (M4): XDR Display, 512GB',
        price: 799,
        discountPercentage: 35,
        rating: 4.9,
        reviewCount: 879,
        imageLight: 'https://flowbite.s3.amazonaws.com/blocks/e-commerce/ipad-light.svg',
        imageDark: 'https://flowbite.s3.amazonaws.com/blocks/e-commerce/ipad-dark.svg',
        features: ['Shipping Today', 'Best Price'],
        deliveryTime: 'Today',
    },
    {
        id: '5',
        name: 'iPad Pro 13-Inch (M4): XDR Display, 512GB',
        price: 799,
        discountPercentage: 35,
        rating: 4.9,
        reviewCount: 879,
        imageLight: 'https://flowbite.s3.amazonaws.com/blocks/e-commerce/ipad-light.svg',
        imageDark: 'https://flowbite.s3.amazonaws.com/blocks/e-commerce/ipad-dark.svg',
        features: ['Shipping Today', 'Best Price'],
        deliveryTime: 'Today',
    },
];


const ProductListing = () => {
    const [showSortDropdown, setShowSortDropdown] = useState(false);
    const [selectedSort, setSelectedSort] = useState('most-popular');
    const [products, setProducts] = useState(initialProducts);


    // Handle sorting
    const handleSort = (value) => {
        setSelectedSort(value);
        setShowSortDropdown(false);

        const sorted = [...products];
        switch (value) {
            case 'price-asc':
                sorted.sort((a, b) => a.price - b.price);
                break;
            case 'price-desc':
                sorted.sort((a, b) => b.price - a.price);
                break;
            case 'newest':
                sorted.sort((a, b) => parseInt(b.id) - parseInt(a.id));
                break;
            case 'reviews':
                sorted.sort((a, b) => b.reviewCount - a.reviewCount);
                break;
            case 'discount':
                sorted.sort((a, b) => b.discountPercentage - a.discountPercentage);
                break;
            default:
                sorted.sort((a, b) => b.rating - a.rating);
                break;
        }
        setProducts(sorted);
    };

    // Render star ratings



    return (
        <section className="bg-gray-50 py-8 dark:bg-gray-900 md:py-12">
            <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
                {/* Breadcrumb and Header */}
                <div className="mb-4 flex flex-col justify-between gap-4 sm:flex-row md:mb-8">


                    {/* Sort and Filter Buttons */}
                    <div className="flex gap-4">
                        <button className="flex items-center border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 rounded-lg dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700">
                            <FiFilter className="mr-2 h-4 w-4" />
                            Filters
                            <FiChevronDown className="ml-2 h-4 w-4" />
                        </button>

                        <div className="relative">
                            <button
                                onClick={() => setShowSortDropdown(!showSortDropdown)}
                                className="flex items-center border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 rounded-lg dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                            >
                                <FiAward className="mr-2 h-4 w-4" />
                                Sort
                                <FiChevronDown className="ml-2 h-4 w-4" />
                            </button>

                            {showSortDropdown && (
                                <ul className="absolute right-0 z-10 mt-1 w-44 rounded-lg bg-white shadow dark:bg-gray-700">
                                    {sortOptions.map((option) => (
                                        <li key={option.value}>
                                            <button
                                                onClick={() => handleSort(option.value)}
                                                className={`w-full px-4 py-2 text-left text-sm ${selectedSort === option.value
                                                    ? 'text-primary-700 dark:text-primary-500'
                                                    : 'text-gray-600 dark:text-gray-300'
                                                    } hover:bg-gray-100 dark:hover:bg-gray-600`}
                                            >
                                                {option.label}
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    </div>
                </div>

                {/* Products Swiper Slider */}



            </div>
        </section>
    );
};

export default ProductListing;