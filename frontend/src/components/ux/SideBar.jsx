"use client";
import PropTypes from "prop-types";
import Link from "next/link";

const SideBar = ({ total }) => {
    const shipping = 99;
    const tax = 168;
    const grandTotal = total + shipping + tax;


    return (
        <div className="card bg-base-200 shadow-md p-6">
            <h2 className="text-lg font-semibold mb-4">Order Summary</h2>

            <div className="flex justify-between mb-2">
                <span>Subtotal</span>
                <span className="font-semibold">${total.toFixed(2)}</span>
            </div>
            <div className="flex justify-between mb-2">
                <span>Shipping</span>
                <span className="font-semibold">${shipping}</span>
            </div>
            <div className="flex justify-between mb-2">
                <span>Tax</span>
                <span className="font-semibold">${tax}</span>
            </div>

            <div className="divider my-3"></div>

            <div className="flex justify-between text-lg font-bold mb-6">
                <span>Total</span>
                <span>${grandTotal.toFixed(2)}</span>
            </div>

            <Link
                href={`/checkout?total=${grandTotal}`}
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


