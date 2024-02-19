const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    Date:{
        type: Date,
        required: true
    },
    startTime: {
        type: Date,
        required: true
    }
});

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;