"use client";
import React, { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RiMenuUnfold3Fill } from "react-icons/ri";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";
import HoverDropDown from "./HoverDropDown";
import { fetchCategories } from "@/redux/categorySlice";
import { useRouter } from "next/navigation";

function Navbar() {
    const dispatch = useDispatch();
    const router = useRouter();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        dispatch(fetchCategories());
    }, [dispatch]);

    const categories = useSelector((state) => state.category.categories);

    // Handle category click → go to product list
    const handleCategoryClick = useCallback((categoryName) => {
        const params = new URLSearchParams();
        if (categoryName && categoryName !== "All Categories") {
            params.set("category", categoryName);
        }
        router.push(`/products?${params.toString()}`);
    }, [router]);

    // Dropdown options for HoverDropDown
    const categoryOptions = [
        { label: "All Categories", onClick: () => handleCategoryClick("All Categories") },
        ...categories.map((c) => ({
            label: c.name,
            onClick: () => handleCategoryClick(c.name),
        }))
    ];

    const navLinks = [
        { href: "/", label: "Home" },
        { href: "/products", label: "Products" },
        { href: "/about", label: "About Us" },
        { href: "/contact", label: "Contact Us" },
        { href: "/cart", label: "Cart'S" },
        { href: "/orders", label: "Orders" },
        { href: "/profile", label: "Profile" },
        { href: "/login", label: "Log In" },
        { href: "/register", label: "Register" },
    ];

    return (
        <div className="bg-primary">
            <div className="container mx-auto px-4 py-2 flex items-center justify-between">
                {/* Left - Categories Dropdown */}
                <div className="flex items-center gap-2 text-sm font-medium uppercase">
                    <div className="flex items-center gap-2 px-3 py-2 rounded-sm bg-orange-500 text-white transition">
                        <RiMenuUnfold3Fill />
                        <HoverDropDown label="All Categories" options={categoryOptions} />
                    </div>
                </div>

                {/* Desktop Menu */}
                <ul className="hidden lg:flex text-white text-md gap-8 items-center">
                    {navLinks.map((link, idx) => (
                        <li key={idx}>
                            <a href={link.href} className="hover:text-orange-500">
                                {link.label}
                            </a>
                        </li>
                    ))}
                </ul>

                {/* Mobile Menu Button */}
                <button
                    className="lg:hidden text-white text-2xl"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                    {mobileMenuOpen ? <HiOutlineX /> : <HiOutlineMenu />}
                </button>
            </div>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <div className="lg:hidden bg-primary text-white px-4 pb-4">
                    <ul className="flex flex-col gap-4 mt-4">
                        {navLinks.map((link, idx) => (
                            <li key={idx}>
                                <a
                                    href={link.href}
                                    className="block hover:text-orange-500"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    {link.label}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}

export default Navbar;
