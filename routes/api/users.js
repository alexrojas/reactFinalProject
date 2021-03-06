const express = require('express')
const router = express.Router()
const mongoose = require("mongoose");
const bcrypt = require('bcryptjs')
const passport = require('passport')

const User = require('../../models/User')
const jwt = require('jsonwebtoken')
const keys = require('../../config/keys')

// load input validation
const validateRegisterInput = require('../../validation/register')
const validateLoginInput = require('../../validation/login')
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
  const { errors, isValid} = validateRegisterInput(req.body)

  if(!isValid){
    return res.status(400).json(errors)
  }

  User.findOne({email: req.body.email })
  .then((user)=>{
    errors.email = "Email already exists"
    if(user){
      console.log("This user already exist", user);
      return res.json(errors)
    }else{
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        // address: req.body.address
      })

      bcrypt.genSalt(10, (err, salt)=>{
        bcrypt.hash(newUser.password, salt, (err, hash) =>{
          if(err){
            console.log(err);};
          // console.log("carahi")
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
  const { errors, isValid} = validateLoginInput(req.body)

  if(!isValid){
    return res.status(400).json(errors)
  }

  const email = req.body.email
  const password = req.body.password
  //find user by email
  User.findOne({email})
  .then((user)=>{
    if(!user){
      console.log("user not found ");
      errors.email = "User not found"
      return res.status(400).json(errors)
    }

    //check password
    bcrypt.compare(password, user.password)
    .then((isMatch) => {
      if(isMatch){
        //User matched
        console.log("password compare with bcrypt is correct", isMatch);
        // req.session.currentUser = user;
        const payload = { id: user.id, name: user.name } //create JWT payload
        // res.json({msg: "success"})
        //sign token
        jwt.sign(
          payload,
          keys.secretOrKey,
          {expiresIn: 3600},
          (err, token) =>{
            res.json({
              sucess: true,
              token: 'Bearer ' + token
            })
        })

      }else{
        console.log("password doesnt match with our records");
        errors.password = "Password Incorrect"
          return res.status(400).json(errors)
      }
    })
  })
})

//@route  Get api/users/current
//@desc   return current user
//@acces private
router.get('/current', passport.authenticate('jwt', {session: false}),
 (req, res)=>{
  // console.log('carajo',req.user)

  res.json({
    id: req.user.id,
    name: req.user.name,
    email: req.user.email
  })
})

module.exports =  router
