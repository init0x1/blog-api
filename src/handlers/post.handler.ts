import { Request, Response } from 'express'
import { PostModel } from '../models/post.model'
import { Post } from '../types/PostTypes'
import { UserModel } from '../models/user.model'

const postModel: PostModel = new PostModel()
const usermodel: UserModel = new UserModel()
//get all posts
export const getAllPosts = async (req: Request, res: Response): Promise<void> => {
  try {
    const posts: Post[] = await postModel.getAllPosts()
    if (!posts.length) {
      res.status(400).json({ error: `there is no posts to retrive!` })
      return
    }
    res.status(200).json({ posts })
  } catch (error) {
    res.status(400).json({ error: 'error while getting Posts ' })
  }
}

//get post by post and user id
export const getPostById = async (req: Request, res: Response): Promise<void> => {
  try {
    const postId = req.params.post_id as string
    // const userId = req.params.user_id as string
    if (!postId) {
      res.status(400).json({
        error: 'Missing/Invalid parameters, the following parameters are required:post_id '
      })
      return
    }
    const post: Post = await postModel.getPostByPostId(postId)
    if (post) {
      res.status(200).json({ post })
    } else {
      res.status(404).json({ error: 'Post not found' })
    }
  } catch (error) {
    res.status(400).json({ error: 'Error While Getting Post' })
  }
}

//get the user posts
export const getUserPostes = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.params.user_id as string
    if (!userId) {
      res.status(400).json({
        error: 'Missing/Invalid parameters, the following parameters are required: user_id'
      })
      return
    }
    if (!(await usermodel.getUserById(userId as string))) {
      res.status(404).json({ error: 'User Not Found' })
      return
    }
    const posts: Post[] = await postModel.getPostsByUser(userId)
    if (!posts.length) {
      res.status(400).json({ error: `there is no posts to retrive for this user ${userId}` })
      return
    }
    res.status(200).json({ posts })
  } catch (error) {
    res.status(400).json({ error: 'Error While Getting Post' })
  }
}

//create post
export const createPost = async (req: Request, res: Response): Promise<void> => {
  try {
    const post: Post = {
      user_id: req.params.user_id as string,
      title: req.body.title as string,
      post_content: req.body.post_content as string
    }
    if (!post.user_id || !post.title || !post.post_content) {
      res.status(400).json({
        error:
          'Missing/Invalid parameters, the following parameters are required: user_id, title, post_content'
      })
      return
    }
    if (!(await usermodel.getUserById(post.user_id as string))) {
      res.status(404).json({ error: 'User Not Found to create Post' })
      return
    }
    const newPost: Post = await postModel.create(post)
    res.status(200).json({ newPost })
  } catch (error) {
    res.status(400).json({ error: 'Error While Creating Post' })
  }
}

//update post
export const updatePost = async (req: Request, res: Response): Promise<void> => {
  try {
    const post: Post = {
      post_id: req.params.post_id as string,
      user_id: req.body.user_id as string,
      title: req.body.title as string,
      post_content: req.body.post_content as string
    }
    if (!post.post_id || !post.user_id || !post.title || !post.post_content) {
      res.status(400).json({
        error:
          'Missing/Invalid parameters, the following parameters are required: post_i,user_id,title,post_content'
      })
      return
    }
    if (!(await postModel.getPostByPostId(post.post_id as string))) {
      res.status(404).json({ error: 'Post Not Found to Update It' })
      return
    }
    if (!(await usermodel.getUserById(post.user_id as string))) {
      res.status(404).json({ error: 'User Not Found' })
      return
    }
    const updatedPost: Post = await postModel.update(post)
    res.status(200).json({ updatedPost })
  } catch (error) {
    res.status(400).json({ error: 'Error While Updateing Post' })
  }
}

//Delete Post
export const deletePost = async (req: Request, res: Response): Promise<void> => {
  try {
    const post_id = req.params.post_id as string
    const user_id = req.body.user_id as string

    if (!post_id || !user_id) {
      res.status(400).json({
        error:
          'Missing/Invalid parameters, the following parameters are required: post_id , user_id'
      })
      return
    }
    if (!(await postModel.getPostByPostId(post_id))) {
      res.status(404).json({ error: 'Post Not Found' })
      return
    }
    if (!(await usermodel.getUserById(user_id))) {
      res.status(404).json({ error: 'User Not Found' })
      return
    }
    await postModel.delete(post_id)
    res.status(200).json('Post deleted')
  } catch (error) {
    res.status(400).json({ error: 'Error While Deleting Post' })
  }
}
