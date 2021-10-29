
const Flight = require('../models/Flight')

exports.getFlight = async (req, res) => {
  const flightID = req.params.flightID
  Flight.findById(flightID,  (error,result)=> {
      if (error) {
        res.send(error);
      } else {
        res.json(result);
      }
    });
}

exports.updateFlight = async (req, res) => {
    const flightID = req.params.flightID
    const condition = { id: flightID };
    console.log(req.body)
    Flight.updateOne(condition, req.body , (error,result) => {
        if (error) {
          res.send(error);
        } else {
          res.json(result);
        }
      });
  }

  