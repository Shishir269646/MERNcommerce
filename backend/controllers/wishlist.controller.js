const Wishlist = require('../models/wishlist.model');
const Product = require('../models/product.model');


const getWishlist = async (req, res) => {
    try {
        const wishlist = await Wishlist.findOne({ user: req.user._id }).populate('products');
        res.status(200).json(wishlist || { user: req.user._id, products: [] });
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch wishlist', error: error.message });
    }
};


const addToWishlist = async (req, res) => {
  try {
    const { productId } = req.body;

    if (!productId) {
      return res.status(400).json({ message: 'Product ID is required' });
    }

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    let wishlist = await Wishlist.findOne({ user: req.user._id });

    // If no wishlist exists for user, create a new one
    if (!wishlist) {
      wishlist = new Wishlist({ user: req.user._id, products: [productId] });
    } else {
      // If wishlist exists, add product if not already added
      if (!wishlist.products.some(id => id.toString() === productId)) {
        wishlist.products.push(productId);
      }
    }

    await wishlist.save();

    // Optionally populate products before sending response
    await wishlist.populate('products');

    res.status(200).json(wishlist);
  } catch (error) {
    res.status(500).json({ message: 'Failed to add to wishlist', error: error.message });
  }
};




const removeFromWishlist = async (req, res) => {
    try {
        const { productId } = req.params;

        const wishlist = await Wishlist.findOne({ user: req.user._id });

        if (!wishlist) {
            return res.status(404).json({ message: 'Wishlist not found' });
        }

        wishlist.products = wishlist.products.filter(
            (id) => id.toString() !== productId
        );

        await wishlist.save();
        res.status(200).json(wishlist);
    } catch (error) {
        res.status(500).json({ message: 'Failed to remove product from wishlist', error: error.message });
    }
};


const clearWishlist = async (req, res) => {
    try {
        const wishlist = await Wishlist.findOne({ user: req.user._id });

        if (!wishlist) {
            return res.status(404).json({ message: 'Wishlist not found' });
        }

        wishlist.products = [];
        await wishlist.save();
        res.status(200).json({ message: 'Wishlist cleared', wishlist });
    } catch (error) {
        res.status(500).json({ message: 'Failed to clear wishlist', error: error.message });
    }
};


module.exports = {
    getWishlist,
    addToWishlist,
    removeFromWishlist,
    clearWishlist
};