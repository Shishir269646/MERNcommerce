
"use client";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "next/navigation";
import ProductGallery from "./ProductGallery";
import Reviews from "./Reviews";
import Comments from "./Comments";
import StarRating from "./StarRating";
import ColorVariant from "./ColorVariant";
import SizeVariant from "./SizeVariant";
import QtyField from "./QtyField";
import AddToCartButton from "./AddToCartButton";




/* const product = {
  title: "SmartFit Ergonomic Office Chair with Lumbar Support",
  description: "Experience all-day comfort and enhanced productivity with our adjustable ergonomic chair, built with breathable mesh and 3D armrests.",
  price: 18999.99,
  discountPrice: 14999.99,
  stock: 40,
  previews: [
    {
      previewUrl: "https://cdn.easyfrontend.com/pictures/products/chair1.png",
      thumbUrl: "https://cdn.easyfrontend.com/pictures/products/chair1.png",
    },
    {
      previewUrl: "https://cdn.easyfrontend.com/pictures/products/chair2.png",
      thumbUrl: "https://cdn.easyfrontend.com/pictures/products/chair2.png",
    },
    {
      previewUrl: "https://cdn.easyfrontend.com/pictures/products/chair3.png",
      thumbUrl: "https://cdn.easyfrontend.com/pictures/products/chair3.png",
    },
  ],
  colorVariants: [
    { bgcolor: "bg-black", value: "Black" },
    { bgcolor: "bg-gray-600", value: "Dark Gray" },
    { bgcolor: "bg-blue-700", value: "Navy Blue" },
  ],
  sizeVariants: [
    { label: "Standard", value: "STD", title: "Standard Size" },
    { label: "Large", value: "L", title: "Large Size" },
  ],
  specifications: {
    "Backrest Type": "High Back Mesh",
    "Armrest": "3D Adjustable",
    "Base": "Nylon Base with Castor Wheels",
    "Tilt Mechanism": "Synchro-Tilt",
    "Seat Material": "Molded Foam",
  },
  reviews: [
    {
      user: "Alice",
      rating: 5,
      comment: "Very comfortable! Great lumbar support.",
    },
    {
      user: "Bob",
      rating: 4,
      comment: "Good chair for long hours, but the assembly took time.",
    },
  ],
  comments: [
    {
      user: "Charlie",
      message: "Does it come assembled?",
    },
    {
      user: "Diana",
      message: "Is this suitable for tall people (6ft+)?",
    },
  ],
  brand: "SmartFit",
  category: "Office Chairs",
  sku: "CHAIR-ERG-SF001",
  material: "Mesh & Steel",
  dimensions: "65cm x 65cm x 120cm",
  weight: "15kg",
  warranty: "1 year",
  returnPolicy: "15-day return",
  rating: 4.7,
}; */

export default function ProductDetail({ product }) {

  if (!product) {
    return (
      <div className="text-center text-red-500 py-10">
        Product data is missing or still loading.
      </div>
    );
  }



  const [formData, setFormData] = useState({
    qty: 1,
    selectedColor: "",
    selectedSize: "",
  });




  const {
    title,
    description,
    price,
    discountPrice = null,
    stock,
    Image = [],
    colorVariants = [],
    sizeVariants = [],
    specifications = {},
    reviews = [],
    comments = [],
    brand,
    category,
    sku,
    material,
    dimensions,
    weight,
    warranty,
    returnPolicy,
    rating,
  } = product;



  const discountPercentage = discountPrice
    ? Math.round(((price - discountPrice) / price) * 100)
    : 0;

  const formatPrice = (amount) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);

  const setField = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="space-y-8">
      <div className="grid md:grid-cols-2 gap-6">
        <ProductGallery images={Image} />

        <div className="space-y-4">
          <h1 className="text-3xl font-bold">{title}</h1>
          <p className="text-gray-600">{description}</p>

          {/* Pricing with discount */}
          <div className="flex items-center space-x-4">
            {discountPrice ? (
              <>
                <span className="text-2xl text-green-600 font-semibold">
                  {formatPrice(discountPrice)}
                </span>
                <span className="line-through text-gray-400">
                  {formatPrice(price)}
                </span>
                <span className="text-sm text-red-500 font-medium">
                  -{discountPercentage}%
                </span>
              </>
            ) : (
              <span className="text-2xl text-green-600 font-semibold">
                {formatPrice(price)}
              </span>
            )}
          </div>

          {/* Stock Info */}
          <div className={`text-sm ${stock > 0 ? "text-green-500" : "text-red-500"}`}>
            {stock > 0 ? `${stock} in stock` : "Out of stock"}
          </div>

          {/* Rating */}
          <div>
            <StarRating rating={rating} />
          </div>

          {/* Color Variants */}
          {colorVariants.length > 0 && (
            <div className="space-y-1">
              <h3 className="font-medium">Available Colors:</h3>
              <div className="flex gap-2">
                <ColorVariant colorVariant={colorVariants} onSelect={setField} />


              </div>
            </div>
          )}

          {/* Size Variants */}
          {sizeVariants.length > 0 && (
            <div className="space-y-1">
              <h3 className="font-medium">Available Sizes:</h3>
              <div className="flex flex-wrap gap-2">
                <SizeVariant sizeVariant={sizeVariants} onSelect={setField} />
              </div>
            </div>
          )}

          {/* Quantity Field */}
          <div className="mb-6">
            <h5 className="font-medium mb-2">QTY</h5>
            <QtyField
              onChange={setField}
              name="qty"
              value={formData.qty}
            />
          </div>
          <AddToCartButton
            product={product}
            formData={formData}
          />


          {/* Product Details */}
          <div className="mt-4 space-y-2 text-gray-700">
            <p><strong>Brand:</strong> {brand}</p>
            <p><strong>Category:</strong> {category}</p>
            <p><strong>SKU:</strong> {sku}</p>
            <p><strong>Material:</strong> {material}</p>
            <p><strong>Dimensions:</strong> {dimensions}</p>
            <p><strong>Weight:</strong> {weight}</p>
            <p><strong>Warranty:</strong> {warranty}</p>
            <p><strong>Return Policy:</strong> {returnPolicy}</p>
          </div>

          {/* Specifications */}
          {Object.keys(specifications).length > 0 && (
            <div className="mt-4">
              <h2 className="text-lg font-semibold">Specifications:</h2>
              <ul className="list-disc ml-6 text-gray-700">
                {Object.entries(specifications).map(([key, value]) => (
                  <li key={key}><strong>{key}:</strong> {value}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Reviews & Comments */}
      <Reviews reviews={reviews} />
      <Comments comments={comments} />
    </div>
  );
}
