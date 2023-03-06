import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import User from '../models/auth.js'

export const loginUser = async (req, res) => {
  const {email, password} = req.body
  try {
    const existingUser = await User.findOne({email})

    if (!existingUser) {
      res.status(400).json({error: 'User does not exist.!'})
    } else {
      const passwordMatched = await bcrypt.compare(password, existingUser.password)
      if (!passwordMatched) {
        res.status(400).json({error: 'Incorrect Password.!'})
      } else {
        const token = jwt.sign(
          {email: existingUser.email, name: existingUser.name},
          'new_user_private_key',
          {
            expiresIn: '1h',
          }
        )

        res.status(200).json({result: existingUser, token})
      }
    }
  } catch (err) {
    res.status(400).json({error: err.message})
  }
}
export const signupUser = async (req, res) => {
  const {email, password, first_name, last_name} = req.body
  try {
    const existingUser = await User.findOne({email})

    if (existingUser) {
      res.status(400).json({error: 'User Already Exists.!'})
    } else {
      const hashedPassword = await bcrypt.hash(password, 12)
      const newUser = await User.create({
        email,
        password: hashedPassword,
        name: `${first_name}, ${last_name}`,
      })
      const token = jwt.sign({email: newUser.email, name: newUser.name}, 'new_user_private_key', {
        expiresIn: '1h',
      })

      res.status(200).json({result: newUser, token})
    }
  } catch (err) {
    res.status(400).json({error: err.message})
  }
}
