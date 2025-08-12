"use client"
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Button } from '@/components/ui/button';
import { Moon, Sun } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import API from '@/utils/api';

const AdminOrdersPage = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [darkMode, setDarkMode] = useState(false);

    const { userInfo } = useSelector((state) => state.user);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const { data } = await API.get('/orders', {
                    headers: { Authorization: `Bearer ${userInfo?.token}` },
                });
                setOrders(data);
            } catch (error) {
                console.error('Failed to fetch orders:', error);
            } finally {
                setLoading(false);
            }
        };

        if (userInfo?.isAdmin) fetchOrders();
    }, [userInfo]);

    const handleDelete = async (id) => {
        if (!confirm('Are you sure to delete this order?')) return;
        try {
            await API.delete(`/orders/${id}`, {
                headers: { Authorization: `Bearer ${userInfo?.token}` },
            });
            setOrders((prev) => prev.filter((o) => o._id !== id));
        } catch (err) {
            alert('Failed to delete order');
        }
    };

    const toggleTheme = () => setDarkMode(!darkMode);

    return (
        <div className={darkMode ? 'bg-gray-900 text-white min-h-screen p-4' : 'bg-white text-gray-900 min-h-screen p-4'}>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">Orders Management</h1>
                <Button onClick={toggleTheme} variant="outline">
                    {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                </Button>
            </div>

            {loading ? (
                <p>Loading...</p>
            ) : orders.length === 0 ? (
                <p>No orders found.</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {orders.map((order) => (
                        <Card key={order._id} className={darkMode ? 'bg-gray-800 text-white' : ''}>
                            <CardContent className="p-4">
                                <h2 className="font-semibold text-lg">Order ID: {order._id}</h2>
                                <p><strong>User:</strong> {order.user?.name}</p>
                                <p><strong>Total:</strong> ${order.totalPrice}</p>
                                <p><strong>Status:</strong> {order.isPaid ? 'Paid' : 'Unpaid'}</p>
                                <div className="flex justify-between mt-4">
                                    <Button variant="destructive" onClick={() => handleDelete(order._id)}>
                                        Delete
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
};

export default AdminOrdersPage;
