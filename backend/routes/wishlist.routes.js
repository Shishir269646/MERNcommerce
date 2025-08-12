const express = require('express');
const router = express.Router();
const {
    getWishlist,
    addToWishlist,
    removeFromWishlist,
    clearWishlist,
} = require('../controllers/wishlist.controller');


const { protect } = require('../middleware/auth.middleware');



router.get('/', protect, getWishlist);


router.post('/', protect, addToWishlist);



router.delete('/:productId', protect, removeFromWishlist);


router.delete('/', protect, clearWishlist);


module.exports = router;
