const Product = require("../models/product.model");
const multer = require("multer");
const path = require("path");

// Multer Setup
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/product");
  },
  filename: function (req, file, cb) {
    const uniqueName =
      Date.now() + "-" + Math.round(Math.random() * 1e9) + path.extname(file.originalname);
    cb(null, uniqueName);
  },
});

const upload = multer({ storage });

// Update upload fields: previews and thumbs each max 10 files
const uploadFields = upload.fields([
  { name: "previews", maxCount: 10 },
  { name: "thumbs", maxCount: 10 },
]);

// Helper to create preview-thumb pairs from uploaded files
function createPreviewThumbPairs(previewFiles = [], thumbFiles = []) {
  // Assuming both arrays are aligned by index
  const pairs = [];
  const maxLength = Math.max(previewFiles.length, thumbFiles.length);
  for (let i = 0; i < maxLength; i++) {
    pairs.push({
      previewUrl: previewFiles[i] ? previewFiles[i].filename : null,
      thumbUrl: thumbFiles[i] ? thumbFiles[i].filename : null,
    });
  }
  return pairs;
}

// Create product
const createProduct = async (req, res, next) => {
  try {
    const {
      title,
      description,
      price,
      discountPrice,
      stock,
      colorVariants,
      sizeVariants,
      specifications,
      reviews,
      comments,
      brand,
      category,
      sku,
      material,
      dimensions,
      weight,
      warranty,
      returnPolicy,
      rating,
    } = req.body;

    const previewFiles = req.files?.previews || [];
    const thumbFiles = req.files?.thumbs || [];

    const previews = createPreviewThumbPairs(previewFiles, thumbFiles);

    const product = new Product({
      title,
      description,
      price,
      discountPrice,
      stock,
      previews, // array of { previewUrl, thumbUrl }
      colorVariants: colorVariants ? JSON.parse(colorVariants) : [],
      sizeVariants: sizeVariants ? JSON.parse(sizeVariants) : [],
      specifications: specifications ? JSON.parse(specifications) : {},
      reviews: reviews ? JSON.parse(reviews) : [],
      comments: comments ? JSON.parse(comments) : [],
      brand,
      category,
      sku,
      material,
      dimensions,
      weight,
      warranty,
      returnPolicy,
      rating: rating ?? 0,
    });

    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
  } catch (err) {
    next(err);
  }
};

// Update product (same logic for previews)
const updateProduct = async (req, res, next) => {
  try {
    const {
      title,
      description,
      price,
      discountPrice,
      stock,
      colorVariants,
      sizeVariants,
      specifications,
      reviews,
      comments,
      brand,
      category,
      sku,
      material,
      dimensions,
      weight,
      warranty,
      returnPolicy,
      rating,
    } = req.body;

    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    const previewFiles = req.files?.previews || [];
    const thumbFiles = req.files?.thumbs || [];

    const newPreviews = createPreviewThumbPairs(previewFiles, thumbFiles);

    product.title = title ?? product.title;
    product.description = description ?? product.description;
    product.price = price ?? product.price;
    product.discountPrice = discountPrice ?? product.discountPrice;
    product.stock = stock ?? product.stock;
    product.previews = newPreviews.length ? newPreviews : product.previews;
    product.colorVariants = colorVariants ? JSON.parse(colorVariants) : product.colorVariants;
    product.sizeVariants = sizeVariants ? JSON.parse(sizeVariants) : product.sizeVariants;
    product.specifications = specifications ? JSON.parse(specifications) : product.specifications;
    product.reviews = reviews ? JSON.parse(reviews) : product.reviews;
    product.comments = comments ? JSON.parse(comments) : product.comments;
    product.brand = brand ?? product.brand;
    product.category = category ?? product.category;
    product.sku = sku ?? product.sku;
    product.material = material ?? product.material;
    product.dimensions = dimensions ?? product.dimensions;
    product.weight = weight ?? product.weight;
    product.warranty = warranty ?? product.warranty;
    product.returnPolicy = returnPolicy ?? product.returnPolicy;
    product.rating = rating ?? product.rating;

    const updatedProduct = await product.save();
    res.status(200).json(updatedProduct);
  } catch (err) {
    next(err);
  }
};

const getAllProducts = async (req, res, next) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (err) {
    next(err);
  }
};

const getProductById = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.status(200).json(product);
  } catch (err) {
    next(err);
  }
};

const deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    await product.deleteOne();
    res.status(200).json({ message: "Product removed" });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  uploadFields,
};
