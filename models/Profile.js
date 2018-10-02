const mongoose = require('mongoose')
const Schema = mongoose.Schema

//Validation of the State on the schemma for address (maybe not)
const statesArray = ["AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DC", "DE", "FL", "GA", "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD", "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ", "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC", "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY"];
//Create Schema
const ProfileSchema = new Schema({
  user:          {type: Schema.Types.ObjectId, ref: 'users'},
  // handle:        {type: String, required: true, max: 40},
  car:           {type: String},
  status:        {type: String, required: true},
  message:       {type: String}, //i have to ask about this to NIck
  bio:           {type: String},
  referralCode:  {type: String},

  address:       {
        street: {
          type: String, required: true
        },
        city: {
          type: String, required: true
        },
        state: {
            type: String, uppercase: true, required: true, enum: statesArray
        },
        zip: {
          type: Number, required: true
        }
  },

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
