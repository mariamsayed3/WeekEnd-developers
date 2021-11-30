const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.ObjectId
const summarySchema = new Schema({
    DepartureFlight: {
        type: Object,
        required: true,
    },
    ReturnFlight: {
    type: Object,
    required: true,
    },
    DepartureBooking: {
        type: Object,
        required: true,
    },
    ReturnBooking: {
        type: Object,
        required: true,
    },
    User: {
        type: ObjectId,
        required: true
    }

})

const Summary = mongoose.model('Summary', summarySchema)
module.exports = Summary