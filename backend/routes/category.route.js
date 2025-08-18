const express = require("express");
const {
    getAllCategories,
    createCategory,
    updateCategory,
    deleteCategory,
} = require("../controllers/category.controller");

const { protect, admin } = require("../middleware/auth.middleware");
const { upload } = require("../utils/s3Upload");

const router = express.Router();


const uploadSingle = upload.single("image");


router.get("/", getAllCategories);


router.post("/", protect, admin, uploadSingle, createCategory);
router.put("/:id", protect, admin, uploadSingle, updateCategory);
router.delete("/:id", protect, admin, deleteCategory);

module.exports = router;
