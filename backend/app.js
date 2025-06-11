const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");

const authRoutes = require("./routes/user.route");
const orderRoutes = require("./routes/order.route");
const productRoutes = require("./routes/product.route");
const CategoryRoutes = require("./routes/category.route");

const app = express();

// Middleware
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true, 
  }));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());



// Routes
app.use('/api/auth', authRoutes);
app.use('/api/order', orderRoutes);
app.use('/api/product', productRoutes);
app.use('/api/category', CategoryRoutes);



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
    console.error(err.stack);
    res.status(500).json({ message: "Something broke!" });
});



module.exports = app;