'use client';

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    fetchReviewsByProduct,
    deleteReview,
    clearReviewState,
    createOrUpdateReview,
} from '@/redux/reviewSlice';
import { FaPencilAlt, FaRegTrashAlt } from "react-icons/fa";
import { useParams } from 'next/navigation';
import { toast } from 'react-toastify';
import {
    Table,
    TableHeader,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
} from '@/components/ui/table';

const AdminReviewPage = () => {
    const dispatch = useDispatch();
    const { productId } = useParams();

    const { reviews, loading, error, successMessage } = useSelector(
        (state) => state.reviews || {}
    );

    const [editReview, setEditReview] = useState(null);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');

    useEffect(() => {
        if (productId) {
            dispatch(fetchReviewsByProduct(productId));
        }
        return () => {
            dispatch(clearReviewState());
        };
    }, [dispatch, productId]);

    useEffect(() => {
        if (successMessage) toast.success(successMessage);
        if (error) toast.error(error);
    }, [successMessage, error]);

    const handleDelete = async (id) => {
        await dispatch(deleteReview(id));
    };

    const handleEditClick = (review) => {
        setEditReview(review);
        setRating(review.rating);
        setComment(review.comment || '');
        document.getElementById('edit_modal').showModal();
    };

    const handleUpdateSubmit = async () => {
        if (rating < 1 || rating > 5) {
            toast.error('Rating must be between 1 and 5');
            return;
        }

        await dispatch(
            createOrUpdateReview({
                productId,
                rating,
                comment,
            })
        );
        document.getElementById('edit_modal').close();
        setEditReview(null);
    };

    return (
        <div className="p-4 md:p-8 max-w-7xl mx-auto min-h-screen bg-base-100 transition-colors duration-500">
            <h1 className="text-3xl md:text-4xl font-bold text-primary text-primary-focus mb-8 text-center md:text-left">
                Manage Reviews - Product ID: {productId}
            </h1>

            {loading ? (
                <div className="flex justify-center py-16">
                    <span className="loading loading-spinner loading-lg text-primary text-primary-focus"></span>
                </div>
            ) : reviews?.length ? (
                <div className="overflow-x-auto rounded-lg shadow-lg border border-base-300">
                    <Table className="table-auto w-full min-w-[600px] md:min-w-full">
                        <TableHeader>
                            <tr>
                                <TableHead className="whitespace-nowrap">User</TableHead>
                                <TableHead className="whitespace-nowrap">Rating</TableHead>
                                <TableHead className="whitespace-nowrap max-w-xs">Comment</TableHead>
                                <TableHead className="whitespace-nowrap">Date</TableHead>
                                <TableHead className="whitespace-nowrap">Actions</TableHead>
                            </tr>
                        </TableHeader>
                        <TableBody>
                            {reviews.map((review) => (
                                <TableRow
                                    key={review._id}
                                    className="hover:bg-base-200 transition-colors duration-300"
                                >
                                    <TableCell className="whitespace-nowrap">{review.user?.name || 'Unknown'}</TableCell>
                                    <TableCell>{review.rating}</TableCell>
                                    <TableCell className="max-w-xs truncate">{review.comment || 'No comment'}</TableCell>
                                    <TableCell className="whitespace-nowrap">
                                        {new Date(review.createdAt).toLocaleDateString()}
                                    </TableCell>
                                    <TableCell className="flex gap-2 whitespace-nowrap">
                                        <button
                                            className="btn btn-sm btn-outline btn-warning"
                                            onClick={() => handleEditClick(review)}
                                            aria-label={`Edit review by ${review.user?.name || 'Unknown'}`}
                                        >
                                            <FaRegTrashAlt size={16} />
                                        </button>
                                        <button
                                            className="btn btn-sm btn-outline btn-error"
                                            onClick={() => handleDelete(review._id)}
                                            aria-label={`Delete review by ${review.user?.name || 'Unknown'}`}
                                        >
                                            <FaPencilAlt size={16} />
                                        </button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            ) : (
                <p className="text-center mt-12 text-base-content text-lg">
                    No reviews found.
                </p>
            )}

            {/* Modal for Editing */}
            <dialog id="edit_modal" className="modal">
                <form
                    method="dialog"
                    className="modal-box max-w-lg w-full bg-base-100"
                    onSubmit={(e) => {
                        e.preventDefault();
                        handleUpdateSubmit();
                    }}
                >
                    <h3 className="font-bold text-xl mb-4 text-primary-focus">Edit Review</h3>
                    <div className="form-control mb-4">
                        <label className="label text-base-content">Rating (1-5)</label>
                        <input
                            type="number"
                            className="input input-bordered bg-base-200 text-base-content"
                            min={1}
                            max={5}
                            value={rating}
                            onChange={(e) => setRating(Number(e.target.value))}
                            required
                        />
                    </div>
                    <div className="form-control mb-6">
                        <label className="label text-base-content">Comment</label>
                        <textarea
                            className="textarea textarea-bordered bg-base-200 text-base-content"
                            rows={4}
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                        />
                    </div>
                    <div className="modal-action">
                        <button type="submit" className="btn btn-primary">
                            Save Changes
                        </button>
                        <button
                            type="button"
                            className="btn btn-ghost"
                            onClick={() => {
                                setEditReview(null);
                                document.getElementById('edit_modal').close();
                            }}
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </dialog>
        </div>
    );
};

export default AdminReviewPage;
