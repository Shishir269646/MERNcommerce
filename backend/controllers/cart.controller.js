const Cart = require('../models/cart.model');
const Product = require('../models/product.model');

// Add to Cart
const addToCart = async (req, res) => {
    try {
        const { productId, userId, selectedColor, selectedSize, quantity } = req.body;

        if (!productId || !selectedColor || !selectedSize || !quantity) {
            return res.status(401).json({ message: 'All fields are required' });
        }

        if (!userId) {
            return res.status(402).json({ message: 'Unauthorized. User not found.' });
        }

        const product = await Product.findById(productId);
        if (!product) return res.status(404).json({ message: 'Product not found' });

        if (product.stock < quantity) {
            return res.status(401).json({ message: 'Insufficient stock' });
        }

        let cartItem = await Cart.findOne({
            user: userId,
            product: productId,
            selectedColor,
            selectedSize,
        });


        if (cartItem) {
            cartItem.quantity += quantity;
        } else {
            cartItem = new Cart({
                user: userId,
                product: productId,
                selectedColor,
                selectedSize,
                quantity,
                priceAtPurchase: product.price,
                discountPriceAtPurchase: product.discountPrice || null,
            });
        }

        await cartItem.save();

        res.status(200).json({ message: 'Added to cart', cartItem });
    } catch (error) {
        console.error('AddToCart Error:', error);
        res.status(501).json({ message: 'Server error', error: error.message });
    }
};


// Get all cart items for user
const getCartItems = async (req, res) => {
    try {
        const userId = req.user._id;
        const cartItems = await Cart.find({ user: userId }).populate('product');

        res.status(200).json(cartItems);
    } catch (error) {
        res.status(501).json({ message: 'Server error', error: error.message });
    }
};

// Remove one cart item
const removeFromCart = async (req, res) => {
    try {
        const { cartItemId } = req.params;
        const userId = req.user._id;

        const result = await Cart.findOneAndDelete({
            _id: cartItemId,
            user: userId,
        });

        if (!result) {
            return res.status(404).json({ message: 'Cart item not found' });
        }

        res.status(200).json({ message: 'Removed from cart' });
    } catch (error) {
        res.status(501).json({ message: 'Server error', error: error.message });
    }
};

// Clear entire cart
const clearCart = async (req, res) => {
    try {
        const userId = req.user._id;
        await Cart.deleteMany({ user: userId });

        res.status(200).json({ message: 'Cart cleared' });
    } catch (error) {
        res.status(501).json({ message: 'Server error', error: error.message });
    }
};

// Update quantity of a cart item
const updateCartItemQuantity = async (req, res) => {
  try {
    const { cartItemId } = req.params;
    const { quantity } = req.body;
    const userId = req.user._id;

    if (quantity < 1) {
      return res.status(401).json({ message: 'Quantity must be at least 1' });
    }

    const cartItem = await Cart.findOne({
      _id: cartItemId,
      user: userId,
    });

    if (!cartItem) {
      return res.status(404).json({ message: 'Cart item not found' });
    }

    const product = await Product.findById(cartItem.product);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    if (product.stock < quantity) {
      return res.status(401).json({ message: 'Insufficient stock' });
    }

    cartItem.quantity = quantity;
    await cartItem.save();

   
    await cartItem.populate('product');

    res.status(200).json({ cartItem });
  } catch (error) {
    console.error('Update quantity error:', error);
    res.status(501).json({ message: 'Server error', error: error.message });
  }
};


// Export all functions
module.exports = {
    addToCart,
    getCartItems,
    removeFromCart,
    clearCart,
    updateCartItemQuantity
};
