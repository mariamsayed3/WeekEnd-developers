const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const flightSchema = new Schema({
  FlightNumber: {
    type: String,
    required: true,
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
  },
})

const Flight = mongoose.model('Flight', flightSchema)
module.exports = Flight