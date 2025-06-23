const express = require("express");
const {
    registerUser,
    loginUser,
    deleteUser,
    getAllUsers
} = require("../controllers/auth.controller");

const { protect } = require("../middleware/auth.middleware");

const router = express.Router();


//Register a new user
router.post("/register", registerUser);


//Login user
router.post("/login", loginUser);


router.delete("/profile/:id", deleteUser);


//Get logged in user profile (protected)
router.get("/profile", getAllUsers);


module.exports = router;
