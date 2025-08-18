'use client';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FaPencilAlt, FaTrash } from "react-icons/fa";
import Link from 'next/link';
import {
    fetchAddresses,
    createAddress,
    updateAddress,
    deleteAddress
} from '@/redux/addressSlice';

export default function UserProfilePage() {
    const { user, loading: userLoading } = useSelector((state) => state.user);
    const { addresses, loading, error } = useSelector((state) => state.address);
    const dispatch = useDispatch();

    const [isUserModalOpen, setUserModalOpen] = useState(false);
    const [isAddressModalOpen, setAddressModalOpen] = useState(false);
    const [isAddingAddress, setIsAddingAddress] = useState(false);
    const [selectedAddressId, setSelectedAddressId] = useState(null);

    const [editUser, setEditUser] = useState({});
    const [editAddress, setEditAddress] = useState({});

    useEffect(() => {
        if (user?._id) {
            dispatch(fetchAddresses());
        }
    }, [user, dispatch]);

    const openUserModal = () => {
        setEditUser({
            name: user.username,
            email: user.email,
            phone: user.phone || ''
        });
        setUserModalOpen(true);
    };

    const openAddressModal = (adding = false, address = null) => {
        setIsAddingAddress(adding);
        if (adding) {
            setEditAddress({
                street: '',
                city: '',
                postalCode: '',
                country: '',
                phone: ''
            });
            setSelectedAddressId(null);
        } else if (address) {
            setEditAddress({
                street: address.street || '',
                city: address.city || '',
                postalCode: address.postalCode || '',
                country: address.country || '',
                phone: address.phone || ''
            });
            setSelectedAddressId(address._id);
        }
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
        if (isAddingAddress) {
            dispatch(createAddress(editAddress))
                .unwrap()
                .then(() => setAddressModalOpen(false));
        } else {
            dispatch(updateAddress({ id: selectedAddressId, data: editAddress }))
                .unwrap()
                .then(() => setAddressModalOpen(false));
        }
    };

    const handleDeleteAddress = (id) => {
        if (confirm("Are you sure you want to delete this address?")) {
            dispatch(deleteAddress(id));
        }
    };

    if (userLoading || loading) {
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

    const hasAddress = addresses.length > 0;
    const address = addresses[0]; // Only one address allowed

    return (
        <div className="min-h-screen bg-base-200 p-4">
            {error && (
                <div className="alert alert-error shadow-lg mb-4">
                    <div>
                        <span>{error}</span>
                    </div>
                </div>
            )}

            <div className="max-w-6xl mx-auto grid gap-6 md:grid-cols-2">
                {/* User Info Card */}
                <div className="card bg-base-100 shadow-lg">
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
                <div className="card bg-base-100 shadow-lg">
                    <div className="card-body">
                        <div className="flex items-center justify-between">
                            <h2 className="card-title text-lg md:text-xl">Address Information</h2>
                            {!hasAddress && (
                                <button onClick={() => openAddressModal(true)} className="btn btn-sm btn-outline btn-primary">
                                    Add
                                </button>
                            )}
                        </div>
                        {!hasAddress ? (
                            <p>No address found. Please add one.</p>
                        ) : (
                            <div className="p-3 border rounded-lg">
                                <p><span className="font-semibold">Street:</span> {address.street}</p>
                                <p><span className="font-semibold">City:</span> {address.city}</p>
                                <p><span className="font-semibold">Postal Code:</span> {address.postalCode}</p>
                                <p><span className="font-semibold">Country:</span> {address.country}</p>
                                <p><span className="font-semibold">Phone:</span> {address.phone}</p>
                                <div className="flex gap-2 mt-2">
                                    <button
                                        onClick={() => openAddressModal(false, address)}
                                        className="btn btn-xs btn-outline btn-secondary"
                                    >
                                        <FaPencilAlt className="w-3 h-3 mr-1" />
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDeleteAddress(address._id)}
                                        className="btn btn-xs btn-outline btn-error"
                                    >
                                        <FaTrash className="w-3 h-3 mr-1" />
                                        Delete
                                    </button>
                                </div>
                            </div>
                        )}
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

            {/* Address Edit/Add Modal */}
            {isAddressModalOpen && (
                <dialog open className="modal">
                    <div className="modal-box">
                        <h3 className="font-bold text-lg mb-4">{isAddingAddress ? 'Add Address' : 'Edit Address'}</h3>
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
                                name="postalCode"
                                value={editAddress.postalCode}
                                onChange={handleAddressChange}
                                placeholder="Postal Code"
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
                            <input
                                type="text"
                                name="phone"
                                value={editAddress.phone}
                                onChange={handleAddressChange}
                                placeholder="Phone"
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
