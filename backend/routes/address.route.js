const express = require('express');
const router = express.Router();
const {
    createAddress,
    getAddresses,
    getAddressById,
    updateAddress,
    deleteAddress,
} = require('../controllers/address.controller');





router.post("/", createAddress);
router.get("/", getAddresses);



router.get("/:id", getAddressById);
router.put("/:id", updateAddress);
router.delete("/:id", deleteAddress);


module.exports = router;
