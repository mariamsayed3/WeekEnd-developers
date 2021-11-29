const Flight = require("../models/Flight");
const User = require("../models/User");
const Booking = require("../models/Booking");
const Summary = require("../models/Summary");
const { sendEmail } = require('../utils/email');
const jwt = require('jsonwebtoken')

exports.cancelReservation = async (req, res) => {
  const reservation_number =  req.params.reservation_number;
  
  //Find Booking
  const booking = await Booking.find({ReservationNumber:reservation_number});

  //Find flight & Update Seats

  const flight = await Flight.findById(booking[0].Flight);

const seats = booking[0].Seats
let first_seats=0;
let economy_seats=0;
let business_seats=0;
for (let seat of seats)
  if (seat.charAt(0)==='A'){
      const index = parseInt(seat.slice(1)) -1;
      flight.FirstClassSeats[index].reserved = false;
      first_seats++;
  }
  else if (seat.charAt(0)==='B'){
      const index = parseInt(seat.slice(1)) -1;
      flight.BusinessSeats[index].reserved = false;
      business_seats++;
  }
  else{
    const index = parseInt(seat.slice(1)) -1;
    flight.EconomySeats[index].reserved = false;
    economy_seats++;
  }


  let update = {$inc : {'EconomyAvailableSeats' : economy_seats, 'BusinessAvailableSeats': business_seats , 'FirstClassAvailableSeats': first_seats}, FirstClassSeats: flight.FirstClassSeats, EconomySeats :flight.EconomySeats, BusinessSeats:flight.BusinessSeats };
  await Flight.findByIdAndUpdate( flight.id, update);

    // Delete Booking
    Booking.deleteOne({ReservationNumber:reservation_number}, function (error, result) {
      if (error) {
          res.send(error);
        } else {
          res.send(booking);
        }
    });
}

exports.notifyCancellation = async (req, res) => {
  const {ReservationNumber, email, TotalPrice, FlightNumber, Seats} = req.body
    const subject = "United Airlines"
    const body = `  <h3> Hello </h3>
                        <h4> Please note that your reservation on flight number ${FlightNumber} has been succesfully cancelled. </h4>
                        <h4> A totall of ${TotalPrice}L.E will be refunded to your account.</h4>
                      ` 
    sendEmail(email, subject, body);

    res.status(200).send({ message: 'Email sent successfully!' })
}

exports.EditUser = async (req, res) => {
  const {id} = req
  try{
    const updated = await User.findByIdAndUpdate(id,req.body);
    res.send(updated)
  }catch{
    res.json({message: 'duplicate email'});
  }
}

exports.ViewCurrentFlights = async (req, res) => {
  const {id, Admin} = req
  const condition = { User: id }
  const output = [];
  const bookings = await Booking.find(condition);
  const user = await User.findById(id);
  for(let i=0;i<bookings.length;i++){
    const flight = await Flight.findById(bookings[i].Flight);
    output.push({Booking: bookings[i],Flight: flight,User: user});
  }
  res.send(output)
}

exports.getUser = async (req, res) => {
  const {id} = req
  console.log("id=",id)
  const info = await User.findById(id);
  res.send(info);
  console.log(info);
}

exports.reserveFlight = async(req, res) => {
  const flightID = req.params.flightID
  const {id, Admin} = req
  const{FlightNumber, TotalPrice, Seats, Children} = req.body
  if(Admin) return res.status(403).json('Unauthorized')
  console.log(flightID, TotalPrice, Seats, Children)
  let ReservationNumber
  while(true){
    ReservationNumber = Math.floor(10000000 + Math.random() * 90000000) + '' // Random number of length 8
    const found = await Booking.findOne({ReservationNumber})
    if(!found) 
      break
  }
  let SeatsNames = []
  for(let seat of Seats)
    SeatsNames.push(seat.number)
  await Booking.create({User: id, Flight: flightID, ReservationNumber, FlightNumber, TotalPrice, Seats: SeatsNames, Children})
  
  let EconomyReservedSeats = 0, FirstReservedSeats = 0, BusinessReservedSeats = 0

  const {FirstClassSeats, BusinessSeats, EconomySeats} = await Flight.findById(flightID)

  for(let seat of Seats){
    if(seat.number.charAt(0) === 'A'){
      FirstReservedSeats++
      FirstClassSeats[parseInt(seat.number.slice(1)) -1].reserved = true
    } 
    else if(seat.number.charAt(0) == 'B'){
      BusinessReservedSeats++
      BusinessSeats[parseInt(seat.number.slice(1)) -1].reserved = true
    } 
    else {
      EconomyReservedSeats++
      EconomySeats[parseInt(seat.number.slice(1)) -1].reserved = true
    }
  }
  
  const update = {
    $inc: {
      EconomyAvailableSeats: -EconomyReservedSeats,
      FirstClassAvailableSeats: -FirstReservedSeats,
      BusinessAvailableSeats: -BusinessReservedSeats,
      'NumberOfPassengers.Adults': Seats.length - Children,
      'NumberOfPassengers.Children': Children
    },
    FirstClassSeats,
    BusinessSeats,
    EconomySeats,
  }
  try{
    await Flight.findByIdAndUpdate(flightID, update)
    res.status(200).json({message: "Reservation done successfully"})
  }catch(err){
    res.status(400).json({message: "Error"})
  }
}


exports.AvailableFlights = async(req, res) => {
  const id = req.id
  const userBookings = await Booking.find({User: id})
  const userFlights = []
  for(let booking of userBookings){
    userFlights.push(booking.Flight)
  }
  const flights = await Flight.find({_id: {$nin: userFlights}})
  res.send(flights)
}

exports.ReturnFlights = async(req, res) => {
  const id = req.id
  const {Departure, Arrival, DepartureDate} = req.body
  const userBookings = await Booking.find({User: id})
  const userFlights = []
  for(let booking of userBookings){
    userFlights.push(booking.Flight)
  }
  const flights = await Flight.find({_id: {$nin: userFlights}, DepartureAirport: Departure, ArrivalAirport: Arrival, DepartureDate: {$gt: DepartureDate}})
  res.send(flights)
}

exports.getAllFlights = async (req, res) => {
  const Date = new Date(Date.now())
  const allFlights = await Flight.find({DepartureDate: {$gt: Date}});
  res.send(allFlights);
};
exports.getSummaries = async (req, res) => {
  const id = req.id
  const summaries = await Summary.find({User: id})
  res.send(summaries)
}

exports.createSummaries = async (req, res) => {
  const id = req.id
  const {DepartureFlight, ReturnFlight, DepartureBooking, ReturnBooking} = req.body
  ReturnBooking.Token = undefined
  DepartureBooking.Token = undefined
  try{
    await Summary.create({User: id, DepartureFlight, ReturnFlight, DepartureBooking, ReturnBooking})
    res.send({message: 'Summary added successfully!'})
  }catch(e){
    console.log(e)
    res.status(400).send('error')
  }
}
