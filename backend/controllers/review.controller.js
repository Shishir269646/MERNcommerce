const mongoose = require('mongoose');
const Review = require('../models/review.model');
const Order = require('../models/order.model'); // Import Order model

// ✅ Create Review
const createReview = async (req, res) => {
    try {
        const { productId, orderId, rating, comment } = req.body; // Added orderId

        // Validate orderId
        if (!mongoose.Types.ObjectId.isValid(orderId)) {
            return res.status(400).json({ message: 'Invalid order ID' });
        }

        // Find the specific order for the user
        const order = await Order.findOne({
            _id: orderId,
            user: req.user._id,
        });

        if (!order) {
            return res.status(404).json({ message: 'Order not found or does not belong to you.' });
        }

        // Check if the order is delivered
        if (!order.isDelivered) {
            return res.status(403).json({ message: 'You can only leave a comment for a delivered order.' });
        }

        // Check if the product is part of this order
        const productInOrder = order.orderItems.some(item => item.product.toString() === productId);
        if (!productInOrder) {
            return res.status(400).json({ message: 'Product not found in the specified order.' });
        }

        // Prevent duplicate reviews for this specific order
        const existingReview = await Review.findOne({
            user: req.user._id,
            product: productId,
            order: orderId, // Check for review linked to this specific order
        });

        if (existingReview) {
            return res.status(400).json({ message: 'You have already left a comment for this specific delivery.' });
        }

        const review = new Review({
            user: req.user._id,
            product: productId,
            order: orderId, // Link review to the order
            name: req.user.username || req.user.name,
            rating,
            comment,
        });

        const createdReview = await review.save();
        res.status(201).json(createdReview);
    } catch (error) {
        res.status(500).json({ message: 'Failed to create review', error: error.message });
    }
};

// ✅ Update Review
const updateReview = async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ message: 'Invalid review ID' });
        }

        const { rating, comment } = req.body;
        const review = await Review.findById(req.params.id);

        if (!review) {
            return res.status(404).json({ message: 'Review not found' });
        }

        // Only owner or admin can update
        if (review.user.toString() !== req.user._id.toString() && !req.user.isAdmin) {
            return res.status(403).json({ message: 'Not authorized to update this review' });
        }

        review.rating = rating || review.rating;
        review.comment = comment || review.comment;

        const updatedReview = await review.save();
        res.json(updatedReview);
    } catch (error) {
        res.status(500).json({ message: 'Failed to update review', error: error.message });
    }
};

// ✅ Get all reviews for a product
const getReviewsByProduct = async (req, res) => {
    try {
        const reviews = await Review.find({ product: req.params.productId });
        res.status(200).json(reviews);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch reviews', error: error.message });
    }
};

// ✅ Delete Review
const deleteReview = async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ message: 'Invalid review ID' });
        }

        const review = await Review.findById(req.params.id);

        if (!review) {
            return res.status(404).json({ message: 'Review not found' });
        }

        // Only owner or admin can delete
        if (review.user.toString() !== req.user._id.toString() && !req.user.isAdmin) {
            return res.status(403).json({ message: 'Not authorized to delete this review' });
        }

        await review.deleteOne();
        res.status(200).json({ message: 'Review deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete review', error: error.message });
    }
};

module.exports = {
    createReview,
    updateReview,
    getReviewsByProduct,
    deleteReview,
};
