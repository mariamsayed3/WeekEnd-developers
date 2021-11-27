const Flight = require("../models/Flight");
const User = require("../models/User");
const Booking = require("../models/Booking");
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
  const UserID = req.params.UserID
  const condition = { id: UserID }
  User.updateOne(condition, req.body, (error, result) => {
    if (error) {
      console.log("error", error)
      res.send(error);
    } else {
      console.log("result", result)
      res.json(result);
    }
  });
}

exports.ViewCurrentFlights = async (req, res) => {
  const {id, Admin} = req
  const condition = { User: id }
  const output = []; //create an empty array
  const bookings = await Booking.find(condition);
  const user = await User.findById(id);
  for(let i=0;i<bookings.length;i++){
    const flight = await Flight.findById(bookings[i].Flight);
    output.push({Booking: bookings[i],Flight: flight,User: user});
  }
  res.send(output)
}

exports.getUser = async (req, res) => {
  const UserID = req.params.UserID
  const condition = { id: UserID }
  User.findOne(condition, (error, result) => {
    if (error) {
      console.log("error:", error)
      res.send(error);
    }
    else {
      console.log("entered success")
      console.log("result:", result)
      res.json(result);
    }
  });
}
exports.reserveFlight = async(req, res) => {
  const flightID = req.params.flightID
  const {id, Admin} = req
  const{FlightNumber, TotalPrice, Seats} = req.body
  if(Admin) return res.status(403).json('Unauthorized')

  let ReservationNumber
  while(true){
    ReservationNumber = Math.floor(10000000 + Math.random() * 90000000) + '' // Random number of length 8
    const found = await Booking.findOne({ReservationNumber})
    if(!found) 
      break
  }
  await Booking.create({User: id, Flight: flightID, ReservationNumber, FlightNumber, TotalPrice, Seats})
  
  let EconomyReservedSeats = 0, FirstReservedSeats = 0, BusinessReservedSeats = 0

  const {FirstClassSeats, BusinessSeats, EconomySeats} = await Flight.findById(flightID)

  for(let seat of Seats){
    if(seat.charAt(0) === 'A'){
      FirstReservedSeats++
      FirstClassSeats[parseInt(seat.slice(1)) -1].reserved = true
    } 
    else if(seat.charAt(0) == 'B'){
      BusinessReservedSeats++
      BusinessSeats[parseInt(seat.slice(1)) -1].reserved = true
    } 
    else {
      EconomyReservedSeats++
      EconomySeats[parseInt(seat.slice(1)) -1].reserved = true
    }
  }
  const update = {
    $inc: {
      EconomyAvailableSeats: -EconomyReservedSeats,
      FirstClassAvailableSeats: -FirstReservedSeats,
      BusinessAvailableSeats: -BusinessReservedSeats,
    },
    FirstClassSeats,
    BusinessSeats,
    EconomySeats
  }
  try{
    await Flight.findByIdAndUpdate(flightID, update)
    res.status(200).json({message: "Reservation done successfully"})
  }catch(err){
    res.status(200).json({message: "Error"})
  }
  
}

