const Product = require('../models/product.model');
const { resizeAndUploadToS3, deleteFileFromS3 } = require('../utils/s3Upload');

// Create Product
const createProduct = async (req, res) => {
  try {
    const {
      title, description, brand, category, sku,
      price, discountPrice, discountPercentage, stock,
      colorVariants, sizeVariants,
      selectedColor, selectedSize,
      material, dimensions, weight,
      warranty, returnPolicy,
      specifications
    } = req.body;

    let Image = [];

    // Upload and resize images
    if (req.files?.Image?.length) {
      for (const file of req.files.Image) {
        const results = await resizeAndUploadToS3(file.path, file.filename, file.mimetype, 'product');
        Image.push(results); // each result is an array of { size, url }
      }
    }

    const parsedColorVariants = typeof colorVariants === 'string' ? JSON.parse(colorVariants) : colorVariants || [];
    const parsedSizeVariants = typeof sizeVariants === 'string' ? JSON.parse(sizeVariants) : sizeVariants || [];

    let parsedSpecificationsArray = [];
    try {
      parsedSpecificationsArray = typeof specifications === 'string'
        ? JSON.parse(specifications)
        : Array.isArray(specifications)
          ? specifications
          : [];

      if (!Array.isArray(parsedSpecificationsArray)) throw new Error('Invalid spec');
    } catch (err) {
      console.error('Invalid specifications:', err);
      parsedSpecificationsArray = [];
    }

    const specsMap = {};
    parsedSpecificationsArray.forEach(spec => {
      if (spec.key && spec.value) {
        specsMap[spec.key] = spec.value;
      }
    });

    const product = new Product({
      title, description, brand, category, sku,
      price, discountPrice, discountPercentage, stock,
      Image,
      colorVariants: parsedColorVariants,
      sizeVariants: parsedSizeVariants,
      selectedColor, selectedSize,
      material, dimensions, weight,
      warranty, returnPolicy,
      specifications: specsMap
    });

    const saved = await product.save();
    res.status(201).json(saved);
  } catch (err) {
    console.error('Create Product Error:', err);
    res.status(500).json({ message: 'Failed to create product' });
  }
};

// Get All Products
const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch products' });
  }
};

// Get Single Product
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch product' });
  }
};

// Update Product
const updateProduct = async (req, res) => {
  try {
    const productId = req.params.id;

    const {
      title, description, brand, category, sku,
      price, discountPrice, discountPercentage, stock,
      selectedColor, selectedSize,
      material, dimensions, weight,
      warranty, returnPolicy,
      colorVariants, sizeVariants, specifications,
      existingImages = '[]',
      removedImages = '[]',
    } = req.body;

    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    const existingImgs = JSON.parse(existingImages || '[]');
    const removedImgs = JSON.parse(removedImages || '[]');
    const parsedColorVariants = typeof colorVariants === 'string' ? JSON.parse(colorVariants) : colorVariants || [];
    const parsedSizeVariants = typeof sizeVariants === 'string' ? JSON.parse(sizeVariants) : sizeVariants || [];

    let parsedSpecificationsArray = [];
    try {
      if (typeof specifications === 'string') {
        const parsed = JSON.parse(specifications);
        parsedSpecificationsArray = Array.isArray(parsed)
          ? parsed
          : typeof parsed === 'object' && parsed !== null
            ? Object.entries(parsed).map(([key, value]) => ({ key, value }))
            : [];
      } else if (Array.isArray(specifications)) {
        parsedSpecificationsArray = specifications;
      } else if (typeof specifications === 'object') {
        parsedSpecificationsArray = Object.entries(specifications).map(([key, value]) => ({ key, value }));
      }
    } catch (err) {
      console.error('Invalid specifications:', err);
      parsedSpecificationsArray = [];
    }

    const specsMap = {};
    parsedSpecificationsArray.forEach(spec => {
      if (spec.key && spec.value) {
        specsMap[spec.key] = spec.value;
      }
    });

    let newImageUrls = [];
    if (req.files?.Image?.length) {
      for (const file of req.files.Image) {
        const results = await resizeAndUploadToS3(file.path, file.filename, file.mimetype, 'product');
        newImageUrls.push(results);
      }
    }

    const finalImages = [...existingImgs, ...newImageUrls];

    for (const imgSet of removedImgs) {
      if (Array.isArray(imgSet)) {
        for (const sizeObj of imgSet) {
          if (sizeObj?.url) {
            try {
              await deleteFileFromS3(sizeObj.url);
            } catch (err) {
              console.error('Delete error:', sizeObj.url, err);
            }
          }
        }
      }
    }

    Object.assign(product, {
      title, description, brand, category, sku,
      price, discountPrice, discountPercentage, stock,
      selectedColor, selectedSize,
      material, dimensions, weight,
      warranty, returnPolicy,
      Image: finalImages,
      colorVariants: parsedColorVariants,
      sizeVariants: parsedSizeVariants,
      specifications: specsMap,
    });

    const updated = await product.save();
    res.status(200).json(updated);
  } catch (err) {
    console.error('Update Product Error:', err);
    res.status(500).json({ message: 'Failed to update product' });
  }
};

// Delete Product
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    if (product.Image?.length) {
      for (const imgSet of product.Image) {
        if (Array.isArray(imgSet)) {
          for (const sizeObj of imgSet) {
            await deleteFileFromS3(sizeObj.url);
          }
        }
      }
    }

    await product.deleteOne();
    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete product' });
  }
};

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};