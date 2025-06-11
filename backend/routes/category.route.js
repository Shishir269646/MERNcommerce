const express = require("express");

const {
    getAllCategories,
    getCategoryByName,
    createCategory,
    updateCategory,
    deleteCategory,
    uploadFields
} = require("../controllers/category.controller");

const {
    protect,
    admin
} = require("../middleware/auth.middleware");

const router = express.Router();




// Admin Routes (Protected)
router.get("/", getAllCategories);             // GET all Category         // GET single Category
router.post("/", uploadFields, createCategory);         // CREATE new Category
router.put("/:id", uploadFields, updateCategory);       // UPDATE Category
router.delete("/:id", deleteCategory);    // DELETE Category





module.exports = router; 