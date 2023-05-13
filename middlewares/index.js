import {verify} from 'jsonwebtoken'
import PostMessage from '../models/posts.js'

export const authorizeRequest = async (req, res, next) => {
  try {
    const token = req.headers?.authorization?.split(' ')[1]
    if (token) {
      const decodedToken = verify(token, 'RANDOM_TOKEN_SECRET')
      const userId = decodedToken?._id
      const result = await PostMessage.findById(userId)

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
