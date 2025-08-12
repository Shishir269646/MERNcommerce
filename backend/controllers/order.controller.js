const Order = require("../models/order.model");


// Create a new order

const createOrder = async (req, res, next) => {
    try {
        const {
            orderItems,
            shippingAddress,
            paymentMethod,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice,
        } = req.body;

        if (!orderItems || orderItems.length === 0) {
            res.status(400);
            return next(new Error("No order items"));
        }

        const order = new Order({
            user: req.user._id,
            orderItems,
            shippingAddress,
            paymentMethod,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice,
        });

        const createdOrder = await order.save();
        res.status(201).json(createdOrder);
    } catch (err) {
        next(err);
    }
};

//Get logged-in user's orders

const getMyOrders = async (req, res, next) => {
    try {
        const orders = await Order.find({ user: req.user._id });
        res.status(200).json(orders);
    } catch (err) {
        next(err);
    }
};

//Get order by ID

const getOrderById = async (req, res, next) => {
    try {
        const order = await Order.findById(req.params.id).populate("user", "name email");

        if (!order) {
            res.status(404);
            return next(new Error("Order not found"));
        }

        res.status(200).json(order);
    } catch (err) {
        next(err);
    }
};

//Update order to paid
const updateOrderToPaid = async (req, res, next) => {
    try {
        const order = await Order.findById(req.params.id);

        if (!order) {
            res.status(404);
            return next(new Error("Order not found"));
        }

        order.isPaid = true;
        order.paidAt = Date.now();
        order.paymentResult = {
            id: req.body.id,
            status: req.body.status,
            update_time: req.body.update_time,
            email_address: req.body.payer.email_address,
        };

        const updatedOrder = await order.save();
        res.status(200).json(updatedOrder);
    } catch (err) {
        next(err);
    }
};

//Update order to delivered (Admin)

const updateOrderToDelivered = async (req, res, next) => {
    try {
        const order = await Order.findById(req.params.id);

        if (!order) {
            res.status(404);
            return next(new Error("Order not found"));
        }

        order.isDelivered = true;
        order.deliveredAt = Date.now();

        const updatedOrder = await order.save();
        res.status(200).json(updatedOrder);
    } catch (err) {
        next(err);
    }
};

//Get all orders (Admin)

const getAllOrders = async (req, res, next) => {
    try {
        const orders = await Order.find({}).populate("user", "id name");
        res.status(201).json(orders);
    } catch (err) {
        next(err);
    }
};



module.exports = {
    createOrder,
    getMyOrders,
    getOrderById,
    updateOrderToPaid,
    updateOrderToDelivered,
    getAllOrders
}
