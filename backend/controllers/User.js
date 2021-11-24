const Flight = require("../models/Flight");
const User = require("../models/User");
const Booking = require("../models/Booking");
 const { sendEmail } = require('../utils/email');

exports.cancelReservation = async (req, res) => {
  const reservation_number =  req.params.reservation_number;

  //Find Booking
  const booking = await Booking.find({ReservationNumber:reservation_number});

  //Delete Booking
  Booking.deleteOne({ReservationNumber:reservation_number}, function (error, result) {
    if (error) {
        res.send(error);
      } else {
        console.log(booking)
        res.send(booking);
      }
  });
//   //Find flight & Update Seats
const flight = await Flight.findById(booking[0].Flight);

const business_seats = flight.BusinessSeats 
const business_children_booking = booking[0].Seats.Business.Children;
if(business_children_booking.length >0){
    for (let i=0; i<business_children_booking.length; i++){
        business_seats[business_children_booking[i]] = false;
    }
}
const business_adults_booking = booking[0].Seats.Business.Adults;
if(business_adults_booking.length >0){
    for (let i=0; i<business_adults_booking.length; i++){
        business_seats[business_adults_booking[i]] = false;
    }
}

const economy_seats = flight.EconomySeats 
const economy_children_booking = booking[0].Seats.Economy.Children;
if(economy_children_booking.length >0){
    for (let i=0; i<economy_children_booking.length; i++){
        economy_seats[economy_children_booking[i]] = false;
    }
}
const economy_adults_booking = booking[0].Seats.Economy.Adults;
if(economy_adults_booking.length >0){
    for (let i=0; i<economy_adults_booking.length; i++){
        economy_seats[economy_adults_booking[i]] = false;
    }
}

  const available_business_seats = booking[0].Seats.Business.Children.length + booking[0].Seats.Business.Adults.length;
  const available_economy_seats = booking[0].Seats.Economy.Adults.length +  booking[0].Seats.Economy.Children.length;
  
  const filter = { _id: booking[0].Flight };
  const update = {$inc : {'EconomyAvailableSeats' : available_economy_seats, 'BusinessAvailableSeats' : available_business_seats}, EconomySeats :economy_seats, BusinessSeats:business_seats };
  let updated_flight = await Flight.findOneAndUpdate(filter, update);
}

exports.notifyCancellation = async (req, res) => {
  const {ReservationNumber, email, TotalPrice, FlightNumber, Seats} = req.body
    const subject = "United Airlines"
    const body = `  <h3> Hello </h3>
                        <h4> Please note that your reservation on flight number ${FlightNumber} has been succesfully cancelled. </h4>
                        <h4> A totall of ${TotalPrice}L.E will be refunded to your account.</h4>
                      `
    console.log(body) 
    sendEmail(email, subject, body);

    res.status(200).send({ message: 'Email sent successfully!' })
}
