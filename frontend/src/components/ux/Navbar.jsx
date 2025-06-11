"use client";
import React from 'react';
import { RiMenuUnfold3Fill } from "react-icons/ri";
import HoverDropDown from "./HoverDropDown";

function Navbar() {

    const handleRegister = () => {
        console.log("Register clicked");
    };

    const handleLogin = () => {
        console.log("Login clicked");
    };

    const AllCatagory = [
        { label: "Register", onClick: handleRegister },
        { label: "Log In", onClick: handleLogin },
    ];
    return (
        <div className="bg-primary">

            <ul className="text-white text-md gap-8 px-4 py-2 items-center lg:menu-horizontal">

                <button className="flex px-4 py-2 text-sm font-medium items-center uppercase gap-2 rounded-sm bg-[#ffd200] text-gray-950 transition">
                    <RiMenuUnfold3Fill />
                    <div className="dropdown dropdown-hover">
                        <HoverDropDown label="All Categories" options={AllCatagory} />
                    </div>
                </button>
                <li><a href="/about" className="hover:text-[#ffd200]">About Us</a></li>
                <li><a href="/contact" className="hover:text-[#ffd200]">Contact Us</a></li>
                <li><a href="/login" className="hover:text-[#ffd200]">Log In</a></li>
                <li><a href="/orders" className="hover:text-[#ffd200]">Order'S</a></li>
                <li><a href="/product" className="hover:text-[#ffd200]">Product</a></li>
                <li><a href="/products" className="hover:text-[#ffd200]">Product'S</a></li>
                <li><a href="/profile" className="hover:text-[#ffd200]">Profile</a></li>
                <li><a href="/register" className="hover:text-[#ffd200]">Register</a></li>
                <li><a href="/" className="hover:text-[#ffd200]">Home</a></li>
            </ul>
        </div>
    )
}

export default Navbar;



