import { Router } from 'express'
import {
  createComment,
  getComment,
  getPostComments,
  getUserComments,
  updateComment,
  deleteComment
} from '../../handlers/comment.handler'
import { validateTokenMiddleware } from '../../middlewares/authenrication.middleware'
const commentRouter: Router = Router()

commentRouter.post('/', validateTokenMiddleware, createComment)
commentRouter.get('/:comment_id', getComment)
commentRouter.get('/post/:post_id', validateTokenMiddleware, getPostComments)
commentRouter.get('/user/:user_id', validateTokenMiddleware, getUserComments)
commentRouter.put('/:comment_id', validateTokenMiddleware, updateComment)
commentRouter.delete('/:comment_id', validateTokenMiddleware, deleteComment)

export { commentRouter }
