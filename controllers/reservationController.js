const Reservation = require('../models/reservation.model');
const bcrypt = require('bcrypt');
const saltRounds = 10; 

exports.getReservations = async (req, res) => {
    try {
        const reservations = await Reservation.find();
        return res.json(reservations);
    } catch (error) {
        return res.status(500).send('Error');
    }
}

exports.getReservationById = async (req, res) => {
    try {
        const { reservationId } = req.params;
        const reservation = await Reservation.findById(reservationId);
        return res.json(reservation);
    } catch (error) {
        return res.status(500).send('Error');
    }
}

exports.createReservation = async (req, res) => {
    try {
        let reservation;
        const { event_id, user_id, ticket_quantity, status, total_price } = req.body;
        reservation = new Reservation({
            event_id,
            user_id,
            ticket_quantity,
            status,
            total_price,
        });
        await reservation.save();
        return res.send(reservation);
    } catch (e) {
        return res.status(500).send('Error');
    }
}

exports.deleteReservation = async (req, res) => {
    try {
        let reservation = await Reservation.findById(req.params.reservationId);
        if (!reservation) {
            return res.status(404).json({ msg: 'Reservation does not exist' });
        }
        await Reservation.findByIdAndDelete(req.params.reservationId);
        return res.json({ msg: 'Reservation successfully removed' });
    } catch (e) {
        return res.status(500).json('Error');
    }
}

exports.updateReservation = async (req, res) => {
    try {
        const { reservationId } = req.params;
        const { event_id, user_id, ticket_quantity, status, total_price } = req.body;
        let reservation = await Reservation.findById(reservationId);
        if (!reservation) {
            return res.status(404).json({ msg: 'Reservation not found' });
        }
        reservation.event_id = event_id;
        reservation.user_id = user_id;
        reservation.ticket_quantity = ticket_quantity;
        reservation.status = status;
        reservation.total_price = total_price;
        await reservation.save();
        return res.json(reservation);
    } catch (e) {
        return res.status(500).send('Error updating reservation');
    }
}
exports.getReservationsByUserId = async (userId) => {
    try {
        const reservations = await Reservation.find({'user_id':userId});
        return reservations;
    } catch (error) {
        throw new Error('Error getting reservations by user ID');
    }
}
// exports.getReservationsByUserId = async (userId) => {
//     try {
//         // Buscar las reservas por el ID de usuario
//         const reservations = await Reservation.findByUserId(userId);
//         return reservations;
//     } catch (error) {
//         throw new Error('Error getting reservations by user ID');
//     }
// }
