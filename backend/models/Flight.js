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
  EconomyAvailableSeats: {
    type: Number,
    required: true,
  },
  EconomyPrice: {
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
  FirstClassAvailableSeats: {
    type: Number,
    required: true,
  },
  FirstClassPrice: {
    type: Number,
    required: true,
  },
  AllowedBaggage: {
    type: Number,
    required: true
  },
  NumberOfPassengers: {
    type: Object,
    required: true
  },
  FirstClassSeats:{
    type: Array,
    required: true
  },
  BusinessSeats:{
    type: Array,
    required: true
  },
  EconomySeats:{
    type: Array,
    required: true
  },
  
  // Gate:{
  //   type: String,
  //   required: true
  // },
  // DepartureAirportCode:{
  //   type: String,
  //   required: true
  // },
  // ArrivalAirportCode:{
  //   type: String,
  //   required: true
  // }
  DestinationCountry:{
    type: String,
    required: true
  },

  Destination:{
    type: String,
    required: true
  },

  ArrivalCountry:{
    type: String,
    required: true
  },
  Arrival:{
    type: String,
    required: true
  },
})

const Flight = mongoose.model('Flight', flightSchema)
module.exports = Flight