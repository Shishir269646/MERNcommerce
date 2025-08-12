const express = require('express');
const router = express.Router();

const {
    addToCart,
    getCartItems,
    removeFromCart,
    clearCart,
    updateCartItemQuantity
} = require('../controllers/cart.controller');


const { protect } = require('../middleware/auth.middleware');



router.post('/add',protect, addToCart);
router.get('/', protect, getCartItems);
router.delete('/:cartItemId', protect, removeFromCart);
router.delete('/', protect, clearCart);
router.patch('/:cartItemId', protect, updateCartItemQuantity);

module.exports = router;
