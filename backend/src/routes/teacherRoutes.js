const express = require('express');
const router = express.Router();
const { register, login, logout, profile } = require('../controllers/teacherController');
const { protect } = require('../middlewares/authMiddleware');

router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);
router.get('/profile', protect, profile);

module.exports = router;
