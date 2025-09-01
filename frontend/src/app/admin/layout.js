"use client";


import React from "react";
import AdminSidebar from "@/components/ui/AdminSidebar";
import { IoMenu } from "react-icons/io5";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


export default function AdminLayout({ children }) {
    const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);

    return (
        <div className="flex min-h-screen">
            {/* Sidebar */}
            <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-gray-800 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out md:relative md:translate-x-0`}>
                <AdminSidebar />
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col">
                {/* Admin Header */}
                <header className="flex items-center justify-between py-4 px-6 bg-white dark:bg-gray-800 shadow-md md:hidden">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Admin Dashboard</h1>
                    <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="text-gray-900 dark:text-white">
                        <IoMenu size={24} />
                    </button>
                </header>

                {/* Content Area */}
                <main className="flex-1 p-6 bg-gray-100 dark:bg-gray-900">
                    {children} <ToastContainer position="top-right" autoClose={3000} />
                </main>
            </div>

            {/* Backdrop */}
            {isSidebarOpen && (
                <div onClick={() => setIsSidebarOpen(false)} className="fixed inset-0 bg-black opacity-50 z-40 md:hidden"></div>
            )}
        </div>
    );
}
