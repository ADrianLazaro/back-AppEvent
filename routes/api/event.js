const router = require('express').Router();
const eventController = require('../../controllers/eventController');

router.get('/', eventController.getEvents);
router.get('/:eventId', eventController.getEventById);
router.post('/', eventController.createEvent);
router.delete('/:eventId', eventController.deleteEvent);
router.put('/:eventId', eventController.updateEvent);

module.exports = router;