const router = require('express').Router();
const reservationController = require('../../controllers/reservationController');

router.get('/', reservationController.getReservations);
router.get('/:reservationId', reservationController.getReservationById);
router.post('/', reservationController.createReservation);
router.delete('/:reservationId', reservationController.deleteReservation);
router.put('/:reservationId', reservationController.updateReservation);
// router.get('/:userId/reservations',reservationController.getReservationsByUserId);
router.get('/:userId/byIdUser', async (req, res) => {
    try {
        const userId = req.params.userId;
        const reservations = await reservationController.getReservationsByUserId(userId);
        res.json(reservations);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
module.exports = router;
