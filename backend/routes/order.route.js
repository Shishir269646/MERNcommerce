const express = require("express");

const {
    createOrder,
    getMyOrders,
    getOrderById,
    getAllOrders,
    updateOrderToPaid,
    updateOrderToDelivered,
} = require("../controllers/order.controller");

const { protect, admin } = require("../middleware/auth.middleware");

const router = express.Router();


// User Routes
router.post("/", protect, createOrder);
router.get("/my-orders", protect, getMyOrders);
router.get("/:id", protect, getOrderById);
router.put("/:id/pay", protect, updateOrderToPaid);


// Admin Routes
router.get("/", protect, admin, getAllOrders);
router.put("/:id/deliver", protect, admin, updateOrderToDelivered);




module.exports = router;
