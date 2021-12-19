const express = require("express");
const controllers = require("../controllers/User");
const router = new express.Router();
const verifyToken = require("../middleware/verifyToken");

router.use(express.json());

router.patch(
  "/cancel_reservation/:reservation_number",
  controllers.cancelReservation
);

router.post("/email_cancellation", controllers.notifyCancellation);

router.patch('/edit_user/:Token',verifyToken,controllers.EditUser);

router.get(
  "/get_current_flights/:Token",
  verifyToken,
  controllers.ViewCurrentFlights
);

router.get('/get_user/:Token',verifyToken,controllers.getUser);

router.post("/reserve/:flightID", verifyToken, controllers.reserveFlight);

router.get(
  "/available_flights/:Token",
  verifyToken,
  controllers.AvailableFlights
);

router.post("/return_flights", verifyToken, controllers.ReturnFlights);

router.get("/all_flights/", controllers.getFlights);

router.get('/summaries/:Token',verifyToken, controllers.getSummaries)

router.post('/summaries',verifyToken, controllers.createSummaries)

router.post('/resetPassword', controllers.resetPassword);

module.exports = router;
