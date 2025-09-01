"use client"

import Link from "next/link";

export default function AdminSidebar() {
  return (
    <aside className="bg-gray-100w-full md:w-60 min-h-screen p-4 text-gray-800">
      <h2 className="text-xl font-bold mb-6">Admin Panel</h2>
      <ul className="space-y-4">
        <li><Link href="/admin/dashboard" className="hover:underline">Dashboard</Link></li>
        <li><Link href="/admin/products" className="hover:underline">Products</Link></li>
        <li><Link href="/admin/categories" className="hover:underline">Categories</Link></li>
        <li><Link href="/admin/orders" className="hover:underline">Orders</Link></li>
        <li><Link href="/admin/coupon" className="hover:underline">Coupons</Link></li>
        <li><Link href="/admin/users" className="hover:underline">Users</Link></li>
        <li><Link href="/admin/review" className="hover:underline">Review</Link></li>
        <li><Link href="/admin/settings" className="hover:underline">Settings</Link></li>
      </ul>
    </aside>
  );
}
