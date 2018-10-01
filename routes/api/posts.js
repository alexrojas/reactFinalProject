const express = require('express')
const router = express.Router()

//@route  Get api/posts/test
//@desc   TEsts the post route
//@acces  this one is public
router.get('/test', (req, res)=>{
  res.json({
    msg: "profile 2 works"
  })
})


module.exports =  router
