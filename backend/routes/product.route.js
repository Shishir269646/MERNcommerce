const express = require("express");
const router = express.Router();
const {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/product.controller");

const { upload } = require("../utils/s3Upload");
const { protect, admin } = require("../middleware/auth.middleware");



// Multer Field
const uploadFields = upload.fields([
  { name: 'Image', maxCount: 10 }
]);

//Public Route
router.get("/", getAllProducts);
router.get("/:id", getProductById);

//Admin Route
router.post("/", protect, admin, uploadFields, createProduct);

router.put("/:id", protect, admin, uploadFields, updateProduct);

router.delete("/:id", protect, admin, deleteProduct);

module.exports = router;
