'use client';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsers, deleteUser } from '@/redux/userSlice';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';

import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const UsersPage = () => {
    const dispatch = useDispatch();
    const { users, loading, error } = useSelector((state) => state.user);

    useEffect(() => {
        dispatch(getAllUsers());
    }, [dispatch]);

    const handleDelete = async (id) => {
        const confirmed = window.confirm('Are you sure you want to delete this user?');
        if (!confirmed) return;

        try {
            await dispatch(deleteUser(id)).unwrap();
            toast.success('User deleted successfully');
        } catch (err) {
            toast.error(err || 'Error deleting user');
        }
    };

    return (
        <div className="p-4 md:p-6 text-gray-800">
            <h2 className="text-2xl font-semibold mb-4">Users</h2>

            {loading ? (
                <p>Loading users...</p>
            ) : error ? (
                <p className="text-red-500">{error}</p>
            ) : users?.length === 0 ? (
                <p>No users found.</p>
            ) : (
                <div className="overflow-x-auto rounded-xl border border-gray-700">
                    <Table>
                        <TableHeader>
                            <TableRow className="bg-gray-100">
                                <TableHead className="hidden sm:table-cell">ID</TableHead>
                                <TableHead>Name</TableHead>
                                <TableHead>Email</TableHead>
                                <TableHead>Admin</TableHead>
                                <TableHead className="hidden sm:table-cell">Joined</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {users.map((user) => {
                                const createdAt = new Date(user.createdAt);
                                const formattedDate = !isNaN(createdAt)
                                    ? format(createdAt, 'PPP')
                                    : 'N/A';

                                return (
                                    <TableRow key={user._id}>
                                        <TableCell className="hidden sm:table-cell">{user._id}</TableCell>
                                        <TableCell>{user.username}</TableCell>
                                        <TableCell>{user.email}</TableCell>
                                        <TableCell>
                                            {user.isAdmin ? (
                                                <span className="text-green-500 font-medium">Yes</span>
                                            ) : (
                                                <span className="text-gray-500">No</span>
                                            )}
                                        </TableCell>
                                        <TableCell className="hidden sm:table-cell">{formattedDate}</TableCell>
                                        <TableCell>
                                            <div className="flex gap-2">
                                                <Button
                                                    variant="outline"
                                                    className="text-sm border border-red-500 text-red-500 hover:bg-red-500 hover:text-white transition"
                                                    onClick={() => handleDelete(user._id)}
                                                >
                                                    Delete
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </div>
            )}

            {/* Toast Container */}
            <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
        </div>
    );
};

export default UsersPage;
