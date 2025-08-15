const mongoose = require('mongoose');

// Color variant schema
const colorVariantSchema = new mongoose.Schema({
  value: { type: String, required: true },
  bgcolor: { type: String, required: true },
}, { _id: false });

// Size variant schema
const sizeVariantSchema = new mongoose.Schema({
  value: { type: String, required: true },
  label: { type: String, required: true },
  disabled: { type: Boolean, default: false },
}, { _id: false });

// Image variant schema (for size + url)
const imageVariantSchema = new mongoose.Schema({
  size: { type: String, required: true },
  url: { type: String, required: true },
}, { _id: false });

// Specifications (Map of strings)
const specificationSchema = {
  type: Map,
  of: String,
  default: {},
};

// Review schema
const reviewSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  rating: { type: Number, required: true },
  comment: String,
  createdAt: { type: Date, default: Date.now },
}, { _id: false });

// Comment schema
const commentSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  message: String,
  createdAt: { type: Date, default: Date.now },
}, { _id: false });

// Main product schema
const productSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,

  brand: String,
  category: String,
  sku: String,

  price: { type: Number, required: true },
  discountPrice: Number,
  discountPercentage: Number,

  stock: { type: Number, default: 0 },

  // Support array of arrays of size+url objects
  Image: [[imageVariantSchema]],

  colorVariants: [colorVariantSchema],
  sizeVariants: [sizeVariantSchema],

  selectedColor: String,
  selectedSize: String,

  material: String,
  dimensions: String,
  weight: String,
  warranty: String,
  returnPolicy: String,

  specifications: specificationSchema,

  rating: { type: Number, default: 0 },
  reviewCount: { type: Number, default: 0 },
  reviews: [reviewSchema],
  comments: [commentSchema],

}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
