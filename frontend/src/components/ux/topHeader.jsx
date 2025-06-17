"use client";

import React, { useState, useRef, useEffect } from "react";
import { FaSearch, FaStream, FaShoppingBasket } from "react-icons/fa";
import HoverDropDown from "./HoverDropDown";
import MiniShoppingCart from "./MiniShoppingCart";

const TopHeader = () => {
  const [searchOpen, setSearchOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const basketRef = useRef();

  const [basketItems, setBasketItems] = useState([
    {
      id: 1,
      name: "Common Projects",
      detail: "Bball High",
      color: "White",
      img: "https://designmodo.com/demo/shopping-cart/item-1.png",
      price: 549,
      quantity: 1,
    },
    {
      id: 2,
      name: "Maison Margiela",
      detail: "Future Sneakers",
      color: "White",
      img: "https://designmodo.com/demo/shopping-cart/item-2.png",
      price: 870,
      quantity: 1,
    },
    {
      id: 3,
      name: "Our Legacy",
      detail: "Brushed Scarf",
      color: "Brown",
      img: "https://designmodo.com/demo/shopping-cart/item-3.png",
      price: 349,
      quantity: 1,
    },
  ]);

  const basketCount = basketItems.reduce((sum, item) => sum + item.quantity, 0);

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (basketRef.current && !basketRef.current.contains(e.target)) {
        setIsVisible(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  const accountOptions = [
    { label: "Register", onClick: () => console.log("Register clicked") },
    { label: "Log In", onClick: () => console.log("Login clicked") },
  ];

  const categoryOptions = [
    { label: "Electronics", onClick: () => console.log("Electronics") },
    { label: "Fashion", onClick: () => console.log("Fashion") },
    { label: "Home & Kitchen", onClick: () => console.log("Home & Kitchen") },
  ];

  return (
    <header className="bg-primary text-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
      <div className="container mx-auto flex justify-between items-center py-3 px-4">
        <div className="flex items-center gap-4">
          <button
            className="lg:hidden text-white text-2xl"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            ☰
          </button>
        </div>

        <div className="hidden lg:flex items-center gap-4">
          <HoverDropDown label="My Account" options={accountOptions} />
          <span>|</span>
          <a href="#" className="hover:underline">Wish List</a>
          <span>|</span>
          <a href="#" className="hover:underline">Checkout</a>
          <span>|</span>
          <a href="#" className="hover:underline">Log In</a>
        </div>
      </div>

      <hr className="border-gray-300 dark:border-gray-700" />

      <div className="container mx-auto flex flex-col lg:flex-row items-center justify-between py-3 px-4">
        <div className="text-2xl font-bold">
          <a href="#">MERNcommerce</a>
        </div>

        <div className="flex bg-gray-100 rounded-sm items-center gap-4 mt-3 lg:mt-0">
          <div className="flex items-center gap-2 rounded-l-sm bg-gray-400 text-black px-4 py-2  transition cursor-pointer">
            <FaStream />
            <HoverDropDown label="All Category" options={categoryOptions} />
          </div>

          <form className="hidden bg-white lg:flex items-center overflow-hidden">
            <input
              type="text"
              placeholder="Search Product"
              className="px-4 py-2 outline-none text-gray-700 dark:text-white bg-gray-100 dark:bg-gray-800"
            />
            <button type="submit"
              className="h-full text-black px-4 py-2"
              onClick={() => setSearchOpen(!searchOpen)}
            >

              <FaSearch />
            </button>
          </form>

          <button type="submit"
            onClick={() => setSearchOpen(!searchOpen)}
            className="lg:hidden text-white text-xl"
          >
            <FaSearch />
          </button>

        </div>

        {/* Basket with Dropdown */}
        <div className="hidden lg:flex relative" ref={basketRef}>
          <button
            onClick={() => setIsVisible(!isVisible)}
            className="btn bg-[#1d64df] text-white font-medium border-[#005fd8]"
          >
            <span className=""><FaShoppingBasket className="mr-2" size={30} /></span>

            My cart
            {basketCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-yellow-400 text-black text-sm font-bold w-5 h-5 flex items-center justify-center rounded-full">
                {basketCount}
              </span>
            )}
          </button>

          <MiniShoppingCart
            isVisible={isVisible}
            setIsVisible={setIsVisible}
            basketItems={basketItems}
            setBasketItems={setBasketItems}
            basketRef={basketRef}
          />
        </div>
      </div>

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
