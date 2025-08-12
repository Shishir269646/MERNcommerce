const express = require('express');
const {
    registerUser,
    loginUser,
    getUserProfile,
    getAllUsers,
    deleteUser,
} = require('../controllers/auth.controller');
const { protect, admin } = require('../middleware/auth.middleware');

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);

router.get('/profile', protect, getUserProfile);
router.get('/users', protect, admin, getAllUsers);
router.delete('/user/:id', protect, admin, deleteUser);

module.exports = router;
