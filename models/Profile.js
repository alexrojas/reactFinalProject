const mongoose = require('mongoose')
const Schema = mongoose.Schema

//Create Schema
const ProfileSchema = new Schema({
  user:          {type: Schema.Types.ObjectId, ref: 'users'},
  car:           {type: String},
  address:       {type: String, required: true},
  status:        {type: String, required: true}
  message:       {type: String}, //i have to ask about this to NIck
  bio:           {type: String},
  referralCode:  {type: String},
  social:        {
    youtube: {
      type: String
    },
    twitter: {
      type: String
    },
    facebook: {
      type: String
    },
    instagram: {
      type: String
    },
  },
  date: {type: Date, defaul: Date.now},

})

const Profile = mongoose.model("Profile", ProfileSchema);

module.exports = Profile