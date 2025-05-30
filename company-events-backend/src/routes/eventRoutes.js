const express = require('express');
const { protect } = require('../middleware/keycloakMiddleware');
const eventController = require('../controllers/eventController');

const router = express.Router();

// Add your event routes here
router.get('/', eventController.getAllEvents);
router.get('/:id', eventController.getEventById);
router.post('/', protect(), eventController.createEvent);
router.put('/:id', protect(), eventController.updateEvent);
router.delete('/:id', protect(), eventController.deleteEvent);

module.exports = router;