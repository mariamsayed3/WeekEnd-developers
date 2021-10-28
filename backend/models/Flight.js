const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const flightSchema = new Schema({
  FlightNumber: {
    type: String,
    required: true,
  },
  Departure: {
    type: Object,
    required: true,
  },
  Arrival: {
    type: Object,
    required: true
  },
  EconomyClass: {
    type: Object,
    required: true,
  },
  BusinessClass: {
    type: Object,
    required: true
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
  }
});

const Flight = mongoose.model('Flight', flightSchema)
module.exports = Flight