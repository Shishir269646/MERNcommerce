"use client";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { createOrUpdateReview, fetchReviewsByProduct, deleteReview } from "@/redux/reviewSlice";
import { getMyOrdersThunk } from "@/redux/orderSlice";

const StarRating = ({ rating, setRating }) => {
    return (
        <div className="flex items-center">
            {[...Array(5)].map((_, index) => {
                const starValue = index + 1;
                return (
                    <svg
                        key={starValue}
                        className={`w-6 h-6 cursor-pointer ${starValue <= rating ? "text-yellow-500" : "text-gray-400"}`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        onClick={() => setRating(starValue)}
                    >
                        <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.56-.955L10 0l2.951 5.955 6.56.955-4.756 4.635 1.123 6.545z" />
                    </svg>
                );
            })}
        </div>
    );
};

export default function Comments({ productId }) {
    const [newComment, setNewComment] = useState('');
    const [rating, setRating] = useState(5);
    const [editingReview, setEditingReview] = useState(null);
    const [deliveredOrder, setDeliveredOrder] = useState(null);
    const dispatch = useDispatch();
    const router = useRouter();
    const { user } = useSelector((state) => state.user);
    const { reviews, loading } = useSelector((state) => state.review);
    const { orders } = useSelector((state) => state.order);
    const isAuthenticated = !!user;

    useEffect(() => {
        dispatch(fetchReviewsByProduct(productId));
        if (isAuthenticated) {
            dispatch(getMyOrdersThunk());
        }
    }, [dispatch, productId, isAuthenticated]);

    useEffect(() => {
        if (orders && orders.length > 0) {
            const foundOrder = orders.find(order =>
                order.isDelivered && order.orderItems.some(item => item.product === productId)
            );
            setDeliveredOrder(foundOrder);
        }
    }, [orders, productId]);

    const handleSaveComment = async () => {
        if (!newComment.trim() || !deliveredOrder) return;

        if (!isAuthenticated) {
            router.push("/login");
            return;
        }

        const reviewData = {
            productId,
            orderId: deliveredOrder._id,
            rating,
            comment: newComment,
        };

        if (editingReview) {
            reviewData.reviewId = editingReview._id;
        }

        await dispatch(createOrUpdateReview(reviewData));
        setNewComment('');
        setRating(5);
        setEditingReview(null);
        dispatch(fetchReviewsByProduct(productId));
    };

    const handleEdit = (review) => {
        setEditingReview(review);
        setNewComment(review.comment);
        setRating(review.rating);
    };

    const handleDelete = async (reviewId) => {
        await dispatch(deleteReview(reviewId));
        dispatch(fetchReviewsByProduct(productId));
    };

    return (
        <div>
            <h2 className="text-2xl font-bold mb-2">Comments</h2>
            <div className="space-y-2">
                {loading ? (
                    <p>Loading comments...</p>
                ) : (
                    reviews.map((c) => (
                        <div key={c._id} className="border p-2 rounded">
                            <div className="flex justify-between">
                                <p className="text-sm font-semibold">{c.name}</p>
                                {user && user._id === c.user && (
                                    <div className="flex space-x-2">
                                        <button onClick={() => handleEdit(c)} className="text-blue-600 hover:underline">Edit</button>
                                        <button onClick={() => handleDelete(c._id)} className="text-red-600 hover:underline">Delete</button>
                                    </div>
                                )}
                            </div>
                            <p>{c.comment}</p>
                            <StarRating rating={c.rating} setRating={() => {}} />
                        </div>
                    ))
                )}
                {isAuthenticated && deliveredOrder && (
                    <div className="mt-4 space-y-2">
                        <h3 className="text-lg font-semibold">{editingReview ? "Edit your review" : "Add a review"}</h3>
                        <StarRating rating={rating} setRating={setRating} />
                        <textarea
                            value={newComment}
                            onChange={e => setNewComment(e.target.value)}
                            className="w-full p-2 border rounded"
                            placeholder="Add a comment..."
                        />
                        <button onClick={handleSaveComment} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                            {editingReview ? "Update Review" : "Post Review"}
                        </button>
                        {editingReview && (
                            <button onClick={() => setEditingReview(null)} className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400 ml-2">
                                Cancel
                            </button>
                        )}
                    </div>
                )}
                {isAuthenticated && !deliveredOrder && (
                    <div className="mt-4">
                        <p>You can only leave a comment for a delivered order.</p>
                    </div>
                )}
                {!isAuthenticated && (
                    <div className="mt-4">
                        <p>Please <a href="/login" className="text-blue-600 hover:underline">log in</a> to post a comment.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
