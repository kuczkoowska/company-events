const express = require('express');
const { registerUser, loginUser, getUserProfile } = require('../controllers/userController');
const { protect } = require('../middleware/keycloakMiddleware');

const router = express.Router();

// If these are custom endpoints for users who aren't authenticated yet
router.post('/register', registerUser);
router.post('/login', loginUser);

// Protected route using Keycloak
router.get('/profile', protect(), getUserProfile);

export default router;