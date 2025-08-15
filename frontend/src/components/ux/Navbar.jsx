"use client";
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RiMenuUnfold3Fill } from "react-icons/ri";
import HoverDropDown from "./HoverDropDown";
import { fetchCategories } from "@/redux/categorySlice";

function Navbar() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchCategories());
    }, [dispatch]);

    const categories = useSelector((state) => state.category.categories);

    const AllCatagory = categories.map((cat) => ({
        label: cat.name,
        onClick: () => alert(`You clicked on ${cat.name}`),
    }));

    return (
        <div className="bg-primary">
            <ul className="container mx-auto text-white text-md gap-8 px-4 py-2 items-center lg:menu-horizontal flex flex-wrap">
                <div className="flex px-4 py-2 text-sm font-medium items-center uppercase gap-2 rounded-sm bg-[#ffd200] text-white text-gray-950 transition">
                    <RiMenuUnfold3Fill />
                    <HoverDropDown label="All Categories" options={AllCatagory} />
                </div>

                <li><a href="/about" className="hover:text-[#ffd200]">About Us</a></li>
                <li><a href="/contact" className="hover:text-[#ffd200]">Contact Us</a></li>
                <li><a href="/login" className="hover:text-[#ffd200]">Log In</a></li>
                <li><a href="/cart" className="hover:text-[#ffd200]">Order'S</a></li>
                <li><a href="/product" className="hover:text-[#ffd200]">Product</a></li>
                <li><a href="/products" className="hover:text-[#ffd200]">Product'S</a></li>
                <li><a href="/profile" className="hover:text-[#ffd200]">Profile</a></li>
                <li><a href="/register" className="hover:text-[#ffd200]">Register</a></li>
                <li><a href="/" className="hover:text-[#ffd200]">Home</a></li>
            </ul>
        </div>
    );
}

export default Navbar;
