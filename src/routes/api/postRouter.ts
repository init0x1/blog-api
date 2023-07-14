import { Router } from 'express'
import {
  getAllPosts,
  getPostById,
  getUserPostes,
  createPost,
  updatePost,
  deletePost
} from '../../handlers/post.handler'
import { validateTokenMiddleware } from '../../middlewares/authenrication.middleware'
const postRouter: Router = Router()

postRouter.get('/', getAllPosts)
postRouter.get('/:post_id', getPostById)
postRouter.get('/user/:user_id', getUserPostes)
postRouter.post('/:user_id', validateTokenMiddleware, createPost)
postRouter.put('/:post_id', validateTokenMiddleware, updatePost)
postRouter.delete('/:post_id', validateTokenMiddleware, deletePost)

export { postRouter }
