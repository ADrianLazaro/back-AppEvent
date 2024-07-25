const Event = require('../models/event.model');

exports.getEvents = async (req, res) => {
    try {
        const events = await Event.find();
        return res.json(events);
    } catch (error) {
        return res.status(500).send('Error');
    }
}

exports.getEventById = async (req, res) => {
    try {
        const { eventId } = req.params;
        const event = await Event.findById(eventId);
        return res.json(event);
    } catch (error) {
        return res.status(500).send('Error');
    }
}

exports.createEvent = async (req, res) => {
    try {
        let event;
        const { title, description, location, date, time, price, category, image, organizer } = req.body;
        event = new Event({
            title,
            description,
            location,
            date,
            time,
            price,
            category,
            image,
            organizer
        });
        await event.save();
        return res.send(event);
    } catch (e) {
        return res.status(500).send('Error');
    }
}

exports.deleteEvent = async (req, res) => {
    try {
        let event = await Event.findById(req.params.eventId);
        if (!event) {
            return res.status(404).json({ msg: 'Event does not exist' });
        }
        await Event.findByIdAndDelete(req.params.eventId);
        return res.json({ msg: 'Event successfully removed' });
    } catch (e) {
        return res.status(500).json('Error');
    }
}

exports.updateEvent = async (req, res) => {
    try {
        const { eventId } = req.params;
        const { title, description, location, date, time, price, category, image, organizer } = req.body;
        let event = await Event.findById(eventId);
        if (!event) {
            return res.status(404).json({ msg: 'Event not found' });
        }
        event.title = title;
        event.description = description;
        event.location = location;
        event.date = date;
        event.time = time;
        event.price = price;
        event.category = category;
        event.image = image;
        event.organizer = organizer;
        await event.save();
        return res.json(event);
    } catch (e) {
        return res.status(500).send('Error updating event');
    }
}
