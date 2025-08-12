"use client"
import React from "react";
import { Card, CardContent } from "@/components/ui/card";


const stats = [
    { label: "Total Sales", value: "$15,240" },
    { label: "Total Orders", value: "1,234" },
    { label: "Total Products", value: "567" },
    { label: "Total Users", value: "345" },
];

export default function AdminDashboard() {

    return (
        <div className="dark:bg-gray-900 dark:text-white dark:min-h-screen text-black min-h-screen">
            

            <main className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {stats.map((item) => (
                    <Card key={item.label} className="dark:bg-gray-800 dark:text-white bg-gray-100 text-black">
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
                    
                </ul>
            </section>
        </div>
    );
}
