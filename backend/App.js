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

const body1 = {
    FirstName: "Mohamed",
    LastName: 'Abdelhamid',
    Admin: false,
    Email: 'mo@gmail.com',
    HomeAddress: 'Cairo',
    TelephoneNumbers: ['01003202027'],
    Username: 'moAhmed',
    Password: 'mohamedahmed',
    CountryCode: '12321',
    PassportNumber: '2344532'
}

const id = async () => {
    const userId = (await User.find({_id: "617ae39d75f5e23f35fe57c6"}))[0]._id
    const flightId = (await Flight.find({}))[0]._id
    console.log(userId, flightId)
    const body = {
        User: userId,
        Flight: flightId,
        ReservationNumber: '12321',
        TotalPrice: 100,
        NumberOfSeats: {children: 3, adults: 6},
        FlightNumber: 21,
        Seats: ['A1', 'C3']
    }
    const booking = new Booking(body)
    booking.save()
}
// const user = new User(body1)
// user.save()
