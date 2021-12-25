const Flight = require("../models/Flight");
const User = require("../models/User");
const Booking = require("../models/Booking");
const jwt = require("jsonwebtoken");

exports.getAllFlights = async (req, res) => {
  const allFlights = await Flight.find({});
  try {
    res.send(allFlights);
  } catch (err) {
    res.send(err);
  }
};

exports.getFlight = async (req, res) => {
  const flightID = req.params.flightID;
  Flight.findById(flightID, (error, result) => {
    if (error) {
      res.send(error);
    } else {
      res.json(result);
    }
  });
};

exports.updateFlight = async (req, res) => {
  const flightID = req.params.flightID;
  Flight.findByIdAndUpdate(flightID, req.body, (error, result) => {
    if (error) {
      res.send(error);
    } else {
      res.json(result);
    }
  });
};

exports.createFlight = async (req, res) => {
  let FlightNumber
  while (true) {
    FlightNumber = Math.floor(100000 + Math.random() * 900000) + '' // Random number of length 6
    const found = await Flight.findOne({ FlightNumber })
    if (!found)
      break
  }
  req.body.FlightNumber = FlightNumber
  Flight.create(req.body, (error, result) => {
    if (error) {
      res.send(error);
    } else {
      res.json(result);
    }
  });
};

exports.deleteFlight = async (req, res) => {
  const flight_ID = req.params.flightID;
  const deletedCondition = { _id: flight_ID };
  const deletedBookingCondition = { Flight: flight_ID };
  Flight.deleteOne(deletedCondition, function (err) {
    if (err) {
      console.log(err);
    }
  });
  Booking.deleteMany(deletedBookingCondition, function (err) {
    if (err) {
      console.log(err);
    }
  });
  res.send({})
};
