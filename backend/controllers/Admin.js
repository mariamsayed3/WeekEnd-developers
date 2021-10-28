
const Flight = require('../models/Flight')

exports.updateFlight = async (req, res) => {
    const flightID = req.params.flightID
    const condition = { id: flightID };
    Flight.updateOne(condition, req.body , (error,result)=> {
        if (error) {
          res.send(error);
        } else {
          res.json(result);
        }
      });

   
  
  }

  