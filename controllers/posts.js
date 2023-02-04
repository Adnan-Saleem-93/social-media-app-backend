import PostMessage from '../models/posts.js'

export const getPosts = async (req, res) => {
  try {
    const postMessages = await PostMessage.find()

    res.status(200).json(postMessages)
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

  const newPost = new PostMessage({...post, tags})
  try {
    await newPost.save()

    res.status(200).json(newPost)
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}
