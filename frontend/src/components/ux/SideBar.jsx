"use client";
import PropTypes from "prop-types";
import Link from "next/link";

const SideBar = ({ total, totaldiscountPrice }) => {
    const shippingPrice = 5;
    const finalTotal = totaldiscountPrice + shippingPrice;

    return (
        <div className="card bg-base-200 shadow-md p-6">
            <h2 className="text-lg font-semibold mb-4">Order Summary</h2>

            <div className="flex justify-between mb-2">
                <span>Subtotal</span>
                <span className="font-semibold">${total.toFixed(2)}</span>
            </div>
            <div className="flex justify-between mb-2">
                <span>Discount</span>
                <span className="font-semibold">- ${(total - totaldiscountPrice).toFixed(2)}</span>
            </div>
            <div className="flex justify-between mb-2">
                <span>Shipping</span>
                <span className="font-semibold">${shippingPrice.toFixed(2)}</span>
            </div>

            <div className="divider my-3"></div>

            <div className="flex justify-between text-lg font-bold mb-6">
                <span>Total</span>
                <span>${finalTotal.toFixed(2)}</span>
            </div>

            <Link
                href={`/checkout?total=${finalTotal}`}
                className="btn btn-primary w-full font-semibold text-2xl"
            >
                Checkout
            </Link>

        </div>
    );
};

SideBar.propTypes = {
    total: PropTypes.number.isRequired,
};

export default SideBar;


