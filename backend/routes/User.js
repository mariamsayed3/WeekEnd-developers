const express = require("express");
const controllers = require("../controllers/User");
const router = new express.Router();

router.get('/seats/:flightID', controllers.getSeats)

module.exports = router