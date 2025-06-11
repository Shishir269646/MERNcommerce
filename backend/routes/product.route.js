const express = require("express");

const {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  uploadFields
} = require("../controllers/product.controller");

const {
  protect,
  admin
} = require("../middleware/auth.middleware");

const router = express.Router();


// Public Routes
router.get("/", getAllProducts);             // GET all products
router.get("/:id", getProductById);          // GET single product


// Admin Routes (Protected)
router.post("/", uploadFields, createProduct);         // CREATE new product
router.put("/:id", uploadFields, updateProduct);       // UPDATE product
router.delete("/:id", deleteProduct);    // DELETE product





module.exports = router;