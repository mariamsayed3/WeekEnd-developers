const Flight = require('../models/Flight')

exports.getSeats = async (req, res) => {
    const flightID = req.params.flightID
    const flight = await Flight.findById(flightID)
    res.send(flight)
    console.log(flight)
} 