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
  admin
} = require('../middleware/auth.middleware');

const { upload } = require('../utils/s3Upload');

// Define upload fields (max 10 images)
const uploadFields = upload.fields([{ name: "images", maxCount: 10 }]);




router.post('/', uploadFields,  admin, createSettings);
router.put('/:id', uploadFields,  admin, updateSettings);
router.get('/', getAllSettings);
router.get('/:id',  admin, getSettingsById);
router.delete('/:id', admin, deleteSettings);

module.exports = router;
