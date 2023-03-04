import mongoose from 'mongoose'

const authSchema = mongoose.Schema({
  email: {type: String, required: true},
  password: {type: String, required: true},
  firstName: String,
  lastName: String,
})

const Users = mongoose.model('Users', authSchema)

export default Users
