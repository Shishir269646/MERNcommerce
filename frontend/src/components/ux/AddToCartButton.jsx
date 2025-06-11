"use client";
import React from "react";
import { FiShoppingCart } from 'react-icons/fi';


const AddToCartButton = ({ onClick, label = "Add to cart" }) => {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-2 border-2 uppercase font-bold rounded-md text-gray-700 px-5 py-2 text-md hover:bg-blue-700 hover:text-white hover:bg-primary-800 dark:bg-primary-600 dark:hover:bg-primary-700"
    >
      <FiShoppingCart className="h-5 w-5" />
      {label}
    </button>
  );
};

export default AddToCartButton;
