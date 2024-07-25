const { model, Schema } = require('mongoose');

const eventSchema = new Schema({
    title: String,
    description: String,
    location: String,
    date: Date,
    time: String,
    price: Number,
    category: String,  
    image: String,
    organizer:
    {
        name: String,
        ruc: String
    }
});

module.exports = model('Event', eventSchema);