require('./db/db')
require('dotenv').config();
const mongoose = require('mongoose')

const User = require('./models/User')
const Flight = require('./models/Flight')
const Booking = require('./models/Booking')

const body = {
    FlightNumber: "1234",
    Departure: {date: new Date(Date.now()), terminal: 'A1', Airport: 'Cairo'},
    Arrival: {date: new Date(Date.now()), terminal: 'B1', Airport: 'Berlin'},
    EconomyClass: {seats: 100, price: 20},
    BusinessClass: {seats: 100, price: 20},
    TripDuration: {hr: 4, min: 30},
    AllowedBaggage: 2,
    Seats: 200,
    NumberOfPassengers: {children: 50, adults: 78}
}

const flight = new Flight(body)
flight.save()
