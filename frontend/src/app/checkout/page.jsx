'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function CheckoutPage() {
    return (
        <div className="bg-base-100 sm:px-8 px-4 py-6">
            <div className="max-w-screen-xl max-md:max-w-xl mx-auto">
                {/* Progress Steps */}
                <div className="flex items-start mb-16">
                    {['Cart', 'Checkout', 'Order'].map((label, i) => (
                        <div key={label} className="w-full flex items-center">
                            <div
                                className={`w-8 h-8 shrink-0 mx-[-1px] p-1.5 flex items-center justify-center rounded-full ${i <= 1 ? 'bg-primary text-white' : 'bg-base-300 text-base-content'
                                    }`}
                            >
                                <span className="text-sm font-semibold">{i + 1}</span>
                            </div>
                            {i < 2 && (
                                <div
                                    className={`w-full h-[3px] mx-4 rounded-lg ${i === 0 ? 'bg-primary' : 'bg-base-300'
                                        }`}
                                ></div>
                            )}
                            <div className="mt-2 mr-4">
                                <h6
                                    className={`text-sm font-semibold ${i <= 1 ? 'text-base-content' : 'text-base-content/50'
                                        }`}
                                >
                                    {label}
                                </h6>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Main Content */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-y-12 gap-x-8 lg:gap-x-12">
                    {/* Form Section */}
                    <div className="lg:col-span-2">
                        <form>
                            {/* Delivery Details */}
                            <div>
                                <h2 className="text-xl font-semibold mb-6 text-base-content">
                                    Delivery Details
                                </h2>
                                <div className="grid lg:grid-cols-2 gap-y-6 gap-x-4">
                                    {[
                                        { label: 'First Name', type: 'text' },
                                        { label: 'Last Name', type: 'text' },
                                        { label: 'Email', type: 'email' },
                                        { label: 'Phone No.', type: 'number' },
                                        { label: 'Address Line', type: 'text' },
                                        { label: 'City', type: 'text' },
                                        { label: 'State', type: 'text' },
                                        { label: 'Zip Code', type: 'text' },
                                    ].map((field, index) => (
                                        <div key={index}>
                                            <label className="label text-sm font-medium text-base-content">
                                                {field.label}
                                            </label>
                                            <input
                                                type={field.type}
                                                placeholder={`Enter ${field.label}`}
                                                className="input input-bordered w-full text-sm"
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Payment Options */}
                            <div className="mt-12">
                                <h2 className="text-xl font-semibold mb-6 text-base-content">Payment</h2>
                                <div className="grid gap-4 lg:grid-cols-2">
                                    {/* Card Payment */}
                                    <div className="card bg-base-200 border border-base-300 max-w-sm">
                                        <div className="card-body p-4">
                                            <div className="flex items-center">
                                                <input
                                                    type="radio"
                                                    name="method"
                                                    className="radio radio-primary"
                                                    id="card"
                                                    defaultChecked
                                                />
                                                <label htmlFor="card" className="ml-4 flex gap-2 cursor-pointer">
                                                    <Image src="https://readymadeui.com/images/visa.webp" width={48} height={32} alt="Visa" />
                                                    <Image src="https://readymadeui.com/images/american-express.webp" width={48} height={32} alt="Amex" />
                                                    <Image src="https://readymadeui.com/images/master.webp" width={48} height={32} alt="MasterCard" />
                                                </label>
                                            </div>
                                            <p className="mt-4 text-sm text-base-content/70 font-medium">
                                                Pay with your debit or credit card
                                            </p>
                                        </div>
                                    </div>

                                    {/* PayPal Payment */}
                                    <div className="card bg-base-200 border border-base-300 max-w-sm">
                                        <div className="card-body p-4">
                                            <div className="flex items-center">
                                                <input
                                                    type="radio"
                                                    name="method"
                                                    className="radio radio-primary"
                                                    id="paypal"
                                                />
                                                <label htmlFor="paypal" className="ml-4 flex gap-2 cursor-pointer">
                                                    <Image src="https://readymadeui.com/images/paypal.webp" width={80} height={32} alt="Paypal" />
                                                </label>
                                            </div>
                                            <p className="mt-4 text-sm text-base-content/70 font-medium">
                                                Pay with your PayPal account
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Promo Code */}
                            <div className="mt-12 max-w-md">
                                <p className="text-base-content text-sm font-medium mb-2">
                                    Do you have a promo code?
                                </p>
                                <div className="flex gap-4">
                                    <input
                                        type="text"
                                        placeholder="Promo code"
                                        className="input input-bordered w-full text-sm"
                                    />
                                    <button
                                        type="button"
                                        className="btn btn-primary"
                                    >
                                        Apply
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>

                    {/* Order Summary */}
                    <div className="relative">
                        <h2 className="text-xl font-semibold mb-6 text-base-content">Order Summary</h2>
                        <ul className="text-base-content/70 font-medium space-y-4">
                            <li className="flex flex-wrap gap-4 text-sm">
                                Subtotal <span className="ml-auto font-semibold text-base-content">$72.00</span>
                            </li>
                            <li className="flex flex-wrap gap-4 text-sm">
                                Discount <span className="ml-auto font-semibold text-base-content">$0.00</span>
                            </li>
                            <li className="flex flex-wrap gap-4 text-sm">
                                Shipping <span className="ml-auto font-semibold text-base-content">$6.00</span>
                            </li>
                            <li className="flex flex-wrap gap-4 text-sm">
                                Tax <span className="ml-auto font-semibold text-base-content">$5.00</span>
                            </li>
                            <hr className="border-base-300" />
                            <li className="flex flex-wrap gap-4 text-[15px] font-semibold text-base-content">
                                Total <span className="ml-auto">$83.00</span>
                            </li>
                        </ul>

                        <div className="space-y-4 mt-8">
                            <Link
                                type="button"
                                className="btn btn-primary w-full"
                                href="/checkout/order"
                            >
                                Complete Purchase
                            </Link>

                            <Link
                                type="button"
                                className="btn btn-outline w-full"
                                href="/"
                            >
                                Continue Shopping
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
