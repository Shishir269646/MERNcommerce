"use client";
import PropTypes from "prop-types";
import { MdDeleteForever } from "react-icons/md";
import QtyField from "@/components/ux/QtyField";

const ProductItem = ({ item, index, onChangeQty, onRemove }) => {
    if (!item || !item.product) return null; // 🔐 Prevent render crash

    const { product, quantity } = item;
    const productImage = product?.Image?.[0] || "/fallback.jpg";
    const productTitle = product?.title || "Unknown Product";
    const productPrice = product?.priceAtPurchase ?? product?.price ?? 0;

    return (
        <div className="card card-side bg-base-100 shadow-md flex-col md:flex-row mb-6 transition-all duration-300">
            <figure className="w-full md:w-40 p-4">
                <img
                    src={productImage}
                    alt={productTitle}
                    className="rounded-xl w-full h-auto object-cover"
                />
            </figure>
            <div className="card-body px-4 pt-2 pb-4 w-full">
                <h2 className="card-title text-base md:text-lg line-clamp-2">{productTitle}</h2>
                <p className="font-bold">৳ {productPrice}</p>
                <div className="flex items-center justify-between mt-2">
                    <QtyField
                        name={`qty-${index}`}
                        value={quantity || 1}
                        onChange={(e) => onChangeQty(e, index)}
                    />
                    <button
                        onClick={() => onRemove(index)}
                        className="btn btn-md btn-circle btn-outline text-2xl text-error"
                    >
                        <MdDeleteForever />
                    </button>
                </div>
            </div>
        </div>
    );
};

ProductItem.propTypes = {
    item: PropTypes.shape({
        product: PropTypes.object,
        quantity: PropTypes.number,
    }).isRequired,
    index: PropTypes.number.isRequired,
    onChangeQty: PropTypes.func.isRequired,
    onRemove: PropTypes.func.isRequired,
};

export default ProductItem;
