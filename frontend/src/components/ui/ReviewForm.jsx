"use client";
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { createOrUpdateReview } from '@/redux/reviewSlice';
import { useParams } from 'next/navigation';

export default function ReviewForm({ productId: propProductId, onReviewSubmitted, onCancel }) {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const dispatch = useDispatch();
    const params = useParams();
    const urlProductId = Array.isArray(params.id) ? params.id[0] : params.id;
    const productId = propProductId || urlProductId;
    const { loading, error } = useSelector((state) => state.review);

    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);

    const onSubmit = async (data) => {
        if (rating === 0) {
            toast.error("Please select a rating.");
            return;
        }
        try {
            await dispatch(createOrUpdateReview({
                productId,
                rating,
                comment: data.comment
            })).unwrap();
            toast.success("Review submitted successfully!");
            reset();
            setRating(0);
            if (onReviewSubmitted) {
                onReviewSubmitted();
            }
        } catch (err) {
            toast.error(err.message || "Failed to submit review.");
        }
    };

    return (
        <div className="mt-8 p-6 border rounded-lg shadow-md bg-white">
            <h3 className="text-xl font-bold mb-4">Leave a Review</h3>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        Rating
                    </label>
                    <div className="flex">
                        {[...Array(5)].map((star, index) => {
                            index += 1;
                            return (
                                <button
                                    type="button"
                                    key={index}
                                    className={`text-3xl ${index <= (hover || rating) ? "text-yellow-500" : "text-gray-300"}`}
                                    onClick={() => setRating(index)}
                                    onMouseEnter={() => setHover(index)}
                                    onMouseLeave={() => setHover(rating)}
                                >
                                    &#9733;
                                </button>
                            );
                        })}
                    </div>
                    {errors.rating && <p className="text-red-500 text-xs italic">Please select a rating.</p>}
                </div>

                <div className="mb-4">
                    <label htmlFor="comment" className="block text-gray-700 text-sm font-bold mb-2">
                        Comment
                    </label>
                    <textarea
                        id="comment"
                        {...register("comment", { required: "Comment is required" })}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        rows="4"
                        placeholder="Write your review here..."
                    ></textarea>
                    {errors.comment && <p className="text-red-500 text-xs italic">{errors.comment.message}</p>}
                </div>

                <div className="flex gap-2">
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        disabled={loading}
                    >
                        {loading ? "Submitting..." : "Submit Review"}
                    </button>
                    <button
                        type="button"
                        className="btn btn-ghost"
                        onClick={onCancel}
                    >
                        Cancel
                    </button>
                </div>
                {error && <p className="text-red-500 text-xs italic mt-2">{error}</p>}
            </form>
        </div>
    );
}
