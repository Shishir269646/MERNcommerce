const Settings = require('../models/settings.model');
const {
    resizeAndUploadToS3,
    deleteFileFromS3,
} = require('../utils/s3Upload');

// @desc    Get all settings
// @route   GET /api/settings
// @access  Private/Admin
const getAllSettings = async (req, res) => {
    try {
        const settings = await Settings.find().populate('user').populate('products.product');
        res.json(settings);
    } catch (error) {
        console.error('Error getting settings:', error);
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Get single settings by ID
// @route   GET /api/settings/:id
// @access  Private/Admin
const getSettingsById = async (req, res) => {
    try {
        const settings = await Settings.findById(req.params.id).populate('user').populate('products.product');
        if (!settings) {
            return res.status(404).json({ message: 'Settings not found' });
        }
        res.json(settings);
    } catch (error) {
        console.error('Error fetching settings:', error);
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Create settings
// @route   POST /api/settings
// @access  Private/Admin
const createSettings = async (req, res) => {
    try {
        const userId = req.user._id;
        const products = req.body.products ? JSON.parse(req.body.products) : [];

        const imageFiles = Array.isArray(req.files)
            ? req.files
            : req.files?.images || [];

        const newImages = [];

        if (imageFiles.length > 0) {
            for (const file of imageFiles) {
                const uploadedVariants = await resizeAndUploadToS3(
                    file.path,
                    file.originalname,
                    file.mimetype,
                    'setting' // You can change this to 'banner', 'logo', etc. if needed
                );

                // Choose a default size to store in DB (e.g., 'medium')
                const defaultImage = uploadedVariants.find(v => v.size === 'medium') || uploadedVariants[0];
                if (defaultImage) newImages.push(defaultImage.url);
            }
        }

        const settings = new Settings({
            user: userId,
            products,
            images: newImages,
        });

        const savedSettings = await settings.save();
        res.status(201).json(savedSettings);
    } catch (error) {
        console.error('Error creating settings:', error);
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Update settings
// @route   PUT /api/settings/:id
// @access  Private/Admin
const updateSettings = async (req, res) => {
    try {
        const settings = await Settings.findById(req.params.id);
        if (!settings) {
            return res.status(404).json({ message: 'Settings not found' });
        }

        // Delete old images from S3
        for (const url of settings.images) {
            await deleteFileFromS3(url);
        }

        const imageFiles = Array.isArray(req.files)
            ? req.files
            : req.files?.images || [];

        const updatedImages = [];

        if (imageFiles.length > 0) {
            for (const file of imageFiles) {
                const uploadedVariants = await resizeAndUploadToS3(
                    file.path,
                    file.originalname,
                    file.mimetype,
                    'setting'
                );

                const defaultImage = uploadedVariants.find(v => v.size === 'medium') || uploadedVariants[0];
                if (defaultImage) updatedImages.push(defaultImage.url);
            }
        }

        settings.products = req.body.products ? JSON.parse(req.body.products) : settings.products;
        settings.images = updatedImages.length > 0 ? updatedImages : settings.images;

        const updated = await settings.save();
        res.json(updated);
    } catch (error) {
        console.error('Error updating settings:', error);
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Delete settings
// @route   DELETE /api/settings/:id
// @access  Private/Admin
const deleteSettings = async (req, res) => {
    try {
        const settings = await Settings.findByIdAndDelete(req.params.id);
        if (!settings) {
            return res.status(404).json({ message: 'Settings not found' });
        }

        for (const url of settings.images) {
            await deleteFileFromS3(url);
        }

        res.json({ message: 'Settings deleted successfully' });
    } catch (error) {
        console.error('Error deleting settings:', error);
        res.status(500).json({ message: 'Server Error' });
    }
};

module.exports = {
    getAllSettings,
    getSettingsById,
    createSettings,
    updateSettings,
    deleteSettings,
};
