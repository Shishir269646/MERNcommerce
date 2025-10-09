
"use client";

import { useState } from "react";
import ProductGallery from "./ProductGallery";
import Reviews from "./Reviews";
import Comments from "./Comments";
import StarRating from "./StarRating";
import ColorVariant from "./ColorVariant";
import SizeVariant from "./SizeVariant";
import QtyField from "./QtyField";
import AddToCartButton from "./AddToCartButton";




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
    <div className="sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Product Gallery */}
        <ProductGallery images={Image} />

        {/* Product Info */}
        <div className="space-y-4">
          {/* Title */}
          <h1 className="text-2xl sm:text-3xl font-bold">{title}</h1>

          {/* Description */}
          <p className="text-gray-600 text-sm sm:text-base">{description}</p>

          {/* Pricing with discount */}
          <div className="flex flex-wrap items-center gap-3">
            {discountPrice ? (
              <>
                <span className="text-xl sm:text-2xl text-green-600 font-semibold">
                  {formatPrice(discountPrice)}
                </span>
                <span className="line-through text-gray-400 text-sm sm:text-base">
                  {formatPrice(price)}
                </span>
                <span className="text-xs sm:text-sm text-red-500 font-medium">
                  -{discountPercentage}%
                </span>
              </>
            ) : (
              <span className="text-xl sm:text-2xl text-green-600 font-semibold">
                {formatPrice(price)}
              </span>
            )}
          </div>

          {/* Stock Info */}
          <div
            className={`text-xs sm:text-sm ${stock > 0 ? "text-green-500" : "text-red-500"
              }`}
          >
            {stock > 0 ? `${stock} in stock` : "Out of stock"}
          </div>

          {/* Rating */}
          <div>
            <StarRating rating={rating} />
          </div>

          {/* Color Variants */}
          {colorVariants.length > 0 && (
            <div className="space-y-1">
              <h3 className="font-medium text-sm sm:text-base">Available Colors:</h3>
              <div className="flex flex-wrap gap-2">
                <ColorVariant colorVariant={colorVariants} onSelect={setField} />
              </div>
            </div>
          )}

          {/* Size Variants */}
          {sizeVariants.length > 0 && (
            <div className="space-y-1">
              <h3 className="font-medium text-sm sm:text-base">Available Sizes:</h3>
              <div className="flex flex-wrap gap-2">
                <SizeVariant sizeVariant={sizeVariants} onSelect={setField} />
              </div>
            </div>
          )}

          {/* Quantity Field */}
          <div className="mb-6">
            <h5 className="font-medium mb-2 text-sm sm:text-base">QTY</h5>
            <QtyField onChange={setField} name="qty" value={formData.qty} />
          </div>

          {/* Add to Cart */}
          <AddToCartButton product={product} formData={formData} />

          {/* Product Details */}
          <div className="mt-4 space-y-2 text-gray-700 text-sm sm:text-base">
            <p>
              <strong>Brand:</strong> {brand}
            </p>
            <p>
              <strong>Category:</strong> {category}
            </p>
            <p>
              <strong>SKU:</strong> {sku}
            </p>
            <p>
              <strong>Material:</strong> {material}
            </p>
            <p>
              <strong>Dimensions:</strong> {dimensions}
            </p>
            <p>
              <strong>Weight:</strong> {weight}
            </p>
            <p>
              <strong>Warranty:</strong> {warranty}
            </p>
            <p>
              <strong>Return Policy:</strong> {returnPolicy}
            </p>
          </div>

          {/* Specifications */}
          {Object.keys(specifications).length > 0 && (
            <div className="mt-6">
              <h2 className="text-base sm:text-lg font-semibold">
                Specifications:
              </h2>
              <ul className="list-disc ml-4 sm:ml-6 text-xs sm:text-sm text-gray-700">
                {Object.entries(specifications).map(([key, value]) => (
                  <li key={key}>
                    <strong>{key}:</strong> {value}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Reviews & Comments */}
      <div className="space-y-6">
        <Reviews reviews={reviews} />
        <Comments comments={comments} productId={product._id} />
      </div>
    </div>
  );

}
