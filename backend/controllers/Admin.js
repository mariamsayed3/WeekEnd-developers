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
    Flight.updateOne(condition, req.body , (error,result)=> {
        if (error) {
          console.log("error", error)
          res.send(error);
        } else {
          console.log("result", result)
          res.json(result);
        }
      });
  }

  exports.createFlight = async (req,res) => {
    Flight.create(req.body,(error,result)=>{
      if(error){
        console.log("error: ",error)
        res.send(error);
      } else{
        console.log("result: ",result)
        res.json(result);
      }
    });
  }

  