"use client";

import React, { useState, useRef, useEffect } from "react";
import { FaSearch, FaStream, FaShoppingBasket } from "react-icons/fa";
import HoverDropDown from "./HoverDropDown";
import MiniShoppingCart from "./MiniShoppingCart";

const TopHeader = ({ basketCount }) => {
  const [searchOpen, setSearchOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const basketRef = useRef();

  // Close basket dropdown on outside click
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (basketRef.current && !basketRef.current.contains(e.target)) {
        setIsVisible(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  // Account menu options
  const handleRegister = () => console.log("Register clicked");
  const handleLogin = () => console.log("Login clicked");
  const accountOptions = [
    { label: "Register", onClick: handleRegister },
    { label: "Log In", onClick: handleLogin },
  ];

  // Category menu options
  const categoryOptions = [
    { label: "Electronics", onClick: () => console.log("Electronics") },
    { label: "Fashion", onClick: () => console.log("Fashion") },
    { label: "Home & Kitchen", onClick: () => console.log("Home & Kitchen") },
  ];

  return (
    <header className="bg-primary text-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
      {/* Top Bar */}
      <div className="container mx-auto flex justify-between items-center py-3 px-4">
        {/* Mobile Menu Toggle */}
        <div className="flex items-center gap-4">
          <button
            className="lg:hidden text-white text-2xl"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle Menu"
          >
            ☰
          </button>
        </div>

        {/* Right Side - Desktop Only */}
        <div className="hidden lg:flex items-center gap-4">
          <HoverDropDown label="My Account" options={accountOptions} />
          <span>|</span>
          <a href="#" className="hover:underline">
            Wish List
          </a>
          <span>|</span>
          <a href="#" className="hover:underline">
            Checkout
          </a>
          <span>|</span>
          <a href="#" className="hover:underline">
            Log In
          </a>
        </div>
      </div>

      {/* Divider */}
      <hr className="border-gray-300 dark:border-gray-700" />

      {/* Main Navigation */}
      <div className="container mx-auto flex flex-col lg:flex-row items-center justify-between py-3 px-4">
        {/* Logo */}
        <div className="text-2xl font-bold">
          <a href="#">MERNcommerce</a>
        </div>

        {/* Search & Category */}
        <div className="flex items-center gap-4 mt-3 lg:mt-0">
          {/* Category dropdown */}
          <div className="flex items-center gap-2 border bg-gray-100 text-black border-gray-300 rounded-lg px-4 py-2 hover:bg-primary hover:text-white transition cursor-pointer select-none">
            <FaStream />
            <HoverDropDown label="All Category" options={categoryOptions} />
          </div>

          {/* Desktop Search */}
          <form className="hidden lg:flex items-center border rounded-lg overflow-hidden">
            <input
              type="text"
              placeholder="Search Product"
              className="px-4 py-2 outline-none text-gray-700 dark:text-white bg-gray-100 dark:bg-gray-800"
            />
            <button type="submit" className="bg-primary text-white px-4 py-2">
              <FaSearch />
            </button>
          </form>

          {/* Mobile Search Icon */}
          <button
            onClick={() => setSearchOpen(!searchOpen)}
            className="lg:hidden text-white text-xl"
            aria-label="Open Search"
          >
            <FaSearch />
          </button>
        </div>

        {/* Basket Toggle with Dropdown */}
        <div className="hidden lg:flex relative" ref={basketRef}>
          <button
            onClick={() => setIsVisible(!isVisible)}
            className="relative p-2 text-white bg-gray-800 rounded-full hover:bg-gray-700"
            aria-label="Toggle Basket"
          >
            <FaShoppingBasket size={20} />
            {basketCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                {basketCount}
              </span>
            )}
          </button>
          {isVisible && <MiniShoppingCart />}
        </div>
      </div>

      {/* Mobile Search Input */}
      {searchOpen && (
        <div className="container mx-auto px-4 pb-4 lg:hidden">
          <form className="flex items-center border rounded-lg overflow-hidden">
            <input
              type="text"
              placeholder="Search Product"
              className="px-4 py-2 w-full outline-none text-gray-700 dark:text-white bg-gray-100 dark:bg-gray-800"
            />
            <button type="submit" className="bg-primary text-white px-4 py-2">
              <FaSearch />
            </button>
          </form>
        </div>
      )}

  
    </header>
  );
};

export default TopHeader;
