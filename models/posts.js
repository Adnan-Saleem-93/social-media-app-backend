import mongoose from 'mongoose'

const postsSchema = mongoose.Schema({
  message: String,
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
