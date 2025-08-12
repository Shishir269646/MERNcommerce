const express = require('express');
const router = express.Router();
const {
    createOrUpdateReview,
    getReviewsByProduct,
    deleteReview,
} = require('../controllers/review.controller');





router.post('/', createOrUpdateReview); // Create or update review
router.get('/product/:productId', getReviewsByProduct); // Get all reviews for a product
router.delete('/:id', deleteReview); // Delete a review



module.exports = router;
