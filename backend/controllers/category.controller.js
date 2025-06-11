const Category = require("../models/category.model");
const multer = require("multer");
const path = require("path");

// Multer storage config
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/categories/");
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({ storage });

// Upload image field
const uploadFields = upload.fields([{ name: "Image", maxCount: 1 }]);

// GET all categories
const getAllCategories = async (req, res, next) => {
    try {
        const categories = await Category.find({});
        res.status(200).json(categories);
    } catch (err) {
        next(err);
    }
};

// CREATE a category (with optional image)
const createCategory = async (req, res, next) => {
    try {
        const { name } = req.body;

        const categoryData = { name };

        if (req.files?.Image && req.files.Image[0]) {
            categoryData.image = req.files.Image[0].filename; // save filename to DB
        }

        const newCategory = new Category(categoryData);
        const saved = await newCategory.save();

        res.status(201).json(saved);
    } catch (err) {
        next(err);
    }
};

// UPDATE a category by ID
const updateCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const { name } = req.body;

        const category = await Category.findById(id);
        if (!category) return res.status(404).json({ message: 'Category not found' });

        category.name = name || category.name;

        if (req.files?.Image && req.files.Image[0]) {
            category.image = req.files.Image[0].filename;
        }

        await category.save();
        res.status(200).json({ message: 'Category updated successfully', category });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

// DELETE a category by ID
const deleteCategory = async (req, res, next) => {
    try {
        const category = await Category.findById(req.params.id);
        if (!category) return res.status(404).json({ message: "Category not found" });

        await category.deleteOne();
        res.status(200).json({ message: "Category deleted successfully" });
    } catch (err) {
        next(err);
    }
};

module.exports = {
    getAllCategories,
    createCategory,
    updateCategory,
    deleteCategory,
    uploadFields
};
