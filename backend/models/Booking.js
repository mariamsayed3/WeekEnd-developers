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
  FlightNumber: {
    type: Number,
    required: true
  },
  Seats: {
    type: Array,
    required: true
  },
  DepartureDate: {
    type: Date,
    required: true,
  },
  ArrivalDate: {
    type: Date,
    required: true
  },
  DepartureTime: {
    type: String,
    required: true
  },
  ArrivalTime: {
    type: String,
    required: true
  },
  TripDuration: {
    type: String,
    required: true
  },
  DepartureAirport: {
    type: String,
    required: true,
  },
  ArrivalAirport: {
    type: String,
    required: true,
  },
  DepartureTerminal: {
    type: String,
    required: true,
  },
  ArrivalTerminal: {
    type: String,
    required: true,
  },
  Gate:{
    type: String,
    required: true
  },
  DepartureAirportCode:{
    type: String,
    required: true
  },
  ArrivalAirportCode:{
    type: String,
    required: true
  }
});

const Booking = mongoose.model('Booking', bookingSchema);
module.exports = Booking;