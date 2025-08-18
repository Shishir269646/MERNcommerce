"use client";

import React from 'react'
import CategoryCard from './CategoryCard'

function Category() {
    const categories = [
        {
            title: "Electronics",
            imageUrl: "https://cdn.easyfrontend.com/pictures/categories/category_1.png",
        },
        {
            title: "Fashion",
            imageUrl: "https://cdn.easyfrontend.com/pictures/categories/category_2.png",
        },
        {
            title: "Home & Kitchen",
            imageUrl: "https://cdn.easyfrontend.com/pictures/categories/category_3.png",
        },
        {
            title: "Books",
            imageUrl: "https://cdn.easyfrontend.com/pictures/categories/category_4.png",
        },
        {
            title: "Sports",
            imageUrl: "https://cdn.easyfrontend.com/pictures/categories/category_5.png",
        },
        {
            title: "Beauty",
            imageUrl: "https://cdn.easyfrontend.com/pictures/categories/category_6.png",
        },
    ];
    return (
        <div className="container mx-auto px-4 py-12">
            <h2 className="text-3xl font-bold text-center mb-8">Shop by Category</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                {categories.map((category, index) => (
                    <CategoryCard key={index} item={category} />
                ))}
            </div>
        </div>
    )
}

export default Category
