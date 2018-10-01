const express = require('express')
const router = express.Router()

//@route  Get api/users/test
//@desc   TEsts the users route
//@acces  this one is public

router.get('/test', (req, res)=> res.json({
  msg: "users works"
}))


module.exports =  router
