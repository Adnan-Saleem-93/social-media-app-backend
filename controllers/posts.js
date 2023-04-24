import Posts from '../models/posts.js'

export const getPosts = async (req, res) => {
  try {
    const posts = await Posts.find()

    res.status(200).json(posts)
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}
export const createPost = async (req, res) => {
  const post = req.body
  let {tags} = post
  tags = tags.length ? tags.split(',') : tags
  if (Array.isArray(tags)) {
    tags = tags.map((tag) => tag.trim())
  }

  const newPost = new Posts({...post, tags})
  try {
    await newPost.save()

    res.status(200).json(newPost)
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}
export const getPostById = async (req, res) => {
  let postId = req.params.id

  try {
    const result = await Posts.findById(postId)
    if (result) {
      res.status(200).json(result)
    }
    res.status(400).json({error: 'Post not found!'})
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}
export const deletePost = async (req, res) => {
  let postId = req.params.id

  try {
    const result = await Posts.deleteOne({_id: postId})
    if (result) {
      const allPosts = await Posts.find()
      if (allPosts) {
        res.status(200).json(allPosts)
      } else {
        res.status(200).json(result)
      }
    } else {
      res.status(400).json({error: 'Post not found!'})
    }
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}
export const likePost = async (req, res) => {
  let postId = req.params.id
  let userId = req.body.likedBy

  try {
    const document = await Posts.findById(postId)
    if (document) {
      const isPostAlreadyLikedByUser = document.likedBy.includes(userId)
      let result = null
      if (!isPostAlreadyLikedByUser) {
        result = await Posts.findByIdAndUpdate(
          {_id: postId},
          {
            $push: {
              likedBy: userId,
            },
          },
          {new: true}
        )
      } else {
        result = await Posts.findByIdAndUpdate(
          {_id: postId},
          {
            $pull: {
              likedBy: userId,
            },
          },
          {new: true}
        )
      }
      if (result) {
        const allPosts = await Posts.find()
        if (allPosts) {
          res.status(200).json(allPosts)
        } else {
          res.status(200).json(result)
        }
      } else {
        res.status(400).json({error: 'Post not found!'})
      }
    }
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}
export const unlikePost = async (req, res) => {
  let postId = req.params.id

  try {
    const result = await Posts.findById(postId)
    if (result) {
      res.status(200).json(result)
    }
    res.status(400).json({error: 'Post not found!'})
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}
