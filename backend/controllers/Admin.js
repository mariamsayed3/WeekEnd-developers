const Flight = require("../models/Flight");
const User = require("../models/User");
const Booking = require("../models/Booking");

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
  Flight.create(req.body, (error, result) => {
    if (error) {
      res.send(error);
    } else {
      res.json(result);
    }
  });
};

exports.EditUser = async (req, res) => {
  const UserID = req.params.UserID;
  const condition = { id: UserID };
  User.updateOne(condition, req.body, (error, result) => {
    if (error) {

      res.send(error);
    } else {

      res.json(result);
    }
  });
};

  exports.EditUser = async (req,res) => {
    const UserID = req.params.UserID
    const condition = {id:UserID}
    User.updateOne(condition, req.body,(error,result)=> {
      if (error) {
        console.log("error", error)
        res.send(error);
      } else {
        console.log("result", result)
        res.json(result);
      }
    });
}

exports.ViewCurrentFlights = async (req,res) => {
  const UserID = req.params.UserID
  const condition = {id:UserID}
  Booking.find(condition, (error,result)=> {
    if (error) {
      console.log("error:",error)
      res.send(error);
    } else {
      console.log("result:",result)
      res.json(result);
    }
  });
}

  
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
};
