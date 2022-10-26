import mongoose from 'mongoose'

const postsSchema = mongoose.Schema({
  title: String,
  message: String,
  likes: {
    type: Number,
    default: 0
  },
  author: String,
  createdAt: {
    type: Date,
    default: new Date()
  }
})

const PostMessage = mongoose.model('PostMessage', postsSchema)

export default PostMessage
