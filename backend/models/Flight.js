const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const flightSchema = new Schema({
  FlightNumber: {
    type: String,
    required: true,
  },
  DepartureTime: {
    type: Date,
    required: true,
  },
  ArrivalTime: {
    type: Date,
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
  EconomyTotalSeats: {
    type: Number,
    required: true,
  },
  EconomyAvailableSeats: {
    type: Number,
    required: true,
  },
  EconomyPrice: {
    type: Number,
    required: true,
  },
  BusinessTotalSeats: {
    type: Number,
    required: true,
  },
  BusinessAvailableSeats: {
    type: Number,
    required: true,
  },
  BusinessPrice: {
    type: Number,
    required: true,
  },
  TripDuration: {
    type: Object,
    required: true
  },
  AllowedBaggage: {
    type: Number,
    required: true
  },
  Seats:{
    type: Array,
    required: true
  },
  NumberOfPassengers: {
    type: Object,
    required: true
  }
})

const Flight = mongoose.model('Flight', flightSchema)
module.exports = Flight