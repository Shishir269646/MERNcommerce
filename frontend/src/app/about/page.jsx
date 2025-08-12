"use client"


import React from 'react';

const AboutPage = () => {
    return (
        <div className="bg-white text-gray-800">
            {/* Hero Section */}
            <section className="text-center py-16 px-6">
                <h1 className="text-4xl md:text-5xl font-bold mb-4 text-blue-700">About MERNcommerce</h1>
                <p className="text-lg md:text-xl max-w-2xl mx-auto text-gray-600">
                    MERNcommerce is your go-to online marketplace, dedicated to offering a seamless and secure shopping experience powered by cutting-edge MERN stack technology.
                </p>
            </section>

            {/* Our Story */}
            <section className="bg-gray-100 py-16 px-6">
                <div className="max-w-5xl mx-auto text-center">
                    <h2 className="text-3xl font-semibold mb-4">Our Story</h2>
                    <p className="text-gray-700 text-lg">
                        Born from a passion for technology and retail, MERNcommerce was built to bridge the gap between top-tier products and customers who value quality, affordability, and convenience. We're redefining online shopping with innovation and trust.
                    </p>
                </div>
            </section>

            {/* Mission & Vision */}
            <section className="py-16 px-6">
                <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12">
                    <div>
                        <h3 className="text-2xl font-bold mb-2">Our Mission</h3>
                        <p className="text-gray-700 text-lg">
                            To empower consumers by delivering an intuitive e-commerce platform with powerful features, user-focused design, and scalable performance.
                        </p>
                    </div>
                    <div>
                        <h3 className="text-2xl font-bold mb-2">Our Vision</h3>
                        <p className="text-gray-700 text-lg">
                            To become a global leader in e-commerce technology, connecting people with products they love—quickly, securely, and affordably.
                        </p>
                    </div>
                </div>
            </section>

            {/* Team Section */}
            <section className="bg-gray-50 py-16 px-6">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-3xl font-semibold text-center mb-12">Meet the Team</h2>
                    <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
                        {[
                            {
                                name: 'Manjirul Islam Shishir',
                                title: 'Founder & Full-Stack Developer',
                                image: '/team-shishir.jpg',
                            },
                            {
                                name: 'Rina Akter',
                                title: 'UI/UX Designer',
                                image: '/team-rina.jpg',
                            },
                            {
                                name: 'Hasib Rahman',
                                title: 'Product Manager',
                                image: '/team-hasib.jpg',
                            },
                        ].map((member, idx) => (
                            <div key={idx} className="bg-white shadow-lg rounded-xl p-6 text-center">
                                <img
                                    src={member.image}
                                    alt={member.name}
                                    className="w-24 h-24 mx-auto rounded-full object-cover mb-4"
                                />
                                <h3 className="text-xl font-semibold">{member.name}</h3>
                                <p className="text-gray-500">{member.title}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Call to Action */}
            <section className="bg-gradient-to-r from-indigo-600 to-blue-600 py-16 text-white text-center">
                <h2 className="text-3xl font-semibold mb-4">Why Shop with MERNcommerce?</h2>
                <p className="text-lg mb-6 max-w-xl mx-auto">
                    Secure payments. Fast delivery. Exceptional support. Join thousands of happy customers today.
                </p>
                <a href="/shop" className="inline-block bg-white text-indigo-700 font-semibold px-6 py-3 rounded-full shadow hover:bg-gray-100 transition">
                    Start Shopping
                </a>
            </section>
        </div>
    );
};

export default AboutPage;
