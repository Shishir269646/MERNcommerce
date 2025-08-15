"use client";
import { useEffect } from 'react';
import { FiShoppingCart } from 'react-icons/fi';
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "@/redux/cartSlice";
import { loadUserFromStorage } from '@/redux/userSlice';
import toast from "react-hot-toast";

const AddToCartButton = ({ product, formData, label = "Add to cart" }) => {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.user);
  useEffect(() => {
    dispatch(loadUserFromStorage());
  }, [dispatch]);

  const handleAddToCart = () => {
    const { selectedColor, selectedSize, qty } = formData || {};


    if (!selectedColor || !selectedSize) {
      toast.error("Please select color and size.");
      return;
    }

    if (qty < 1 || qty > product.stock) {
      toast.error(`Please enter a quantity between 1 and ${product.stock}`);
      return;
    }



    dispatch(
      addToCart({
        productId: product._id,
        userId: user?._id,
        selectedColor,
        selectedSize,
        quantity: qty,
      })
    );
    toast.success("Added to cart");
  };

  return (
    <button
      onClick={handleAddToCart}
      disabled={product?.stock === 0}
      className="flex items-center gap-2 border-2 uppercase font-bold rounded-md text-gray-700 px-5 py-2 text-md transition duration-300 ease-in-out hover:bg-blue-700 hover:text-white disabled:opacity-50"
    >
      <FiShoppingCart className="h-5 w-5" />
      {label}
    </button>
  );
};

export default AddToCartButton;
