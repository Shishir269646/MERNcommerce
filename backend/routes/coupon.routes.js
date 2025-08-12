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



router.post('/', createCoupon);
router.get('/', getAllCoupons);



router.get("/:id", getCouponById);
router.put("/:id", updateCoupon);
router.delete("/:id", deleteCoupon);



router.post('/validate', validateCoupon);

module.exports = router;
