const mongoose = require('mongoose')
const Schema = mongoose.Schema

//Create Schema

const UserSchema = new Schema({
  name: {type: String, required: true},
  email: {type: String, required: true},
  password: {type: String, required: true},
  car: {type: String},
  address: {type: String},
  message: {type: String},
  image: {type: String},
  date: {type: Date, defaul: Date.now},
})

const User = mongoose.model("User", UserSchema);

module.exports = User
