'use client';

import React, { useState, useRef, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { FaSearch, FaStream, FaShoppingBasket } from "react-icons/fa";
import HoverDropDown from "./HoverDropDown";
import MiniShoppingCart from "./MiniShoppingCart";
import { fetchCategories } from "@/redux/categorySlice";
import { logoutUser } from "@/redux/userSlice";
import api from "@/utils/api";

export default function TopHeader() {
    const [hydrated, setHydrated] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [cartOpen, setCartOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All Category");
    const cartRef = useRef();

    const dispatch = useDispatch();
    const router = useRouter();
    const searchParams = useSearchParams();
    const { isAuthenticated } = useSelector((s) => s.user);
    const categories = useSelector((s) => s.category.categories);
    const { cartItems } = useSelector((state) => state.cart);

    useEffect(() => {
        setHydrated(true);
        dispatch(fetchCategories());

        const handleOutsideClick = (e) => {
            if (cartRef.current && !cartRef.current.contains(e.target)) {
                setCartOpen(false);
            }
        };
        document.addEventListener("mousedown", handleOutsideClick);
        return () => document.removeEventListener("mousedown", handleOutsideClick);
    }, [dispatch]);

    
    
    useEffect(() => {
        const categoryFromUrl = searchParams.get('category');
        if (categoryFromUrl) {
            setSelectedCategory(categoryFromUrl);
        } else {
            setSelectedCategory("All Category");
        }
    }, [searchParams]);

    const handleLogout = useCallback(() => {
        dispatch(logoutUser());
        delete api.defaults.headers.common["Authorization"];
        router.push("/login");
    }, [dispatch, router]);

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        const params = new URLSearchParams();
        if (searchTerm.trim()) {
            params.set("q", searchTerm.trim());
        }
        if (selectedCategory && selectedCategory !== "All Category") {
            params.set("category", selectedCategory);
        }
        router.push(`/products?${params.toString()}`);
        setSearchOpen(false);
    };

    const handleCategoryClick = (categoryName) => {
        setSelectedCategory(categoryName);
        const params = new URLSearchParams();
        if (categoryName && categoryName !== "All Category") {
            params.set("category", categoryName);
        }
        router.push(`/products?${params.toString()}`);
    };

    const categoryOptions = [
        { label: "All Category", onClick: () => handleCategoryClick("All Category") },
        ...categories.map((c) => ({
            label: c.name,
            onClick: () => handleCategoryClick(c.name),
        }))
    ];

    const accountOptions = isAuthenticated
        ? [{ label: "Dashboard", LinkUrl: "/account" }, { label: "Log Out", onClick: handleLogout }]
        : [{ label: "Register", LinkUrl: "/register" }, { label: "Log In", LinkUrl: "/login" }];

    const basketCount = cartItems.reduce((sum, item) => sum + (item.quantity || 1), 0);

    if (!hydrated) return null;

    const TopLinks = () => (
        <div className="flex flex-col lg:flex-row items-center gap-4 py-2 lg:py-0">
            <HoverDropDown label="My Account" options={accountOptions} />
            <span>|</span>
            <Link href="/wishlist" className="hover:underline">Wish List</Link>
            <span>|</span>
            <Link href="/checkout" className="hover:underline">Checkout</Link>
            {isAuthenticated ? (
                <>
                    <span>|</span>
                    <button onClick={handleLogout} className="hover:underline">Log Out</button>
                </>
            ) : (
                <>
                    <span>|</span>
                    <Link href="/login" className="hover:underline">Log In</Link>
                </>
            )}
        </div>
    );

    return (
        <header className="bg-primary text-white border-b border-gray-200">
            {/* Top Strip */}
            <div className="container mx-auto flex justify-between items-center py-3 px-4">
                <button className="lg:hidden text-white text-2xl" onClick={() => setMenuOpen(!menuOpen)}>
                    ☰
                </button>
                <div className="hidden lg:flex"><TopLinks /></div>
            </div>

            {/* Mobile Menu Dropdown */}
            {menuOpen && (
                <div className="lg:hidden bg-primary border-t border-gray-300">
                    <div className="container mx-auto px-4 pt-4 pb-2">
                        <TopLinks />
                    </div>
                </div>
            )}

            <hr className="border-gray-300" />

            {/* Main Row */}
            <div className="container mx-auto flex flex-col lg:flex-row items-center justify-between py-3 px-4 gap-4">
                <div className="text-2xl font-bold">
                    <Link href="/">MERNcommerce</Link>
                </div>

                <div className="flex bg-gray-100 rounded-sm items-center gap-4">
                    <div className="flex items-center gap-2 rounded-l-sm bg-gray-400 text-black px-4 py-2">
                        <FaStream />
                        <HoverDropDown label={selectedCategory} options={categoryOptions} />
                    </div>
                    <form onSubmit={handleSearchSubmit} className="hidden bg-white lg:flex items-center overflow-hidden">
                        <input 
                            type="text" 
                            name="q"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="Search Product" 
                            className="px-4 py-2 outline-none text-gray-700 bg-gray-100" />
                        <button type="submit" className="h-full text-black px-4 py-2">
                            <FaSearch />
                        </button>
                    </form>
                    <button type="button" onClick={() => setSearchOpen(!searchOpen)} className="lg:hidden text-black pr-2 text-xl">
                        <FaSearch />
                    </button>
                </div>

                <div className="relative" ref={cartRef}>
                    <button onClick={() => setCartOpen(!cartOpen)} className="flex items-center btn bg-[#1d64df] text-white font-medium border-[#005fd8]">
                        <FaShoppingBasket className="mr-2" size={30} />
                        <span className="hidden sm:inline">My cart</span>
                        {basketCount > 0 && (
                            <span className="absolute -top-1 -right-1 bg-orange-500 text-black text-sm font-bold w-5 h-5 flex items-center justify-center rounded-full">
                                {basketCount}
                            </span>
                        )}
                    </button>
                    <MiniShoppingCart isVisible={cartOpen} setIsVisible={setCartOpen} basketRef={cartRef} />
                </div>
            </div>

            {/* Mobile Search Bar */}
            {searchOpen && (
                <div className="container mx-auto px-4 pb-4 lg:hidden">
                    <form onSubmit={handleSearchSubmit} className="flex items-center border rounded-lg overflow-hidden">
                        <input 
                            type="text" 
                            name="q"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="Search Product" 
                            className="px-4 py-2 w-full outline-none text-gray-700 bg-gray-100" />
                        <button type="submit" className="bg-orange-500 text-white px-4 py-2">
                            <FaSearch />
                        </button>
                    </form>
                </div>
            )}
        </header>
    );
}