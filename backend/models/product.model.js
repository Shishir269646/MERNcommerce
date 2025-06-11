const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  discountPrice: { type: Number },
  stock: { type: Number, default: 0 },
  previews: [
    {
      previewUrl: { type: String },
      thumbUrl: { type: String },
    },
  ],
  colorVariants: [
    {
      bgcolor: { type: String },
      value: { type: String },
    },
  ],
  sizeVariants: [
    {
      label: { type: String },
      value: { type: String },
      title: { type: String },
    },
  ],
  specifications: {
    type: Map,
    of: String,
  },
  reviews: [
    {
      user: { type: String },
      rating: { type: Number, min: 1, max: 5 },
      comment: { type: String },
    },
  ],
  comments: [
    {
      user: { type: String },
      message: { type: String },
    },
  ],
  brand: { type: String },
  category: { type: String },
  sku: { type: String, unique: true },
  material: { type: String },
  dimensions: { type: String },
  weight: { type: String },
  warranty: { type: String },
  returnPolicy: { type: String },
  rating: { type: Number, min: 0, max: 5 },
}, { timestamps: true });

const Product = mongoose.models.Product || mongoose.model("Product", productSchema);

module.exports = Product;
