const express = require("express");
const controllers = require("../controllers/General");
const router = new express.Router();
const verifyToken = require("../middleware/verifyToken");
router.use(express.json());

router.post('/login', controllers.login)
router.post('/register', controllers.register)
router.get("/get_flight/:flightID", controllers.getFlight)
router.patch('/edit_user/:Token',verifyToken,controllers.EditUser);
router.get('/get_user/:Token',verifyToken,controllers.getUser);
router.patch('/change_password/:Token',verifyToken,controllers.changePassword);
router.post('/requestResetPassword', controllers.resetPassword);
router.post('/resetPassword', controllers.changingForgottenPassword);


module.exports = router