"use client"

export default function Footer() {
    return (
      <footer className="bg-gray-100 dark:bg-gray-800 text-center text-sm py-4 text-gray-700 dark:text-gray-300">
        © {new Date().getFullYear()} MERNCommerce. All rights reserved.
      </footer>
    );
  }
  