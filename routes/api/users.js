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

//@route  POST api/users/registration
//@desc   users can register
//@acces public
router.post('/register', (req, res)=>{
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

//@route  Get api/users/login
//@desc   Login user /  returning  a JWT token
//@acces public

router.post('/login', (req, res)=>{
  const email = req.body.email
  const password = req.body.password
  //find user by email

  User.findOne({email})
  .then((user)=>{
    if(!user){
      console.log("user not found ");
      return res.status(400).json({email: "User not found"})
    }

    //check password
    bcrypt.compare(password, user.password)
    .then((data) => {
      if(data){
        console.log("password compare with bcrypt is correct", data);
        res.json({msg: "success"})
      }else{
        console.log("password doesnt match with our records");
          return res.status(400).json({password: "password incorrect"})
      }
    })
  })
})


module.exports =  router
