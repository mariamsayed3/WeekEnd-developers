const bcrypt = require('bcrypt')
const User = require('../models/User')
const createToken = require('../middleware/Token')
const jwt = require('jsonwebtoken')
const validator = require('validator')

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
