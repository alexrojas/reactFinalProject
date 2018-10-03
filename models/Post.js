const mongoose = require('mongoose')
const Schema = mongoose.Schema

//Create Schema
const PostSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  text: {
    type: String,
    required: true
  },
  name: {
    type: String
  },
  comments: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
      },
      text: {
        type: String,
        required: true
      },
      name: {
        type: String
      },
      date: {
        type: Date,
        default:  Date.now
      }

    }
  ],
  date: {
    type: Date,
    default:  Date.now
  }
})

const Post = mongoose.model("Post", PostSchema);

module.exports = Post
