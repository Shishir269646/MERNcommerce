
const mongoose = require('mongoose');

const colorVariantSchema = new mongoose.Schema({
  value: { type: String, required: true },
  bgcolor: { type: String, required: true },
});

const sizeVariantSchema = new mongoose.Schema({
  value: { type: String, required: true },
  label: { type: String, required: true },
  disabled: { type: Boolean, default: false },
});


const specificationSchema = {
  type: Map,
  of: String,
  default: {},
};

const reviewSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  rating: { type: Number, required: true },
  comment: String,
  createdAt: { type: Date, default: Date.now },
}, { _id: false });

const commentSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  message: String,
  createdAt: { type: Date, default: Date.now },
}, { _id: false });

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

  Image: [{ type: String, required: true }],

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

