const bcrypt = require('bcrypt')
const User = require('../models/User')
const Flight = require('../models/Flight')
const createToken = require('../middleware/Token')
const jwt = require('jsonwebtoken')
const validator = require('validator')
const { sendEmail } = require('../utils/email');
require("dotenv").config()


exports.register = async (req, res) => {
    const { Username, Email } = req.body
    const user = await User.findOne({ $or: [{ Username }, { Email }]})
    if(user){
       user.Email == Email ? res.status(400).json('This email has an account. Please enter a valid email.')
                           : res.status(400).json('This username is taken. Please enter a different username.')
        return
    }
    const plainPassword = req.body.Password
    const hashedPassword = await bcrypt.hash(plainPassword, 10)
    req.body.Password = hashedPassword
    const { id, Admin } = await User.create(req.body)
    const token = createToken({id, Admin})
    return res.send({
        message: 'User registered successfully!',
        Token: token,
    })
}

exports.getFlight = async (req, res) => {
    const flightID = req.params.flightID;
    try{
      const result = await Flight.findById(flightID)
      res.send(result)
    }catch(e){
      res.send(e)
    }
  };

exports.login = async (req, res) => {
    const { Username, Password } = req.body
    let condition
    if(validator.isEmail(Username))
        condition = {Email: Username}
    else
        condition = { Username }
    const user = await User.findOne(condition)
    if(!user)
        return res.status(400).json(`The provided username or email is incorrect.`)
    const matched = await bcrypt.compare(Password, user.Password)
    if (!matched) return res.status(400).json('Wrong Username/Email or password!')
    const token = createToken(user)
    return res.send({
        message: 'User logged in successfully!',
        Token: token,
        Email: user.Email,
        FirstName: user.FirstName,
        LastName: user.LastName,
        Admin: user.Admin
    })
}


exports.resetPassword = async (req, res) => {
    const { email } = req.body
    console.log(email)
    console.log("Hi")

  const user = await User.findOne({Email: email})
  console.log(user);
    if (!user){
            return res.status(400).send('Invalid email!') 
    }
    const token = jwt.sign ({user_id: user._id, email }, process.env.Reset_Password, { expiresIn: '20m' })

  
    const url = "http://localhost:3000/reset-password/" + token
    console.log(url);
  
    const subject = "JET AWAY Reset Password"
    
    const body = `  <h3> Hello ${user.FirstName}, ${user.LastName} </h3>
                        <h4> A request has been made for you to reset your password 
                        if you didn't make this request then please ignore this email.  </h4>
  
                        <h4> Please click down below to reset your password </h4>
                        <h4> <b> The link will expire in 20 minutes </b> </h4>
                        <br>
                        <a href= ${url}> Reset Password </a>`
    console.log(token);
    sendEmail(email, subject, body);
  
    res.status(200).send({ message: 'Email sent successfully!' })
  }

  exports.getUser = async (req, res) => {
    const { id } = req
    const info = await User.findById(id);
    res.send(info);
  }

  exports.EditUser = async (req, res) => {
    const { id } = req
    try {
      const updated = await User.findByIdAndUpdate(id, req.body);
      res.send(updated)
    } catch {
      res.json({ message: 'duplicate email' });
    }
  }
  
  exports.changePassword = async (req, res) => {
    const { id } = req;
    const { OldPassword, Password } = req.body;
    const user = await User.findById(id);
    const matched = await bcrypt.compare(OldPassword, user.Password);
    if (!matched) return res.status(400).json({ message: 'Wrong password!'});
    const hashedPassword = await bcrypt.hash(Password, 10);
    req.body.Password = hashedPassword;
    const updated = await User.findByIdAndUpdate(id, req.body);
    //console.log(updated);
    res.send(updated);
  }