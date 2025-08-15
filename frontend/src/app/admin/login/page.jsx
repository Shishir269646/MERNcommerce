'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const AdminLoginPage = () => {
    const router = useRouter();
    const [form, setForm] = useState({ email: '', password: '', isAdmin: false });

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await fetch('http://localhost:4000/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form),

            });

            const data = await res.json();

            if (!res.ok) throw new Error(data.message || 'Login failed');

            // Optionally store token or session data
            localStorage.setItem('adminToken', data.token);
            toast.success('Login successful');
            router.push('/admin/dashboard'); // Redirect to dashboard
        } catch (err) {
            toast.error(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <form onSubmit={handleLogin} className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm">
                <h2 className="text-2xl font-semibold mb-4 text-center text-gray-800">Admin Login</h2>
                <div className="mb-4">
                    <Input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={form.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-6">
                    <Input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={form.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                <label className="label flex items-center gap-2 mb-4">
                    <input
                        type="checkbox"
                        name="isAdmin"
                        checked={form.isAdmin}
                        onChange={(e) =>
                            setForm({ ...form, isAdmin: e.target.checked })
                        }
                        className="checkbox"
                    />
                    Are you Admin?
                </label>

                <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? 'Logging in...' : 'Login'}
                </Button>
            </form>
        </div>
    );
};

export default AdminLoginPage;
