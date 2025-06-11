"use client"
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";
import { useState } from "react";

const stats = [
    { label: "Total Sales", value: "$15,240" },
    { label: "Total Orders", value: "1,234" },
    { label: "Total Products", value: "567" },
    { label: "Total Users", value: "345" },
];

export default function AdminDashboard() {
    const [darkMode, setDarkMode] = useState(false);

    return (
        <div className={darkMode ? "bg-gray-900 text-white min-h-screen" : "bg-white text-black min-h-screen"}>
            <header className="flex justify-between items-center p-4 shadow-md">
                <h1 className="text-2xl font-bold">Admin Dashboard</h1>
                <Button onClick={() => setDarkMode(!darkMode)}>
                    {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                </Button>
            </header>

            <main className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {stats.map((item) => (
                    <Card key={item.label} className={darkMode ? "bg-gray-800 text-white" : "bg-gray-100 text-black"}>
                        <CardContent className="p-4">
                            <h2 className="text-sm font-semibold text-gray-500 dark:text-gray-400">
                                {item.label}
                            </h2>
                            <p className="text-xl font-bold">{item.value}</p>
                        </CardContent>
                    </Card>
                ))}
            </main>

            <section className="p-6">
                <h2 className="text-xl font-semibold mb-4">Features</h2>
                <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 list-disc list-inside">
                    <li>View & Manage Products</li>
                    <li>View & Manage Orders</li>
                    <li>View & Manage Users</li>
                    <li>Update Order Status</li>
                    <li>Create / Edit / Delete Products</li>
                    <li>Revenue Analytics</li>
                    <li>Category Management</li>
                    <li>Dark Mode Toggle</li>
                </ul>
            </section>
        </div>
    );
}
