const Review = require('../models/review.model');


const createOrUpdateReview = async (req, res) => {
    try {
        const { productId, rating, comment } = req.body;

        const existingReview = await Review.findOne({
            user: req.user._id,
            product: productId,
        });

        if (existingReview) {
            existingReview.rating = rating;
            existingReview.comment = comment;
            await existingReview.save();
            return res.status(200).json({ message: 'Review updated', review: existingReview });
        }

        const review = new Review({
            user: req.user._id,
            product: productId,
            rating,
            comment,
        });

        await review.save();
        res.status(201).json({ message: 'Review created', review });
    } catch (error) {
        res.status(500).json({ message: 'Failed to create/update review', error: error.message });
    }
};



const getReviewsByProduct = async (req, res) => {
    try {
        const reviews = await Review.find({ product: req.params.productId }).populate('user', 'name');
        res.status(200).json(reviews);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch reviews', error: error.message });
    }
};



const deleteReview = async (req, res) => {
    try {
        const review = await Review.findById(req.params.id);

        if (!review) {
            return res.status(404).json({ message: 'Review not found' });
        }

        if (req.user._id.toString() !== review.user.toString() && !req.user.isAdmin) {
            return res.status(403).json({ message: 'Not authorized to delete this review' });
        }

        await review.remove();
        res.status(200).json({ message: 'Review deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete review', error: error.message });
    }
};



module.exports = {
    createOrUpdateReview,
    getReviewsByProduct,
    deleteReview,
};