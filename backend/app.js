const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");

// Routes
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

// CORS Configuration
const allowedOrigins = [
  "http://localhost:3000",
  "https://mern-commerce-eight.vercel.app"
];

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (mobile apps, Postman, etc.)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"), false);
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

// Body Parser Middleware with limits
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));
app.use(bodyParser.json({ limit: '10mb' }));

// API Routes
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

// Home Route
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "index.html"));
});

// 404 Handler
app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    message: "Route not found"
  });
});

// Global Error Handler
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  console.error(err.stack);

  res.status(statusCode).json({
    success: false,
    message: err.message || "Internal Server Error",
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
});

module.exports = app;
