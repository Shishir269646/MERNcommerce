const express = require("express");

const {
    getAllCategories,
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





router.get("/", getAllCategories);
router.post("/", uploadFields, createCategory);
router.put("/:id", uploadFields, updateCategory);
router.delete("/:id", deleteCategory);





module.exports = router; 