

const Category = require('../models/category.model');
const {
  resizeAndUploadToS3,
  deleteFileFromS3,
} = require('../utils/s3Upload');


const createCategory = async (req, res) => {
  try {
    const { name, description = '' } = req.body;
    if (!name) return res.status(400).json({ message: 'Name field is required' });

    let imageUrl = '';


    if (req.file) {
      const uploadedVariants = await resizeAndUploadToS3(
        req.file.path,
        req.file.originalname,
        req.file.mimetype,
        'category'
      );


      imageUrl = uploadedVariants.find(v => v.size === 'medium')?.url || uploadedVariants[0]?.url;
    }

    const category = await Category.create({ name, description, image: imageUrl });
    res.status(201).json(category);
  } catch (err) {
    console.error('Create Category Error:', err);
    res.status(501).json({ message: 'Failed to create category' });
  }
};


const getAllCategories = async (_req, res) => {
  try {
    const categories = await Category.find().sort({ createdAt: -1 });
    res.status(200).json(categories);
  } catch (err) {
    res.status(501).json({ message: 'Failed to fetch categories' });
  }
};


const getCategoryById = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) return res.status(404).json({ message: 'Category not found' });
    res.status(200).json(category);
  } catch (err) {
    res.status(501).json({ message: 'Failed to fetch category' });
  }
};



const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      name,
      description,
      removeImage = 'false',
    } = req.body;

    const category = await Category.findById(id);
    if (!category) return res.status(404).json({ message: 'Category not found' });

    if (name) category.name = name;
    if (description !== undefined) category.description = description;

    const shouldRemoveImg = ['true', true].includes(removeImage);
    if (shouldRemoveImg && category.image) {
      await deleteFileFromS3(category.image);
      category.image = '';
    }

    if (req.file) {
      // Delete old image
      if (category.image) await deleteFileFromS3(category.image);

      const uploadedVariants = await resizeAndUploadToS3(
        req.file.path,
        req.file.originalname,
        req.file.mimetype,
        'category'
      );

      category.image = uploadedVariants.find(v => v.size === 'medium')?.url || uploadedVariants[0]?.url;
    }

    const updated = await category.save();
    res.status(200).json(updated);
  } catch (err) {
    console.error('Update Category Error:', err);
    res.status(501).json({ message: 'Failed to update category' });
  }
};




const deleteCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) return res.status(404).json({ message: 'Category not found' });

    if (category.image) await deleteFileFromS3(category.image);

    await category.deleteOne();
    res.status(200).json({ message: 'Category deleted successfully' });
  } catch (err) {
    res.status(501).json({ message: 'Failed to delete category' });
  }
};

module.exports = {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
};
