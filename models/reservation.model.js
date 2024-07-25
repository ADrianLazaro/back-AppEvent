const { model, Schema } = require('mongoose');

const reservationSchema = new Schema({
    event_id: { type: Schema.Types.ObjectId, ref: 'Event' },
    user_id: { type: Schema.Types.ObjectId, ref: 'User' }, // Referencia al modelo User
    ticket_quantity: Number,
    status: String,
    total_price: Number,
    reservation_date: { type: Date, default: Date.now }
});

module.exports = model('Reservation', reservationSchema);
