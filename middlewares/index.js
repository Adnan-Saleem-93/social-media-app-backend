import {verify} from 'jsonwebtoken'
import User from '../models/auth.js'

export const authorizeRequest = async (req, res, next) => {
  try {
    const token = req.headers?.authorization?.split(' ')[1]
    if (token) {
      const decodedToken = verify(token, 'new_user_private_key')

      const userId = decodedToken?.id
      const result = await User.findById(userId)

      if (!result) {
        res.status(401).json({
          error: 'Invalid User ID!',
        })
      } else {
        next()
      }
    } else {
      res.status(401).json({
        error: 'Token not found!',
      })
    }
  } catch (error) {
    res.status(401).json({
      error,
    })
  }
}
