'use client';
import { FaFacebook, FaInstagram, FaLinkedinIn, FaTwitter } from "react-icons/fa";

// Footer data (can later come from CMS, API, or props)
const footerData = {
    brand: {
        name: "MERN Commerce",
        description:
            "MERN Commerce is a feature-rich, full-stack e-commerce platform designed for a seamless user experience. It allows customers to browse products, manage their shopping cart, and complete purchases through a secure checkout process. The application also features a comprehensive admin dashboard for managing products, orders, users, and site settings.",
    },
    links: [
        {
            title: "Quick Links",
            items: [
                { name: "Home", href: "/" },
                { name: "About Us", href: "/about" },
                { name: "Contact Us", href: "/contact" },
               
            ],
        },
        {
            title: "Social Media",
            items: [
                { name: "Facebook", icon: <FaFacebook />, href: "https://facebook.com" },
                { name: "Instagram", icon: <FaInstagram />, href: "https://instagram.com" },
                { name: "LinkedIn", icon: <FaLinkedinIn />, href: "https://linkedin.com" },
                { name: "Twitter", icon: <FaTwitter />, href: "https://twitter.com" },
            ],
        },
        {
            title: "Job Info",
            items: [
                { name: "Select", href: "/jobs/select" },
                { name: "Service", href: "/jobs/service" },
                { name: "Payment", href: "/jobs/payment" },
            ],
        },
    ],
    contact: {
        title: "Contact Us",
        address: "Rajshahi, Bangladesh",
        email: "manjirul2696@gmail.com",
        phone: "+8801303186546",
    },
    bottomLinks: [
        { name: "Privacy", href: "/privacy" },
        { name: "Security", href: "/security" },
        { name: "Terms", href: "/terms" },
    ],
};

function Footer() {
    return (
        <footer className="bg-gray-100 text-gray-700 mt-[150px] py-16 flex flex-col justify-center items-center">
            {/* Newsletter Section */}
            <div className="bg-white shadow-[0px_6px_44px_rgba(173,174,197,0.2)] rounded-[10px] w-[90%] md:w-[60%] -mt-[150px] md:-mt-[200px] mb-[100px] text-center p-4 md:p-5">
                <h2 className="text-[26px] md:text-[45px] font-semibold text-gray-900">Newsletter</h2>
                <form className="mt-5 mb-0">
                    <div className="flex flex-col sm:flex-row justify-center gap-2 items-center">
                        <input
                            type="email"
                            placeholder="Enter Email"
                            className="w-full max-w-[350px] min-h-[48px] px-6 py-2 bg-gray-100 text-black border-0 focus:outline-none"
                        />
                        <button
                            type="submit"
                            className="min-w-[110px] h-[48px] bg-primary hover:bg-orange-500 text-white px-6 py-2 rounded"
                        >
                            Subscribe
                        </button>
                    </div>
                </form>
            </div>

            {/* Footer Content */}
            <div className="w-full max-w-7xl px-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-x-8 gap-y-10 text-center sm:text-left mb-12">
                    {/* Brand Section */}
                    <div className="lg:col-span-3">
                        <h2 className="font-bold text-2xl">{footerData.brand.name}</h2>
                        <p className="mt-4 text-opacity-75 text-gray-700 pe-4">{footerData.brand.description}</p>
                    </div>

                    {/* Dynamic Link Sections */}
                    {footerData.links.map((section, index) => (
                        <div key={index} className="lg:col-span-2">
                            <h5 className="font-semibold mb-4">{section.title}</h5>
                            <ul className="space-y-3 text-opacity-70 text-gray-700">
                                {section.items.map((item, i) => (
                                    <li key={i}>
                                        <a
                                            href={item.href || "#!"}
                                            className="hover:opacity-100 hover:text-orange-500 flex items-center gap-2 justify-center sm:justify-start"
                                        >
                                            {item.icon && item.icon} {item.name}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}

                    {/* Contact Section */}
                    <div className="lg:col-span-3">
                        <h5 className="font-semibold mb-4">{footerData.contact.title}</h5>
                        <ul className="space-y-3 text-opacity-70 text-gray-700">
                            <li>{footerData.contact.address}</li>
                            <li>
                                <a
                                    href={`mailto:${footerData.contact.email}`}
                                    className="hover:opacity-100 hover:text-orange-500 flex items-center gap-2 justify-center sm:justify-start"
                                >
                                    <span>📧</span> {footerData.contact.email}
                                </a>
                            </li>
                            <li>
                                <a
                                    href={`tel:${footerData.contact.phone}`}
                                    className="hover:opacity-100 hover:text-orange-500 flex items-center gap-2 justify-center sm:justify-start"
                                >
                                    <span>📞</span> {footerData.contact.phone}
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Divider */}
                <hr className="bg-[#989898] my-4" />

                {/* Bottom Footer */}
                <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left gap-4">
                    <p className="text-sm text-opacity-75 text-gray-700">
                        &copy; {new Date().getFullYear()} {footerData.brand.name}, All rights reserved
                    </p>
                    <ul className="flex gap-4 text-sm text-opacity-75 text-gray-700">
                        {footerData.bottomLinks.map((link, i) => (
                            <li key={i}>
                                <a href={link.href || "#!"} className="hover:opacity-100 hover:text-orange-500">
                                    {link.name}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </footer>
    );
}

export default Footer;