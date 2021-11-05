const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const validator = require('validator')

const userSchema = new Schema({
  FirstName: {
    type: String,
    required: true,
    minLength: [2, 'Fisrt name is too short'],
  },
  LastName: {
    type: String,
    required: true,
    minLength: [2, 'Last name is too short'],
  },
  Admin: {
    type: Boolean,
    required: true,
    
  },
  Email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    validate: {
        validator: (value) => validator.isEmail(value)
    }
  },
  HomeAddress: {
    type: String,
    required: true
  },
  CountryCode: {
    type: String,
    required: true,
    validate: {
       validator: (code) => validator.isNumeric(code)
    }
  },
  TelephoneNumbers: {
    type: Array,
    required: true,
  },
  PassportNumber: {
    type: String,
    required: true
  },
  Username: {
    type: String,
    required: true,
    minlength: [4, 'Username must be at least 4 characters'],
    unique: true,
  },
  Password: {
    type: String,
    required: true,
  }
});

const User = mongoose.model('User', userSchema);
module.exports = User;