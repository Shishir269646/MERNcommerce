"use client";
import React from "react";
import { FiHome, FiChevronRight } from 'react-icons/fi';

const BreadcrumbSection = ({ items, title }) => {
    return (
        <div>
            <nav className="flex" aria-label="Breadcrumb">
                <ol className="inline-flex items-center space-x-2">
                    <li>
                        <a
                            href="#"
                            className="flex items-center text-sm text-gray-700 dark:text-gray-400 hover:text-primary-600 dark:hover:text-white"
                        >
                            <FiHome className="mr-2 h-3 w-3" /> Home
                        </a>
                    </li>
                    {items?.map((item, index) => (
                        <li
                            key={index}
                            className="flex items-center text-sm text-gray-500 dark:text-gray-400"
                        >
                            <FiChevronRight className="mx-2 h-4 w-4" />
                            {item}
                        </li>
                    ))}
                </ol>
            </nav>
            <h2 className="mt-2 text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">
                {title}
            </h2>
        </div>
    );
};

export default BreadcrumbSection;
