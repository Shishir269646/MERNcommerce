const express = require("express");

const {
    createOrder,
    getMyOrders,
    getOrderById,
    getAllOrders,
    updateOrderToPaid,
    updateOrderToDelivered,
} = require("../controllers/order.controller");



const router = express.Router();


// User Routes (Protected)
router.post("/", createOrder);              // Create new order
router.get("/my-orders", getMyOrders);      // Get user's orders
router.get("/:id", getOrderById);           // Get order by ID
router.put("/:id/pay", updateOrderToPaid);  // Mark as paid


// Admin Routes
router.get("/", getAllOrders);                   // Get all orders
router.put("/:id/deliver", updateOrderToDelivered); // Mark as delivered




module.exports = router;
