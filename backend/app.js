const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");

const authRoutes = require("./routes/user.route");
const orderRoutes = require("./routes/order.route");
const productRoutes = require("./routes/product.route");
const CategoryRoutes = require("./routes/category.route");
const AddressRouter = require("./routes/address.route");
const reviewRoutes = require('./routes/review.routes');
const couponRoutes = require('./routes/coupon.routes');
const wishlistRoutes = require('./routes/wishlist.routes');
const cartRoutes = require('./routes/cart.route');
const settingsRoutes = require('./routes/settings.route');





const app = express();

// Middleware
app.use(cors({
    origin: 'https://mern-commerce-mocha.vercel.app',
    credentials: true,
}));


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());



// Routes
app.use('/api/auth', authRoutes);
app.use('/api/order', orderRoutes);
app.use('/api/product', productRoutes);
app.use('/api/category', CategoryRoutes);
app.use('/api/address', AddressRouter);
app.use('/api/reviews', reviewRoutes);
app.use('/api/coupon', couponRoutes);
app.use('/api/wishlist', wishlistRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/settings', settingsRoutes);





// Home Page Route
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "index.html"));
});


// 404 Route Not Found
app.use((req, res, next) => {
    res.status(404).json({ message: "Route not found" });
});


// Global Error Handler
app.use((err, req, res, next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    console.error(err.stack);
    res.status(statusCode).json({ message: err.message || "Something broke!" });
});



module.exports = app;
