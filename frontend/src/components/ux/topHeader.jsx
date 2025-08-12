"use client";

import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
  Fragment,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { FaSearch, FaStream, FaShoppingBasket } from "react-icons/fa";
import HoverDropDown from "./HoverDropDown";
import MiniShoppingCart from "./MiniShoppingCart";
import { fetchCategories } from "@/redux/categorySlice";
import { logoutUser } from "@/redux/userSlice";
import api from "@/utils/api";

export default function TopHeader() {
  /* 1️⃣ –– সব Hooks সবসময় একই ক্রমে কল হবে –– */
  const [hydrated, setHydrated] = useState(false);      // guard
  const [searchOpen, setSearchOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);  // cart dropdown
  const basketRef = useRef();

  const dispatch = useDispatch();
  const router = useRouter();
  const { isAuthenticated } = useSelector((s) => s.user);
  const categories = useSelector((s) => s.category.categories);



  /* once‑only client init */
  useEffect(() => setHydrated(true), []);
  useEffect(() => {
    dispatch(fetchCategories());

    const outside = (e) => {
      if (basketRef.current && !basketRef.current.contains(e.target)) {
        setIsVisible(false);
      }
    };
    document.addEventListener("mousedown", outside);
    return () => document.removeEventListener("mousedown", outside);
  }, [dispatch]);

  const handleLogout = useCallback(() => {
    dispatch(logoutUser());
    delete api.defaults.headers.common["Authorization"];
    router.push("/login");
  }, [dispatch, router]);

  const categoryOptions = categories.map((c) => ({
    label: c.name,
    onClick: () => alert(`You clicked ${c.name}`),
  }));

  const accountOptions = isAuthenticated
    ? [
      { label: "Dashboard", LinkUrl: "/account" },
      { label: "Log Out", onClick: handleLogout },
    ]
    : [
      { label: "Register", LinkUrl: "/register" },
      { label: "Log In", LinkUrl: "/login" },
    ];

  const { cartItems } = useSelector((state) => state.cart);
  const basketCount = cartItems.reduce((sum, item) => sum + (item.quantity || 1), 0);



  if (!hydrated) return null;




  return (
    <header className="bg-primary text-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
      {/* top strip */}
      <div className="container mx-auto flex justify-between items-center py-3 px-4">
        <button
          className="lg:hidden text-white text-2xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>

        {/* desktop account links */}
        <div className="hidden lg:flex items-center gap-4">
          <HoverDropDown label="My Account" options={accountOptions} />
          <span>|</span>
          <a href="/wishlist" className="hover:underline">Wish List</a>
          <span>|</span>
          <a href="/checkout" className="hover:underline">Checkout</a>
          {isAuthenticated ? (
            <>
              <span>|</span>
              <button onClick={handleLogout} className="hover:underline">
                Log Out
              </button>
            </>
          ) : (
            <>
              <span>|</span>
              <a href="/login" className="hover:underline">Log In</a>
            </>
          )}
        </div>
      </div>

      <hr className="border-gray-300 dark:border-gray-700" />

      {/* main row */}
      <div className="container mx-auto flex flex-col lg:flex-row items-center justify-between py-3 px-4">
        {/* logo */}
        <div className="text-2xl font-bold">
          <a href="/">MERNcommerce</a>
        </div>

        {/* search + category */}
        <div className="flex bg-gray-100 rounded-sm items-center gap-4 mt-3 lg:mt-0">
          <div className="flex items-center gap-2 rounded-l-sm bg-gray-400 text-black px-4 py-2">
            <FaStream />
            <HoverDropDown label="All Category" options={categoryOptions} />
          </div>

          {/* desktop search */}
          <form className="hidden bg-white lg:flex items-center overflow-hidden">
            <input
              type="text"
              placeholder="Search Product"
              className="px-4 py-2 outline-none text-gray-700 dark:text-white bg-gray-100 dark:bg-gray-800"
            />
            <button
              type="submit"
              className="h-full text-black px-4 py-2"
              onClick={() => setSearchOpen(!searchOpen)}
            >
              <FaSearch />
            </button>
          </form>

          {/* mobile search icon */}
          <button
            type="button"
            onClick={() => setSearchOpen(!searchOpen)}
            className="lg:hidden text-white text-xl"
          >
            <FaSearch />
          </button>
        </div>

        {/* cart */}
        <div className="hidden lg:flex relative" ref={basketRef}>
          <button
            onClick={() => setIsVisible(!isVisible)}
            className="btn bg-[#1d64df] text-white font-medium border-[#005fd8]"
          >
            <FaShoppingBasket className="mr-2" size={30} />
            My cart
            {basketCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-yellow-400 text-black text-sm font-bold w-5 h-5 flex items-center justify-center rounded-full">
                {basketCount}
              </span>
            )}
          </button>

          <MiniShoppingCart
            isVisible={isVisible}
            setIsVisible={setIsVisible}
            basketRef={basketRef}
          />
        </div>
      </div>

      {/* mobile search bar */}
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
}
