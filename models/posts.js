import mongoose from 'mongoose'

const postsSchema = mongoose.Schema({
  message: String,
  likes: {
    type: Number,
    default: 0,
  },
  likedBy: {
    type: [String],
  },
  author: String,
  createdAt: {
    type: Date,
    default: new Date(),
  },
  tags: [String],
  selectedFile: String,
})

const PostMessage = mongoose.model('PostMessage', postsSchema)

export default PostMessage
