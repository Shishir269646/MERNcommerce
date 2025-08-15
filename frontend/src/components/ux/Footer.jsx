"use client";
import React from 'react'

function Footer() {
    return (
        <div>
            <footer className="bg-gray-100 text-[#28303b] mt-[150px] py-16 flex flex-col justify-center items-center">
                {/* Newsletter Section */}
                <div className="bg-white shadow-[0px_6px_44px_rgba(173,174,197,0.2)] shadow-none rounded-[10px] w-[90%] md:w-[60%] -mt-[150px] md:-mt-[200px] mb-[100px] text-center p-4 md:p-5">
                    <h2 className="text-[26px] md:text-[45px] font-semibold text-gray-900">Newsletter</h2>
                    <form className="mt-5 mb-0">
                        <div className="flex flex-col sm:flex-row justify-center gap-2 items-center">
                            <input
                                type="email"
                                placeholder="Enter Email"
                                className="max-w-[350px] min-h-[48px] px-6 py-2 bg-gray-100 text-white border-0 focus:outline-none"
                            />
                            <button
                                type="submit"
                                className="min-w-[110px] h-[48px] bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded"
                            >
                                Subscribe
                            </button>
                        </div>
                    </form>
                </div>

                {/* Footer Content */}
                <div className="w-full max-w-7xl px-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-8 text-center sm:text-left mb-12">
                        <div className="lg:col-span-3">
                            <h2 className="font-bold text-2xl">Easy Frontend</h2>
                            <p className="mt-4 text-opacity-75 text-[#28303b] pe-4">
                                Be the first to find out about exclusive deals, the latest
                                Lookbooks trends. We're on a mission to build a better future
                                where technology.
                            </p>
                        </div>
                        <div className="lg:col-span-2">
                            <h5 className="font-semibold mb-2">Quick Links</h5>
                            <ul className="space-y-2 text-opacity-70 text-[#28303b]">
                                <li><a href="#!" className="hover:opacity-100 hover:text-white">Home</a></li>
                                <li><a href="#!" className="hover:opacity-100 hover:text-white">About Us</a></li>
                                <li><a href="#!" className="hover:opacity-100 hover:text-white">Services</a></li>
                            </ul>
                        </div>
                        <div className="lg:col-span-2">
                            <h5 className="font-semibold mb-2">Social Media</h5>
                            <ul className="space-y-2 text-opacity-70 text-[#28303b]">
                                <li><a href="#!" className="hover:opacity-100 hover:text-white">Facebook</a></li>
                                <li><a href="#!" className="hover:opacity-100 hover:text-white">Instagram</a></li>
                                <li><a href="#!" className="hover:opacity-100 hover:text-white">LinkedIn</a></li>
                                <li><a href="#!" className="hover:opacity-100 hover:text-white">Twitter</a></li>
                            </ul>
                        </div>
                        <div className="lg:col-span-2">
                            <h5 className="font-semibold mb-2">Job Info</h5>
                            <ul className="space-y-2 text-opacity-70 text-[#28303b]">
                                <li><a href="#!" className="hover:opacity-100 hover:text-white">Select</a></li>
                                <li><a href="#!" className="hover:opacity-100 hover:text-white">Service</a></li>
                                <li><a href="#!" className="hover:opacity-100 hover:text-white">Payment</a></li>
                            </ul>
                        </div>
                        <div className="lg:col-span-3">
                            <h5 className="font-semibold mb-2">Contact Us</h5>
                            <ul className="space-y-2 text-opacity-70 text-[#28303b]">
                                <li>Sylhet, Bangladesh</li>
                                <li>
                                    <a href="#!" className="hover:opacity-100 hover:text-white">
                                        📧 contact@easyfrontend.com
                                    </a>
                                </li>
                                <li>
                                    <a href="#!" className="hover:opacity-100 hover:text-white">
                                        📞 +880 1633-154215
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Divider */}
                    <hr className="bg-[#989898] my-4" />

                    {/* Bottom Footer */}
                    <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left gap-4">
                        <p className="text-sm text-opacity-75 text-[#28303b]">
                            &copy; Easy Frontend, All rights reserved
                        </p>
                        <ul className="flex gap-4 text-sm text-opacity-75 text-[#28303b]">
                            <li><a href="#!" className="hover:opacity-100 hover:text-white">Privacy</a></li>
                            <li><a href="#!" className="hover:opacity-100 hover:text-white">Security</a></li>
                            <li><a href="#!" className="hover:opacity-100 hover:text-white">Terms</a></li>
                        </ul>
                    </div>
                </div>
            </footer>
        </div>
    )
}

export default Footer
