import express from 'express'
import {
  getPosts,
  createPost,
  getPostById,
  deletePost,
  likePost,
  unlikePost,
} from '../controllers/posts.js'
import {authorizeRequest} from '../middlewares/index.js'
const router = express.Router()

router.get('/', authorizeRequest, getPosts)
router.post('/', authorizeRequest, createPost)
router.get('/:id', authorizeRequest, getPostById)
router.delete('/delete/:id', authorizeRequest, deletePost)
router.put('/like/:id', authorizeRequest, likePost)
router.put('/unlike/:id', authorizeRequest, unlikePost)

export default router
