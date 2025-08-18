const express = require('express');
const router = express.Router();
const {
    createAddress,
    getAddresses,
    getAddressById,
    updateAddress,
    deleteAddress,
} = require('../controllers/address.controller');

const { protect } = require("../middleware/auth.middleware");



router.post("/", protect, createAddress);
router.get("/", protect, getAddresses);



router.get("/:id", protect, getAddressById);
router.put("/:id", protect, updateAddress);
router.delete("/:id", protect, deleteAddress);


module.exports = router;
