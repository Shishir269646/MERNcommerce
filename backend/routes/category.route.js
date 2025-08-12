const express = require("express");

const {
    getAllCategories,
    createCategory,
    updateCategory,
    deleteCategory,
} = require("../controllers/category.controller");

const {
    protect,
    admin
} = require("../middleware/auth.middleware");

const { upload } = require("../utils/s3Upload");

const router = express.Router();

const uploadFields = upload.single("Image")



router.get("/", getAllCategories);
router.post("/", uploadFields, createCategory);
router.put("/:id", uploadFields, updateCategory);
router.delete("/:id", deleteCategory);





module.exports = router; 