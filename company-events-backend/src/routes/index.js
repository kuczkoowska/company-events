const express = require('express');
const eventRoutes = require('./eventRoutes');
const userRoutes = require('./userRoutes');

const router = express.Router();

router.use('/events', eventRoutes);
router.use('/users', userRoutes);

module.exports = router;