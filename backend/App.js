require('./db/db')
require('dotenv').config();
const mongoose = require('mongoose')
const AdminRouter = require ('./routes/Admin')
const cors = require('cors')
const User = require('./models/User')
const Flight = require('./models/Flight')
const Booking = require('./models/Booking')
const express = require("express")
const app = express();
app.use(cors({origin: ['http://localhost:3000']}));
app.use(cors());
app.use('/admin',AdminRouter)
app.use(express.json())
const port = process.env.PORT || "8000";
app.get("/Home", (req, res) => {
    res.status(200).send("You have everything installed !");
  });

app.listen(port, () => console.log(`Listening to requests on http://localhost:${port}`));
const body = {
    FlightNumber: "1234",
    DepartureTime: new Date(Date.now()),
    DepartureTerminal: 'A1',
    DepartureAirport: 'Cairo',
    ArrivalTime: new Date(Date.now()),
    ArrivalTerminal: 'C3',
    ArrivalAirport: 'Berkin',
    EconomyAvailableSeats: 100,
    EconomyTotalSeats: 200,
    EconomyPrice: 50,
    BusinessAvailableSeats: 100,
    BusinessTotalSeats: 200,
    BusinessPrice: 50,
    TripDuration: {hours: 4, min: 30},
    AllowedBaggage: 2,
    Seats: [],
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

// const flight = new Flight(body)
// flight.save()

