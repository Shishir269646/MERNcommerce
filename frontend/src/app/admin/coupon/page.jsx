"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    fetchCoupons,
    createCoupon,
    updateCoupon,
    deleteCoupon,
    fetchCouponById,
    clearSelectedCoupon,
    clearError,
} from "@/redux/couponSlice";

import {
    Table,
    TableHeader,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
} from "@/components/ui/table";

import { toast } from "react-toastify";

export default function CouponPage() {
    const dispatch = useDispatch();
    const { coupons = [], selectedCoupon, loading, error } = useSelector(
        (state) => state.coupon || {}
    );

    const [formData, setFormData] = useState({
        code: "",
        discountPercent: "",
        expiresAt: "",
        active: true,
    });

    const [editMode, setEditMode] = useState(false);

    useEffect(() => {
        dispatch(fetchCoupons());
    }, [dispatch]);

    useEffect(() => {
        if (selectedCoupon) {
            setFormData({
                code: selectedCoupon.code || "",
                discountPercent: selectedCoupon.discountPercent || "",
                expiresAt: selectedCoupon.expiresAt
                    ? new Date(selectedCoupon.expiresAt).toISOString().slice(0, 10)
                    : "",
                active: selectedCoupon.active ?? true,
            });
            setEditMode(true);
        }
    }, [selectedCoupon]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const resetForm = () => {
        setFormData({
            code: "",
            discountPercent: "",
            expiresAt: "",
            active: true,
        });
        setEditMode(false);
        dispatch(clearSelectedCoupon());
        dispatch(clearError());
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!formData.code || !formData.discountPercent || !formData.expiresAt) {
            toast.warning("Please fill all required fields.");
            return;
        }

        const data = {
            code: formData.code,
            discountPercent: Number(formData.discountPercent),
            expiresAt: formData.expiresAt,
            active: formData.active,
        };

        if (editMode && selectedCoupon?._id) {
            dispatch(updateCoupon({ id: selectedCoupon._id, data }))
                .unwrap()
                .then(() => {
                    toast.success("Coupon updated successfully");
                    resetForm();
                })
                .catch((err) => toast.error("Update failed: " + err));
        } else {
            dispatch(createCoupon(data))
                .unwrap()
                .then(() => {
                    toast.success("Coupon created successfully");
                    resetForm();
                })
                .catch((err) => toast.error("Create failed: " + err));
        }
    };

    const handleEdit = (id) => {
        dispatch(fetchCouponById(id));
    };

    const handleDelete = (id) => {
        if (confirm("Are you sure you want to delete this coupon?")) {
            dispatch(deleteCoupon(id))
                .unwrap()
                .then(() => toast.success("Coupon deleted"))
                .catch((err) => toast.error("Delete failed: " + err));
        }
    };

    return (
        <div className="max-w-5xl mx-auto px-4 py-8 space-y-8">
            <h1 className="text-2xl font-bold text-base-content">Coupon Management</h1>

            {/* Form */}
            <form
                onSubmit={handleSubmit}
                className="card bg-base-200 p-6 space-y-4 shadow-xl"
            >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="form-control">
                        <label className="label text-base-content" htmlFor="code">
                            Coupon Code
                        </label>
                        <input
                            id="code"
                            type="text"
                            name="code"
                            value={formData.code}
                            onChange={handleChange}
                            placeholder="e.g. SUMMER50"
                            className="input input-bordered"
                            required
                        />
                    </div>

                    <div className="form-control">
                        <label className="label text-base-content" htmlFor="discountPercent">
                            Discount Percent (%)
                        </label>
                        <input
                            id="discountPercent"
                            type="number"
                            name="discountPercent"
                            value={formData.discountPercent}
                            onChange={handleChange}
                            placeholder="e.g. 20"
                            className="input input-bordered"
                            required
                            min={1}
                            max={100}
                        />
                    </div>

                    <div className="form-control">
                        <label className="label text-base-content" htmlFor="expiresAt">
                            Expiry Date
                        </label>
                        <input
                            id="expiresAt"
                            type="date"
                            name="expiresAt"
                            value={formData.expiresAt}
                            onChange={handleChange}
                            className="input input-bordered"
                            required
                        />
                    </div>

                    <div className="form-control flex-row items-center gap-2">
                        <input
                            id="active"
                            type="checkbox"
                            name="active"
                            checked={formData.active}
                            onChange={handleChange}
                            className="checkbox"
                        />
                        <label className="label text-base-content" htmlFor="active">
                            Active
                        </label>
                    </div>
                </div>

                <div className="flex gap-4 mt-4">
                    <button type="submit" className="btn btn-primary">
                        {editMode ? "Update Coupon" : "Create Coupon"}
                    </button>
                    {editMode && (
                        <button type="button" className="btn btn-ghost" onClick={resetForm}>
                            Cancel
                        </button>
                    )}
                </div>
            </form>

            {/* Error Message */}
            {error && (
                <div className="text-error mt-2 text-center">
                    {typeof error === "string" ? error : JSON.stringify(error)}
                </div>
            )}

            {/* Table */}
            <div className="overflow-x-auto rounded-lg shadow-md">
                <Table>
                    <TableHeader>
                        <tr>
                            <TableHead>Code</TableHead>
                            <TableHead>Discount (%)</TableHead>
                            <TableHead className="hidden sm:table-cell">Expires At</TableHead>
                            <TableHead>Active</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </tr>
                    </TableHeader>
                    <TableBody>
                        {coupons.map((coupon) => (
                            <TableRow key={coupon._id}>
                                <TableCell>{coupon.code}</TableCell>
                                <TableCell>{coupon.discountPercent}<span>%</span></TableCell>
                                <TableCell className="hidden sm:table-cell">
                                    {new Date(coupon.expiresAt).toLocaleDateString()}
                                </TableCell>
                                <TableCell>{coupon.active ? "Yes" : "No"}</TableCell>
                                <TableCell className="text-right space-x-2">
                                    <button
                                        className="btn btn-sm btn-info"
                                        onClick={() => handleEdit(coupon._id)}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        className="btn btn-sm btn-error"
                                        onClick={() => handleDelete(coupon._id)}
                                    >
                                        Delete
                                    </button>
                                </TableCell>
                            </TableRow>
                        ))}

                        {!coupons.length && !loading && (
                            <TableRow>
                                <TableCell colSpan={5} className="text-center text-gray-500">
                                    No coupons found.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            {loading && (
                <div className="flex justify-center mt-4">
                    <span className="loading loading-spinner loading-lg text-primary"></span>
                </div>
            )}
        </div>
    );
}
