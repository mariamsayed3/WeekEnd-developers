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
  FlightNumber: {
    type: String,
    required: true,
  },
  ReservationNumber: {
    type: String,
    required: true,
    unique: true,
  },
  TotalPrice: {
    type: Number,
    required: true,
  },
  Seats: {
    type: Object,
    required: true
  }, 
  Children: {
    type: Number,
    required: true

  }, 

});

const Booking = mongoose.model('Booking', bookingSchema);
module.exports = Booking;