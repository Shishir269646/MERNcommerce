"use client"

import Link from "next/link";

export default function ProductCard({ product }) {

  

  return (
    <div className="bg-white rounded-xl shadow-md p-4 hover:shadow-lg transition duration-300">
      <Link href={`/products/${product._id}`}>
        <img src={product.image} alt={product.name} className="rounded-lg h-48 w-full object-cover" />
        <h3 className="mt-2 text-lg font-semibold text-gray-800">{product.name}</h3>
        <p className="text-sm text-gray-500">{product.category}</p>
        <p className="mt-1 text-blue-600 font-bold">${product.price}</p>
      </Link>
    </div>
  );
}
