'use client';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { FaPencilAlt } from "react-icons/fa";
import Link from 'next/link';

export default function UserProfilePage() {
    const { user, isAuthenticated, loading } = useSelector((state) => state.user);

    const [isUserModalOpen, setUserModalOpen] = useState(false);
    const [isAddressModalOpen, setAddressModalOpen] = useState(false);

    const [editUser, setEditUser] = useState({});
    const [editAddress, setEditAddress] = useState({});

    const openUserModal = () => {
        setEditUser({ name: user.username, email: user.email, phone: user.phone || '' });
        setUserModalOpen(true);
    };

    const openAddressModal = () => {
        setEditAddress({
            street: user.address?.street || '',
            city: user.address?.city || '',
            division: user.address?.division || '',
            zip: user.address?.zip || '',
            country: user.address?.country || '',
        });
        setAddressModalOpen(true);
    };

    const handleUserChange = (e) => {
        setEditUser({ ...editUser, [e.target.name]: e.target.value });
    };

    const handleAddressChange = (e) => {
        setEditAddress({ ...editAddress, [e.target.name]: e.target.value });
    };

    const handleUserSubmit = (e) => {
        e.preventDefault();
        console.log('Updated User Info:', editUser);
        setUserModalOpen(false);
    };

    const handleAddressSubmit = (e) => {
        e.preventDefault();
        console.log('Updated Address Info:', editAddress);
        setAddressModalOpen(false);
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-base-200">
                <span className="loading loading-spinner text-primary"></span>
            </div>
        );
    }

    if (!user) {
        return (
            <div className="hero bg-base-200 min-h-screen">
                <div className="hero-content text-center">
                    <div className="max-w-md">
                        <h1 className="text-5xl font-bold">User not found.</h1>
                        <Link href="/login" className="btn btn-neutral p-6 mt-6 text-2xl">Log In</Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-base-200 p-4">
            <div className="max-w-6xl mx-auto grid gap-6 md:grid-cols-2">
                {/* User Info Card */}
                <div className="card bg-base-100 shadow-lg shadow-xl">
                    <div className="card-body">
                        <div className="flex items-center justify-between">
                            <h2 className="card-title text-lg md:text-xl">User Information</h2>
                            <button onClick={openUserModal} className="btn btn-sm btn-outline btn-primary">
                                <FaPencilAlt className="w-4 h-4 mr-1" />
                                Edit
                            </button>
                        </div>
                        <p><span className="font-semibold">Name:</span> {user.username}</p>
                        <p><span className="font-semibold">Email:</span> {user.email}</p>
                        <p><span className="font-semibold">Phone:</span> {user.phone || 'N/A'}</p>
                    </div>
                </div>

                {/* Address Info Card */}
                <div className="card bg-base-100 shadow-lg shadow-xl">
                    <div className="card-body">
                        <div className="flex items-center justify-between">
                            <h2 className="card-title text-lg md:text-xl">Address Information</h2>
                            <button onClick={openAddressModal} className="btn btn-sm btn-outline btn-primary">
                                <FaPencilAlt className="w-4 h-4 mr-1" />
                                Edit
                            </button>
                        </div>
                        <p><span className="font-semibold">Street:</span> {user.address?.street || 'N/A'}</p>
                        <p><span className="font-semibold">City:</span> {user.address?.city || 'N/A'}</p>
                        <p><span className="font-semibold">Division:</span> {user.address?.division || 'N/A'}</p>
                        <p><span className="font-semibold">ZIP Code:</span> {user.address?.zip || 'N/A'}</p>
                        <p><span className="font-semibold">Country:</span> {user.address?.country || 'N/A'}</p>
                    </div>
                </div>
            </div>

            {/* User Edit Modal */}
            {isUserModalOpen && (
                <dialog open className="modal">
                    <div className="modal-box">
                        <h3 className="font-bold text-lg mb-4">Edit User Info</h3>
                        <form onSubmit={handleUserSubmit} className="space-y-3">
                            <input
                                type="text"
                                name="name"
                                value={editUser.name}
                                onChange={handleUserChange}
                                placeholder="Name"
                                className="input input-bordered w-full"
                            />
                            <input
                                type="email"
                                name="email"
                                value={editUser.email}
                                onChange={handleUserChange}
                                placeholder="Email"
                                className="input input-bordered w-full"
                            />
                            <input
                                type="text"
                                name="phone"
                                value={editUser.phone}
                                onChange={handleUserChange}
                                placeholder="Phone"
                                className="input input-bordered w-full"
                            />
                            <div className="modal-action">
                                <button type="submit" className="btn btn-primary">Save</button>
                                <button onClick={() => setUserModalOpen(false)} className="btn">Cancel</button>
                            </div>
                        </form>
                    </div>
                </dialog>
            )}

            {/* Address Edit Modal */}
            {isAddressModalOpen && (
                <dialog open className="modal">
                    <div className="modal-box">
                        <h3 className="font-bold text-lg mb-4">Edit Address</h3>
                        <form onSubmit={handleAddressSubmit} className="space-y-3">
                            <input
                                type="text"
                                name="street"
                                value={editAddress.street}
                                onChange={handleAddressChange}
                                placeholder="Street"
                                className="input input-bordered w-full"
                            />
                            <input
                                type="text"
                                name="city"
                                value={editAddress.city}
                                onChange={handleAddressChange}
                                placeholder="City"
                                className="input input-bordered w-full"
                            />
                            <input
                                type="text"
                                name="division"
                                value={editAddress.division}
                                onChange={handleAddressChange}
                                placeholder="Division"
                                className="input input-bordered w-full"
                            />
                            <input
                                type="text"
                                name="zip"
                                value={editAddress.zip}
                                onChange={handleAddressChange}
                                placeholder="ZIP Code"
                                className="input input-bordered w-full"
                            />
                            <input
                                type="text"
                                name="country"
                                value={editAddress.country}
                                onChange={handleAddressChange}
                                placeholder="Country"
                                className="input input-bordered w-full"
                            />
                            <div className="modal-action">
                                <button type="submit" className="btn btn-primary">Save</button>
                                <button onClick={() => setAddressModalOpen(false)} className="btn">Cancel</button>
                            </div>
                        </form>
                    </div>
                </dialog>
            )}
        </div>
    );
}
