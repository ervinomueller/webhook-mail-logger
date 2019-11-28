const mongoose = require('mongoose')

const eventSchema = new mongoose.Schema({
    body: [{}],
    createdAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Event', eventSchema)