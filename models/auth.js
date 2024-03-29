import mongoose from 'mongoose'

const authSchema = mongoose.Schema({
  email: {type: String, required: true},
  password: {type: String, required: true},
  name: String,
  create_on: {
    type: Date,
    default: new Date(),
  },
  isGoogleSignUp: {
    type: Boolean,
    default: false,
  },
})

const User = mongoose.model('User', authSchema)

export default User
