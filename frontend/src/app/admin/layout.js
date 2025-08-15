"use client";

import React from "react";
import AdminSidebar from "@/components/AdminSidebar"; // Admin Sidebar component
import { usePathname } from "next/navigation"; // For active navigation highlighting

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


export default function AdminLayout({ children }) {
    const pathname = usePathname();

    return (
        <div className="flex">
            {/* Sidebar */}
            <AdminSidebar />

            {/* Main Content */}
            <div className="flex-1 p-6 bg-gray-100 dark:bg-gray-900 min-h-screen">
                {/* Admin Header */}
                <header className="flex items-center justify-between py-4 mb-6">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Admin Dashboard</h1>
                </header>
                
                {/* Content Area */}
                <div>{children} <ToastContainer position="top-right" autoClose={3000} /></div>
            </div>
        </div>
    );
}
