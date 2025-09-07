const express = require('express');
const router = express.Router();

const {
    createCoupon,
    getAllCoupons,
    getCouponById,
    validateCoupon,
    updateCoupon,
    deleteCoupon,
} = require('../controllers/coupon.controller');

const { protect, admin } = require('../middleware/auth.middleware');

router.post('/', protect, admin, createCoupon);
router.get('/', getAllCoupons);

router.get("/:id", getCouponById);
router.put("/:id", protect, admin, updateCoupon);
router.delete("/:id", protect, admin, deleteCoupon);

router.post('/validate', protect, validateCoupon);

module.exports = router;
