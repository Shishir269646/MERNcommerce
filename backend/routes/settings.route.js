const express = require('express');
const router = express.Router();

const {
  createSettings,
  getAllSettings,
  getSettingsById,
  updateSettings,
  deleteSettings,
} = require('../controllers/settings.controller');

const {
  protect,
  admin
} = require('../middleware/auth.middleware');

const { upload } = require('../utils/s3Upload');

// Define upload fields (max 15 images)
const uploadFields = upload.fields([{ name: "images", maxCount: 10 }]);


// Correct middleware order is important: uploadFields should come first
router.post('/', uploadFields, protect, admin, createSettings);
router.put('/:id', uploadFields, protect, admin, updateSettings);
router.get('/', getAllSettings);
router.get('/:id', protect, admin, getSettingsById);
router.delete('/:id', protect, admin, deleteSettings);

module.exports = router;
