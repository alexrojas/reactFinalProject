const express = require('express')
const router = express.Router()
const mongoose = require("mongoose");
const bcrypt = require('bcryptjs')

const User = require('../../models/User')


//@route  Get api/users/test
//@desc   TEsts the users route
//@acces  this one is public

router.get('/test', (req, res)=> res.json({
  msg: "users works"
}))

//@route  Get api/users/registration
//@desc   users can register
//@acces public

router.post('/register', (req, res)=>{
// })
  User.findOne({email: req.body.email })
  .then((user)=>{
    if(user){
      console.log("This user already exist", user);
      return res.json({email: 'Email already exist'})
    }else{
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
      })

      bcrypt.genSalt(10, (err, salt)=>{
        bcrypt.hash(newUser.password, salt, (err, hash) =>{
          if(err){throw err};
          console.log("carahi")
          newUser.password = hash
          newUser.save()
          .then(response => {
            console.log("user was created", newUser);
            res.json(response);
          })
          .catch(err => {
            console.log("error creating user", err);
            res.json(err);
          })
        })
      })
    }
  })
})

// .then(data=> res.json(`user was created`, data))
// .catch(err => console.log(err))

module.exports =  router
