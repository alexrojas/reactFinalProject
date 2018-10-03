const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const passport = require('passport')

//bring post model
const Post = require('../../models/Post')
const Profile = require('../../models/Profile')
//bring Validator
const validatePostInput = require('../../validation/post')


//@route  Get api/posts/test
//@desc   TEsts the post route
//@acces  this one is public
router.get('/test', (req, res)=>{
  res.json({
    msg: "profile 2 works"
  })
})

//@route  get api/posts
//@desc   get posts
//@acces  public
router.get('/', (req, res)=>{
  Post.find()
  .sort({ date: -1})
  .then((posts)=>{
    res.json(posts)
  })
  .catch(err => res.status(404).json({nopostsfound: "no posts found "}))
})


//@route  get api/posts/:id
//@desc   get one post
//@acces  public
router.get('/:id', (req, res)=>{
  Post.findById(req.params.id)
  .then((post)=>{
    res.json(post)
  })
  .catch(err => res.status(404).json({nopostfound: "no post found with that ID"}))
})

//@route  POST api/posts
//@desc   create post
//@acces  private
router.post('/',passport.authenticate('jwt', {session: false}),
(req, res)=>{

  const { errors, isValid} = validatePostInput(req.body)

  if(!isValid){
    return res.status(400).json(errors)
  }

  const newPost = new Post({
    text: req.body.text,
    name: req.body.name,
    text: req.body.text,
    user: req.user.id
  })

  newPost.save()
  .then((post)=>{
    res.json(post)
  })
})

//@route  Delete api/posts/:id
//@desc   delete one post
//@acces  private

router.delete('/:id', passport.authenticate('jwt', {session: false}),
(req, res)=>{
  Profile.findById(req.user.id)
  .then((profile)=>{
    Post.findById(req.params.id)
    .then((post)=>{
      if(post.user.toString() !== req.user.id){
        return res.status(404).json({notAuthorize: "User not Authorized to make that action"})
      }
      post.remove()
      .then(() =>{
        res.json({success: true})
      })
      .catch(err => res.status(404).json({postnotfound: "No post found"}))
    })
  })
  // Post.findByIdAndRemove(req.params.id)
  // .then(res.json({msg: "deleted"}))
})


//@route  post api/posts/comment/;id
//@desc   add comment to a post
//@acces  private
router.post('/comment/:id', passport.authenticate('jwt', {session: false}),
(req, res)=>{

  const { errors, isValid} = validatePostInput(req.body)

  if(!isValid){
    return res.status(400).json(errors)
  }

  Post.findById(req.params.id)
    .then((post)=>{
      const newComment = {
        text: req.body.text,
        name: req.body.name,
        user: req.user.id
      }

      post.comments.unshift(newComment)
      post.save()
      .then((newpost) =>{
        res.json(newpost)
      })
    })
    .catch((post)=>{
      res.status(404).json({postnotfound: "No post was found"})
    })

})

//@route  Delete api/posts/comment/;id
//@desc   delete comment to a post
//@acces  private
router.delete('/comment/:id/:comment_id', passport.authenticate('jwt', {session: false}),
(req, res)=>{

  Post.findById(req.params.id)
    .then((post)=>{
      if(post.comments.filter(comment => comment._id.toString()=== req.params.comment_id ).length === 0){
        return res.status(404).json({commentnotexist: "Comment does not exist"})
      }
      //get remove index
      const removeIndex = post.comments
      .map(item => item._id.toString())
      .indexOf(req.params.comment_id)
      //splice comment out of array
      post.comments.splice(removeIndex, 1)

      post.save().then(post=>{res.json(post)
      })
      .catch(err => res.status(404).json({postnotfound: "No post found"}))

    })
})

module.exports =  router
