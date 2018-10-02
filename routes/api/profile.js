const express = require('express')
const router = express.Router()
const mongoose = require("mongoose");
const passport = require('passport')
// const keys = require('../../config/keys')

//bring the Models from user and profile
const User = require('../../models/User')
const Profile = require('../../models/Profile')

//@route  Get api/profile/test
//@desc   TEsts the profile route
//@acces  this one is public
router.get('/test', (req, res)=> res.json({
  msg: "profile works"
}))

//@route  Get api/profile
//@desc   get current user profile
//@acces  private (only signed in users, based on the payload)
router.get('/', passport.authenticate('jwt', {session: false}),
(req, res)=> {
  const errors = {}
  Profile.findOne({user: req.user.id})
  .then((profile)=>{
    if(!profile){
      errors.noprofile = "There is no profile for this User"
      return res.status(404).json(errors)
    }
    res.json(profile)
  })
  .catch(err => res.status(404).json(err))
})


//@route  POST api/profile
//@desc   create or edit user profile
//@acces  private (only signed in users, based on the payload)
router.post('/', passport.authenticate('jwt', {session: false}),
(req, res)=> {
  //get Fields from req.body
  const profileFields = {}
  profileFields.user = req.user.id
  if(req.body.handle)       profileFields.handle = req.body.handle // i might not use this one
  if(req.body.car)          profileFields.car = req.body.car
  if(req.body.status)       profileFields.status = req.body.status
  if(req.body.message)      profileFields.message = req.body.message
  if(req.body.bio)          profileFields.bio = req.body.bio
  if(req.body.referralCode) profileFields.referralCode = req.body.referralCode
  //messages i might change to array.
  if(req.body.message)      profileFields.message = req.body.message
  //Addres is an object so i need to split
  profileFields.address = {}
  if(req.body.street) profileFields.address.street = req.body.address
  if(req.body.city)   profileFields.address.city = req.body.city
  if(req.body.state)  profileFields.address.state = req.body.state
  if(req.body.zip)    profileFields.address.zip = req.body.zip
  //social
  profileFields.social = {}
  if(req.body.youtube)    profileFields.social.youtube = req.body.youtube
  if(req.body.twitter)    profileFields.social.twitter = req.body.twitter
  if(req.body.facebook)   profileFields.social.facebook = req.body.facebook
  if(req.body.instagram)  profileFields.social.instagram = req.body.instagram

  Profile.findOne({ user: profileFields.user})
  then((profile)=>{
    if(profile){
      //this means this will be an update, because it exist this profile
      Profile.findOneAndUpdate(
        {user: req.user.id},
        {$set: profileFields},
        {new: true})
        .then((profile)=>{
          res.json(profile)
        })
    } else{

      //not sure if handle will be needed
      // Profile.findOne({ handle: profileFields.handle}).then(profile =>{
      //   if(profile){
      //     errors.handle = 'That handle already exists'
      //     res.status(400).json(errors)
      //   }
      // })

      new Profile(profileFields).save()
      .then((profile)=>{
        res.json(profile)
      })
      //create
    }
  })
})




module.exports =  router
