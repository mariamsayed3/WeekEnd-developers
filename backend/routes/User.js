const express = require("express");
const controllers = require("../controllers/User");
const router = new express.Router();

router.use(express.json());

router.patch("/cancel_reservation/:reservation_number", controllers.cancelReservation);

router.post("/email_cancellation", controllers.cancelReservation);


module.exports = router;