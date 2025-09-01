const express = require('express');
const router = express.Router();
const {
    createReview,
    updateReview,
    getReviewsByProduct,
    deleteReview,
} = require('../controllers/review.controller');

const { protect } = require('../middleware/auth.middleware');

// Create
router.post('/', protect, createReview);

// Update
router.put('/:id', protect, updateReview);

// Get reviews by product
router.get('/product/:productId', getReviewsByProduct);

// Delete
router.delete('/:id', protect, deleteReview);

module.exports = router;
