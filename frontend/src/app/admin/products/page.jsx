"use client";

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts, removeProduct } from '@/redux/productSlice';
import { useTheme } from 'next-themes';
import { useRouter } from 'next/navigation';

import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Pencil, Trash2 } from 'lucide-react';
import { toast } from 'react-toastify';
import Image from 'next/image';
import img from '../../../../../backend/uploads/1748504835559-975085364.jpg';

export default function AdminProductsPage() {
    const dispatch = useDispatch();
    const { theme, setTheme } = useTheme();
    const router = useRouter();

    const { products, loading } = useSelector((state) => state.product);

    const handleRedirect = () => {
        router.push('/admin/products/create');
    };

    const fetchProducts = () => {
        dispatch(getProducts());
    };

    const handleDelete = async (id) => {
        try {
            if (confirm('Are you sure you want to delete this product?')) {
                await dispatch(removeProduct(id));
                toast.success('Product deleted successfully!');
            }
        } catch (error) {
            toast.error(`Failed to delete product: ${error}`);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    return (
        <div className="p-4 min-h-screen bg-background text-foreground">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Admin Products</h1>

                <div className="flex gap-4 items-center">
                    <Button
                        onClick={handleRedirect}
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                    >
                        Add New Product
                    </Button>

                    <div className="flex gap-2 items-center">
                        <span>Dark Mode</span>
                        <Switch
                            checked={theme === 'dark'}
                            onCheckedChange={(checked) => setTheme(checked ? 'dark' : 'light')}
                        />
                    </div>
                </div>
            </div>

            {loading ? (
                <span className="loading loading-dots loading-xl"></span>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {Array.isArray(products) && products.length > 0 ? (
                        products.map((product) => (
                            <Card key={product._id} className="rounded-2xl shadow-md">
                                <CardContent className="p-4">
                                    <Image
                                        src={`${img}`}
                                        alt={product.name}
                                        width={250}
                                        height={160}
                                        className="w-full object-cover rounded-lg mb-2"
                                    />
                                    <h2 className="text-lg font-semibold">{product.name}</h2>
                                    <p className="text-sm text-muted-foreground mb-2">${product.price}</p>
                                    <div className="flex justify-between">
                                        <Button
                                            size="sm"
                                            variant="outline"
                                            onClick={() => router.push(`/admin/products/edit/${product._id}`)}
                                        >
                                            <Pencil className="w-4 h-4 mr-1" /> Edit
                                        </Button>
                                        <Button
                                            size="sm"
                                            variant="destructive"
                                            onClick={() => handleDelete(product._id)}
                                        >
                                            <Trash2 className="w-4 h-4 mr-1" /> Delete
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        ))
                    ) : (
                        <p>No products found.</p>
                    )}
                </div>
            )}
        </div>
    );
}
