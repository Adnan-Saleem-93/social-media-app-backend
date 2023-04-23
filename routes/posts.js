import express from 'express'
import {
  getPosts,
  createPost,
  getPostById,
  deletePost,
  likePost,
  unlikePost,
} from '../controllers/posts.js'
const router = express.Router()

router.get('/', getPosts)
router.post('/', createPost)
router.get('/:id', getPostById)
router.delete('/delete/:id', deletePost)
router.put('/like/:id', likePost)
router.put('/unlike/:id', unlikePost)

export default router
