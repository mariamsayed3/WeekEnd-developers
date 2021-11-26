const express = require("express");
const controllers = require("../controllers/User");
const router = new express.Router();
const verifyToken = require('../middleware/verifyToken')

router.use(express.json());

router.patch("/cancel_reservation/:reservation_number", controllers.cancelReservation);

router.post("/email_cancellation", controllers.notifyCancellation);

router.patch('/edit_user/:UserID',controllers.EditUser);

router.get('/get_current_flights/:UserID',controllers.ViewCurrentFlights);

router.get('/get_user/:UserID',controllers.getUser);
router.post('/reserve/:flightID',verifyToken, controllers.reserveFlight)


module.exports = router;
