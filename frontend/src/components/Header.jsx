"use client"

import Link from "next/link";
import { useSelector } from "react-redux";

export default function Header() {
  const { userInfo } = useSelector((state) => state.user);
  const cartCount = useSelector((state) => state.cart.totalQty);

  return (
    <header className="bg-white dark:bg-gray-900 shadow-md">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        <Link href="/" className="text-xl font-bold text-gray-800 dark:text-white">
          🛒 MERNCommerce
        </Link>

        <nav className="space-x-4">
          <Link href="/products" className="text-gray-700 dark:text-gray-200 hover:underline">
            Products
          </Link>
          <Link href="/cart" className="relative text-gray-700 dark:text-gray-200">
            Cart
            <span className="ml-1 text-sm bg-blue-600 text-white px-2 py-0.5 rounded-full">
              {cartCount}
            </span>
          </Link>
          {userInfo ? (
            <Link href="/profile" className="text-gray-700 dark:text-gray-200">
              {userInfo.name}
            </Link>
          ) : (
            <Link href="/login" className="text-gray-700 dark:text-gray-200">
              Login
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}
