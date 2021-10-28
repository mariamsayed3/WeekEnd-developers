const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.ObjectId

const bookingSchema = new Schema({
  User: {
    type: ObjectId,
    required: true,
  },
  Flight: {
    type: ObjectId,
    required: true,
  },
  ReservationNumber: {
    type: String,
    required: true,
  },
  TotalPrice: {
    type: Number,
    required: true,
  },
  NumberOfSeats: {
    type: Object, // for adults and children
    required: true,
  },
  Flightnumber: {
    type: String,
    required: true
  },
  Seats: {
    type: Array,
    required: true
  },
});

const Booking = mongoose.model('Booking', bookingSchema);
module.exports = Booking;