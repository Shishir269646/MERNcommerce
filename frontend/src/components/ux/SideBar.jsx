"use client";
import PropTypes from "prop-types";
import Link from "next/link";

const SideBar = ({ total }) => (
    <div className="card bg-base-200 shadow-md p-6">
        <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
        <div className="flex justify-between mb-2">
            <span>Subtotal</span>
            <span className="font-semibold">${total}</span>
        </div>
        <div className="flex justify-between mb-2">
            <span>Shipping</span>
            <span className="font-semibold">$99</span>
        </div>
        <div className="flex justify-between mb-2">
            <span>Tax</span>
            <span className="font-semibold">$168</span>
        </div>
        <div className="divider my-3"></div>
        <div className="flex justify-between text-lg font-bold mb-6">
            <span>Total</span>
            <span>${total + 99 + 168}</span>
        </div>
        <Link href="/checkout" className="btn btn-primary w-full font-semibold text-2xl">
            Checkout
        </Link>
    </div>
);

SideBar.propTypes = {
    total: PropTypes.number.isRequired,
};

export default SideBar;
