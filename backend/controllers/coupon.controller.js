const Coupon = require('../models/coupon.model');



const createCoupon = async (req, res) => {
    try {
        const { code, discountPercent, expiresAt } = req.body;

        const existing = await Coupon.findOne({ code });
        if (existing) {
            return res.status(400).json({ message: 'Coupon code already exists' });
        }

        const coupon = new Coupon({
            code,
            discountPercent,
            expiresAt,
        });

        const saved = await coupon.save();
        res.status(201).json(saved);
    } catch (error) {
        res.status(500).json({ message: 'Failed to create coupon', error: error.message });
    }
};



const getAllCoupons = async (req, res) => {
    try {
        const coupons = await Coupon.find().sort({ createdAt: -1 });
        res.status(200).json(coupons);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch coupons', error: error.message });
    }
};


const getCouponById = async (req, res) => {
    try {
        const coupon = await Coupon.findById(req.params.id);

        if (!coupon) {
            return res.status(404).json({ message: 'Coupon not found' });
        }

        res.status(200).json(coupon);
    } catch (error) {
        res.status(500).json({ message: 'Failed to get coupon', error: error.message });
    }
};


const validateCoupon = async (req, res) => {
    try {
        const { code } = req.body;

        const coupon = await Coupon.findOne({ code, active: true });

        if (!coupon) {
            return res.status(404).json({ message: 'Invalid or inactive coupon code' });
        }

        if (new Date(coupon.expiresAt) < new Date()) {
            return res.status(400).json({ message: 'Coupon has expired' });
        }

        res.status(200).json(coupon);
    } catch (error) {
        res.status(500).json({ message: 'Coupon validation failed', error: error.message });
    }
};


const updateCoupon = async (req, res) => {
    try {
        const updated = await Coupon.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });

        if (!updated) {
            return res.status(404).json({ message: 'Coupon not found' });
        }

        res.status(200).json(updated);
    } catch (error) {
        res.status(500).json({ message: 'Failed to update coupon', error: error.message });
    }
};



const deleteCoupon = async (req, res) => {
    try {
        const deleted = await Coupon.findByIdAndDelete(req.params.id);

        if (!deleted) {
            return res.status(404).json({ message: 'Coupon not found' });
        }

        res.status(200).json({ message: 'Coupon deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete coupon', error: error.message });
    }
};

module.exports = {
    createCoupon,
    getAllCoupons,
    getCouponById,
    validateCoupon,
    updateCoupon,
    deleteCoupon
};